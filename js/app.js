// Bunsik Love Game State Management
const STATE_KEYS = {
  AFFECTION: "bunsik_affection_scores",
  SELECTED: "bunsik_selected_char_id",
  GUESTBOOK: "bunsik_guestbook_messages"
};

// Initial affection scores
let affectionScores = JSON.parse(localStorage.getItem(STATE_KEYS.AFFECTION)) || {
  1: 30, // Tteokbokki
  2: 30, // Sundae
  3: 30, // Twigim
  4: 30  // Odeng
};

let selectedCharacterId = localStorage.getItem(STATE_KEYS.SELECTED) 
  ? parseInt(localStorage.getItem(STATE_KEYS.SELECTED), 10) 
  : null;

let currentSceneKey = "start";
let typingInterval = null;
let isTyping = false;
let displayedText = "";
let currentFullText = "";

// Guestbook Messages state
let guestbookMessages = JSON.parse(localStorage.getItem(STATE_KEYS.GUESTBOOK)) || [
  { id: 1, name: "분식덕후", fav: "떡볶이", message: "떡볶이짱! 츤데레 매력 너무 치명적이네요 ㅎㅎ", date: "2026-07-06" },
  { id: 2, name: "어묵꼬치", fav: "오뎅", message: "오뎅 선배의 따뜻한 무 국물 리필 평생 소망합니다!", date: "2026-07-06" }
];

// Emoji mapping for characters sprites
const characterSprites = {
  1: "🌶️", // Tteokbokki
  2: "🔮", // Sundae
  3: "🍤", // Twigim
  4: "🍢"  // Odeng
};

// Document Elements
const cardGrid = document.querySelector("#cardGrid");
const itemCount = document.querySelector("#itemCount");
const vnFeatureSlot = document.querySelector("#vnFeatureSlot");

const characterSearch = document.querySelector("#characterSearch");
const categoryFilter = document.querySelector("#categoryFilter");

const guestbookForm = document.querySelector("#guestbookForm");
const visitorName = document.querySelector("#visitorName");
const visitorFav = document.querySelector("#visitorFav");
const visitorMessage = document.querySelector("#visitorMessage");
const formError = document.querySelector("#formError");
const guestbookList = document.querySelector("#guestbookList");
const clearGuestbookBtn = document.querySelector("#clearGuestbook");

// Save state to localStorage helper
function saveState(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// ==========================================
// 1. Character Profiles Rendering & Interaction
// ==========================================
function createCard(item) {
  const currentAffection = affectionScores[item.id] || 0;
  const isActive = selectedCharacterId === item.id;
  const activeClass = isActive ? `active-card active-${item.category}` : "";
  
  return `
    <article class="item-card ${activeClass}" data-id="${item.id}" onclick="selectCharacter(${item.id})">
      <div class="card-meta">
        <span class="badge" style="color: ${item.themeColor}; background: ${item.themeColor}15;">${item.name}</span>
        <span>#${String(item.id).padStart(2, "0")}</span>
      </div>
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <div class="card-tags">
        ${item.tags.map((tag) => `<span>${tag}</span>`).join("")}
      </div>
      
      <!-- Affection gauge bar -->
      <div class="affection-container">
        <div class="affection-header">
          <span>호감도 (Affection)</span>
          <span style="color: ${item.themeColor}; font-weight: 900;">${currentAffection}%</span>
        </div>
        <div class="affection-track">
          <div class="affection-fill fill-${item.category}" style="width: ${currentAffection}%; background-color: ${item.themeColor};"></div>
        </div>
      </div>
    </article>
  `;
}

function renderCards(items = starterItems) {
  if (items.length === 0) {
    cardGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--muted); font-weight: 700;">
        검색 결과에 맞는 캐릭터가 없습니다.
      </div>
    `;
    return;
  }
  cardGrid.innerHTML = items.map(createCard).join("");
  itemCount.textContent = items.length;
}

// Select a character and start visual novel story
window.selectCharacter = function(id) {
  selectedCharacterId = id;
  currentSceneKey = "start";
  localStorage.setItem(STATE_KEYS.SELECTED, id);
  
  // Clear any ongoing typewriter intervals
  if (typingInterval) clearInterval(typingInterval);
  isTyping = false;
  
  renderCards(getCurrentFilteredItems());
  renderVN();
  
  // Smooth scroll up to Feature Slot A to let the user focus on the story
  document.querySelector("#feature-a").scrollIntoView({ behavior: "smooth" });
};

// ==========================================
// 2. Visual Novel Screen System (Feature A)
// ==========================================
function renderVN() {
  if (!selectedCharacterId) return;
  
  const character = starterItems.find(item => item.id === selectedCharacterId);
  if (!character) return;
  
  const scene = character.script[currentSceneKey];
  if (!scene) return;
  
  // Draw layout
  vnFeatureSlot.innerHTML = `
    <div class="vn-container" style="border: 2px solid ${character.themeColor}33;">
      <div class="vn-header">
        <span class="vn-status-badge" style="color: ${character.themeColor}; border-color: ${character.themeColor}44;">
          💕 ${character.name} 루트 진행 중
        </span>
        <button class="vn-reset-btn" onclick="resetAffection(${character.id})">호감도 초기화</button>
      </div>
      
      <!-- Stage containing sprite and expression text -->
      <div class="vn-stage">
        <div class="vn-character-sprite" id="vnSprite">${characterSprites[character.id]}</div>
        <div style="font-size: 13px; font-weight: 800; color: var(--muted); margin-top: 8px; background: var(--surface-soft); padding: 4px 10px; border-radius: 6px;">
          현재 표정: ${scene.expression}
        </div>
      </div>
      
      <!-- Dialogue Box -->
      <div class="vn-dialogue-box" id="vnDialogueBox" onclick="completeTypingDirectly()">
        <span class="vn-name-tag" style="background-color: ${character.themeColor};">${scene.speaker}</span>
        <div class="vn-text" id="vnText"></div>
        
        <!-- Only display next indicator when there are no choices -->
        ${scene.choices.length === 0 ? `<div class="vn-next-indicator" onclick="restartVN(event)">처음부터 다시 대화하기 🔄</div>` : ""}
      </div>
      
      <!-- Branching Choices Area -->
      <div class="vn-choices" id="vnChoicesContainer"></div>
    </div>
  `;
  
  // Start typewriter text rendering
  startTypewriter(scene.text, scene.choices, character);
  
  // Add animation to sprite depending on scene expression
  const spriteEl = document.getElementById("vnSprite");
  if (scene.expression.includes("화남") || scene.expression.includes("분노")) {
    spriteEl.className = "vn-character-sprite shake";
  } else if (scene.expression.includes("기쁨") || scene.expression.includes("생기") || scene.expression.includes("사랑")) {
    spriteEl.className = "vn-character-sprite bounce";
  } else {
    spriteEl.className = "vn-character-sprite";
  }
}

// Typewriter animation
function startTypewriter(text, choices, character) {
  const textEl = document.getElementById("vnText");
  const choicesContainer = document.getElementById("vnChoicesContainer");
  
  if (typingInterval) clearInterval(typingInterval);
  
  isTyping = true;
  currentFullText = text;
  displayedText = "";
  textEl.textContent = "";
  choicesContainer.innerHTML = "";
  
  let i = 0;
  typingInterval = setInterval(() => {
    if (i < text.length) {
      displayedText += text.charAt(i);
      textEl.textContent = displayedText;
      i++;
    } else {
      clearInterval(typingInterval);
      isTyping = false;
      renderChoices(choices, character);
    }
  }, 35);
}

// Allow user to click the dialogue box to skip typing animation
window.completeTypingDirectly = function() {
  if (!isTyping) return;
  
  clearInterval(typingInterval);
  isTyping = false;
  
  const textEl = document.getElementById("vnText");
  textEl.textContent = currentFullText;
  
  const character = starterItems.find(item => item.id === selectedCharacterId);
  const scene = character.script[currentSceneKey];
  renderChoices(scene.choices, character);
};

// Render choice buttons
function renderChoices(choices, character) {
  const choicesContainer = document.getElementById("vnChoicesContainer");
  choicesContainer.innerHTML = "";
  
  if (choices.length === 0) return;
  
  choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.className = "vn-choice-btn";
    btn.textContent = choice.text;
    btn.style.borderLeft = `4px solid ${character.themeColor}`;
    btn.onclick = (e) => {
      e.stopPropagation(); // Avoid triggering dialogue box click
      handleChoice(choice.next, choice.score, character);
    };
    choicesContainer.appendChild(btn);
  });
}

// Process user choice
function handleChoice(nextKey, score, character) {
  // Update affection score
  let currentScore = affectionScores[character.id] || 0;
  currentScore = Math.max(0, Math.min(100, currentScore + score));
  affectionScores[character.id] = currentScore;
  saveState(STATE_KEYS.AFFECTION, affectionScores);
  
  // Transition scene
  currentSceneKey = nextKey;
  
  // Render updates
  renderCards(getCurrentFilteredItems());
  renderVN();
}

// Restart VN story from the beginning
window.restartVN = function(e) {
  if (e) e.stopPropagation();
  currentSceneKey = "start";
  renderVN();
};

// Reset affection for specific character
window.resetAffection = function(charId) {
  if (confirm("정말 이 캐릭터와의 호감도를 초기화하고 처음부터 관계를 시작하시겠습니까?")) {
    affectionScores[charId] = 30;
    saveState(STATE_KEYS.AFFECTION, affectionScores);
    currentSceneKey = "start";
    
    renderCards(getCurrentFilteredItems());
    renderVN();
  }
};

// ==========================================
// 3. Search & Filter Functionality
// ==========================================
function getCurrentFilteredItems() {
  const query = characterSearch.value.toLowerCase().trim();
  const cat = categoryFilter.value;
  
  return starterItems.filter(item => {
    // Name or tags search
    const matchesSearch = item.name.toLowerCase().includes(query) || 
                          item.title.toLowerCase().includes(query) ||
                          item.tags.some(tag => tag.toLowerCase().includes(query));
    
    // Category match
    const matchesCategory = (cat === "all") || (item.category === cat);
    
    return matchesSearch && matchesCategory;
  });
}

function handleSearchAndFilter() {
  const filtered = getCurrentFilteredItems();
  renderCards(filtered);
}

characterSearch.addEventListener("input", handleSearchAndFilter);
categoryFilter.addEventListener("change", handleSearchAndFilter);

// ==========================================
// 4. Guestbook Form Validation & Display
// ==========================================
function renderGuestbook() {
  if (guestbookMessages.length === 0) {
    guestbookList.innerHTML = `
      <div style="text-align: center; color: var(--muted); padding: 40px 0; width: 100%; font-size: 13px; font-weight: 600;">
        아직 작성된 방명록이 없습니다. 첫 마디를 남겨주세요!
      </div>
    `;
    return;
  }
  
  guestbookList.innerHTML = guestbookMessages.map(msg => {
    // Find the character match to get color
    const char = starterItems.find(c => c.name === msg.fav);
    const colorTag = char 
      ? `<span class="badge" style="font-size: 11px; padding: 2px 8px; margin-left: 6px; color: ${char.themeColor}; background: ${char.themeColor}15;">최애: ${msg.fav}</span>`
      : msg.fav !== "none" ? `<span class="badge" style="font-size: 11px; padding: 2px 8px; margin-left: 6px;">최애: ${msg.fav}</span>` : "";

    return `
      <div style="background: var(--surface); border: 1.5px solid var(--line); border-radius: 12px; padding: 12px 14px; box-shadow: 0 4px 10px rgba(0,0,0,0.02);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; flex-wrap: wrap;">
          <strong style="font-size: 13px; color: var(--text); display: flex; align-items: center;">
            ${msg.name}
            ${colorTag}
          </strong>
          <span style="font-size: 11px; color: var(--muted);">${msg.date}</span>
        </div>
        <p style="margin: 0; font-size: 13px; font-weight: 600; line-height: 1.5; color: var(--text); word-break: break-all;">
          ${msg.message}
        </p>
      </div>
    `;
  }).join("");
}

guestbookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const nameVal = visitorName.value.trim();
  const favVal = visitorFav.value;
  const msgVal = visitorMessage.value.trim();
  
  // Validation Rules
  if (nameVal.length < 2 || nameVal.length > 8) {
    formError.textContent = "⚠️ 닉네임은 2자 이상, 8자 이하로 적어주세요.";
    visitorName.focus();
    return;
  }
  
  if (msgVal.length < 5) {
    formError.textContent = "⚠️ 응원 메시지는 최소 5자 이상 작성해 주세요.";
    visitorMessage.focus();
    return;
  }
  
  // Success - Add item
  formError.textContent = "";
  
  const newMsg = {
    id: Date.now(),
    name: nameVal,
    fav: favVal === "none" ? "선택 안 함" : favVal,
    message: msgVal,
    date: new Date().toISOString().split("T")[0]
  };
  
  guestbookMessages.unshift(newMsg);
  saveState(STATE_KEYS.GUESTBOOK, guestbookMessages);
  
  // Clear inputs
  visitorName.value = "";
  visitorFav.value = "none";
  visitorMessage.value = "";
  
  // Re-render guestbook list and animate it
  renderGuestbook();
  
  // Success popup alert style placeholder
  const statusMsg = document.createElement("div");
  statusMsg.style.position = "fixed";
  statusMsg.style.bottom = "24px";
  statusMsg.style.right = "24px";
  statusMsg.style.background = "var(--primary)";
  statusMsg.style.color = "white";
  statusMsg.style.padding = "12px 24px";
  statusMsg.style.borderRadius = "12px";
  statusMsg.style.fontWeight = "800";
  statusMsg.style.boxShadow = "0 8px 30px rgba(0,0,0,0.15)";
  statusMsg.style.zIndex = "999";
  statusMsg.style.fontSize = "14px";
  statusMsg.textContent = "방명록이 등록되었습니다! 🎉";
  
  document.body.appendChild(statusMsg);
  setTimeout(() => {
    statusMsg.style.opacity = "0";
    statusMsg.style.transition = "opacity 0.5s ease";
    setTimeout(() => statusMsg.remove(), 500);
  }, 2500);
});

// Clear all guestbook messages
clearGuestbookBtn.addEventListener("click", () => {
  if (confirm("정말 모든 방명록을 삭제하시겠습니까?")) {
    guestbookMessages = [];
    saveState(STATE_KEYS.GUESTBOOK, guestbookMessages);
    renderGuestbook();
  }
});

// ==========================================
// 5. Initialize Game
// ==========================================
function initGame() {
  renderCards(starterItems);
  renderGuestbook();
  
  if (selectedCharacterId) {
    // Automatically load VN state for selected character on refresh
    renderVN();
  }
}

initGame();
