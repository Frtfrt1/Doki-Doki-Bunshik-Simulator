const STATE_KEYS = {
  AFFECTION: "bunsik_affection_scores_v13",
  SELECTED: "bunsik_selected_char_id_v13",
  GUESTBOOK: "bunsik_guestbook_messages_v13",
  THEME: "bunsik_theme_dark_mode_v13",
  LIKED: "bunsik_liked_items_v13"
};

let affectionScores = JSON.parse(localStorage.getItem(STATE_KEYS.AFFECTION)) || { 1:30, 2:30, 3:30, 4:30, 5:30, 6:30, 7:30 };
let likedItems = JSON.parse(localStorage.getItem(STATE_KEYS.LIKED)) || [];
let selectedCharacterId = localStorage.getItem(STATE_KEYS.SELECTED) ? parseInt(localStorage.getItem(STATE_KEYS.SELECTED), 10) : null;
let isDarkMode = localStorage.getItem(STATE_KEYS.THEME) === "true";

let guestbookMessages = JSON.parse(localStorage.getItem(STATE_KEYS.GUESTBOOK)) || [
  { id: 1, name: "분식덕후", fav: "떡볶이", message: "매콤달콤 떡볶이의 츤데레 편지를 읽고 감동받아서 팬레터 남깁니다!", date: "2026-07-06" },
  { id: 2, name: "어묵꼬치", fav: "순대", message: "순대에게 한 표 보냅니다. 쫀득쫀득 갓 쪄낸 매력 최고예요.", date: "2026-07-06" } // 맞춤법 수정 (최고에요 -> 최고예요)
];

let currentSceneKey = "start";
let typingInterval = null;
let isTyping = false;
let currentFullText = "";

// ✅ 한글 받침 유무에 따라 조사를 반환하는 함수 추가
function getJosa(word, josa1, josa2) {
  const lastChar = word.charCodeAt(word.length - 1);
  if (lastChar < 0xac00 || lastChar > 0xd7a3) return word + josa2;
  const hasJongseong = (lastChar - 0xac00) % 28 > 0;
  return word + (hasJongseong ? josa1 : josa2);
}

const secretDialogues = {
  1: "흥... 너 진짜 구제불능이구나? 내 마음속 빈 공간을 네가 100% 채워버렸잖아. 이거, 널 위해 밤새 꾹꾹 눌러쓴 비밀 편지니까... 아무한테도 보여주지 말고 너만 읽어!",
  2: "소금만 찍어 먹던 네가 내 진심을 다 알아봐 주다니... 내 복잡하던 당면들이 너 덕분에 완벽하게 정렬된 기분이야. 부끄럽지만 내 진심을 적은 편지, 받아줄래?",
  3: "바삭! 내 인생의 완벽한 튀김옷이 되어준 너! 기름 속처럼 뜨거웠던 내 사랑의 열정을 이 편지 한 장에 바삭하게 담아봤어. 꼭 소중히 읽어줘!",
  4: "추운 겨울날 내 국물로 두 손을 녹이던 네 따뜻한 모습... 때론 꼬불거리던 내 마음을 펴준 유일한 너에게, 내 깊고 진한 향을 담아 보낸 편지야.", // 오탈자 수정 (꼬불꼬려던 -> 꼬불거리던)
  5: "항상 티격태격하면서도 내 옆 자리를 지켜준 너. 내가 여자처럼 안 보일까 걱정했지만 이젠 당당하게 말할게. 오직 너만을 위한 참치마요의 러브레터야!",
  6: "어둠 속에 숨어있던 면발 같던 나를 빛내준 건 당신이에요. 제 온 진심을 우려내어 적어 내려간 첫 번째 편지입니다. 부디 마음에 닿기를...",
  7: "마냥 아이 같던 네가 내 손을 잡아 이끄는 멋진 사람이 되었구나. 이젠 마망이 아니라 한 여자로서, 네 곁에 영원히 머물고 싶다는 마음을 이 서신에 담는다."
};

const epilogueData = {
  1: "[매콤달콤 츤데레 떡볶이의 비밀 편지]\n\n매일같이 나를 찾아오니까 이젠 네 얼굴만 봐도 소스가 보글보글 끓어오르는 것처럼 온몸이 뜨거워져.\n처음엔 그냥 귀찮고 매운맛을 못 버텨서 금방 도망갈 손님인 줄 알았는데... 어느새 밀떡처럼 쫀득한 내 가장 깊숙한 속마음까지 네가 다 차지해 버렸잖아.\n앞으로는 딴 데 가서 매운맛 찾지도 말고, 내 생각만 해! 평생 너만을 위한 특별한 떡볶이를 만들어 줄 테니까! 아, 물론 공짜는 아니야! 평생 내 곁에 있어 주는 게 대가라고, 바보야! 사랑해.",
  2: "[쫀득하고 든든한 찹쌀 순대의 비밀 편지]\n\n언제나 내 옆에서 묵묵히 소금을 찍어 먹어주며 따뜻한 눈빛을 건네던 너.\n내 안의 당면들이 처음에는 이리저리 복잡하게 엉켜서 도무지 풀리지 않는 고민 같았지만, 네 다정한 손길 덕분에 이제야 비로소 제자리를 찾은 기분이야.\n내 콤플렉스였던 거친 내장과 어두운 모습까지 다 보여주어도 전혀 부끄럽지 않게 만들어 준 사람은 이 세상에 네가 처음이자 마지막일 거야. 우리 평생 쫀득하게 함께 가자.",
  3: "[바삭함 속에 숨겨진 튀김의 비밀 편지]\n\n바삭! 내 인생은 너를 만나기 전과 후로 완전히 나뉘어.\n너를 처음 마주한 순간부터, 매일 기름 속에서 노릇노릇 튀겨지듯 요동치는 내 뜨거운 열정을 너에게 전부 바치고 싶었어. 넌 내 바삭한 튀김옷을 가장 완벽하고 빛나게 연출해 주는 유일한 예술가야.\n앞으로 우리 앞에 어떤 눅눅하고 축축한 시련이 찾아온다 해도, 서로를 믿고 바삭하게 이겨내자. 영원히 너만을 사랑해!",
  4: "[추위를 녹여주는 따스한 어묵의 비밀 편지]\n\n찬 바람이 쌩쌩 부는 겨울날, 호호 불며 내 국물을 마시고 꽁꽁 언 두 손을 녹이던 너의 예쁜 미소가 아직도 눈에 선해.\n네가 원한다면 내 온몸을 이루는 꼬치들을 아낌없이 다 내어줄 수 있어. 때로는 비비 꼬여서 엉망진창이던 내 고독함을 올바르고 따뜻하게 펴준 건 바로 너야. 이제 넌 나의 유일한 안식처란다. 지칠 땐 언제든 기대렴. 평생 뜨끈하게 데워줄게.", // 띄어쓰기 교정
  5: "[든든한 골목대장 참치마요 주먹밥의 비밀 편지]\n\n안녕? 항상 나랑 만나기만 하면 티격태격 쌈박질을 하면서도, 결국 헤어질 때는 내 걱정뿐이던 너.\n내가 털털하기만 해서 이성으로 안 보일까 봐 혼자 앓던 시간들이 바보같이 느껴질 정도로, 넌 내 있는 그대로를 너무 사랑스럽게 아껴주었지.\n이제 골목대장 가면은 벗어던지고, 너만의 든든하고 고소한 참치마요가 되어 평생 네 끼니와 인생을 책임질게!",
  6: "[은은한 향을 품은 쫄면의 비밀 편지]\n\n저처럼 늘 그릇 구석에 숨어 숨죽여 지내던 사람을, 주인공으로 우뚝 세워 빛나게 해준 건 당신이 처음이었습니다.\n새콤달콤하게 버무려진 제 진심의 향기가 이젠 온전히 당신이라는 바다를 향해 흐르고 있네요.\n시간이 흘러 불어 터질까 걱정하던 외로운 나날은 끝났습니다. 당신의 따뜻한 품 안에서, 가장 쫄깃하고 맛있는 행복한 순간을 영원히 유지할게요.",
  7: "[모성애 가득한 대마왕 마망 우동의 비밀 편지]\n\n귀엽고 사랑스러운 나의 아이 같던 네가, 어느새 내 손을 든든하게 잡아 이끄는 멋진 어른이 되었구나.\n언제나 널 품에 안고 보듬어주려고만 생각했던 내가, 오히려 네 깊고 넓은 사랑 속에서 가장 평온한 안식처를 선물 받았단다.\n이제는 귀여운 마망이 아니라, 네 곁을 나란히 걷는 단 하나의 여자로서 남은 모든 생을 너와 함께 따뜻한 온기로 가득 채우고 싶구나."
};

const cardGrid = document.querySelector("#cardGrid");
const vnFeatureSlot = document.querySelector("#vnFeatureSlot");
const characterSearch = document.querySelector("#characterSearch");
const categoryFilter = document.querySelector("#categoryFilter");
const likeFilter = document.querySelector("#likeFilter");
const themeToggleBtn = document.querySelector("#themeToggleBtn");

const guestbookForm = document.querySelector("#guestbookForm");
const visitorName = document.querySelector("#visitorName");
const visitorFav = document.querySelector("#visitorFav");
const visitorMessage = document.querySelector("#visitorMessage");
const guestbookList = document.querySelector("#guestbookList");
const clearGuestbookBtn = document.querySelector("#clearGuestbook");

function saveState(key, data) { localStorage.setItem(key, JSON.stringify(data)); }
function getCharacterImagePath(id) { return isDarkMode ? `./images/${id}real.png` : `./images/${id}.png`; }

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast-notification";
  toast.innerHTML = `🎉 <span>${message}</span>`;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add("show"), 50);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

// 📌 1. "나의 호감도 달성" HTML 고유 ID를 통한 깔끔한 실시간 연동
function updateTopHeaderStats(maxLoveCount) {
  const topMaxCountEl = document.getElementById("topMaxCount");
  if (topMaxCountEl) {
    topMaxCountEl.textContent = `${maxLoveCount}명`;
  }
}

function applyTheme() {
  if (isDarkMode) document.body.classList.add("dark-mode");
  else document.body.classList.remove("dark-mode");
  saveState(STATE_KEYS.THEME, isDarkMode);
  
  // ✅ 테마 버튼 및 모드 텍스트 변경 로직 (이전 질문에서 해결했던 내용 포함)
  const themeToggleText = document.getElementById("themeToggleText");
  if (themeToggleText) {
    themeToggleText.textContent = isDarkMode ? "🌸 미소녀 모드 ON" : "👁️ 리얼 푸드 모드 ON";
  }
  const modeIndicator = document.getElementById("modeIndicator");
  if (modeIndicator) {
    modeIndicator.textContent = isDarkMode ? "현실 강림 (Real Mode)" : "차원막 정상 (Moe Mode)";
  }

  renderCards(getCurrentFilteredItems());
  renderGallerySection();
  renderGuestbook(); 
  populateVoteOptions();
  renderStatsDashboard(); 
  
  if (selectedCharacterId) renderVN();
}
if(themeToggleBtn) themeToggleBtn.addEventListener("click", () => { isDarkMode = !isDarkMode; applyTheme(); });

function getCurrentFilteredItems() {
  const q = characterSearch ? characterSearch.value.toLowerCase().trim() : "";
  const c = categoryFilter ? categoryFilter.value : "all";
  const onlyLiked = likeFilter ? likeFilter.checked : false;
  return starterItems.filter(i => {
    const m1 = i.name.toLowerCase().includes(q) || i.title.toLowerCase().includes(q) || i.tags.some(t => t.includes(q));
    const m2 = (c === "all" || i.category === c);
    const m3 = !onlyLiked || likedItems.includes(i.id);
    return m1 && m2 && m3;
  });
}
[characterSearch, categoryFilter, likeFilter].forEach(el => {
  if(el) el.addEventListener("input", () => renderCards(getCurrentFilteredItems()));
});

window.toggleLike = function(e, id) {
  e.stopPropagation();
  if(likedItems.includes(id)) likedItems = likedItems.filter(i => i !== id);
  else likedItems.push(id);
  saveState(STATE_KEYS.LIKED, likedItems);
  renderCards(getCurrentFilteredItems());
};

function createCard(item) {
  const curScore = affectionScores[item.id] || 0;
  const isMax = curScore >= 100;
  const isLiked = likedItems.includes(item.id);
  const isSelected = selectedCharacterId === item.id;
  
  const activeStyle = isSelected ? `border-color: var(--primary); transform: translateY(-4px);` : ``;
  const enchantClass = isMax ? 'enchanted' : '';
  const colorStyle = isMax ? `color: ${item.themeColor};` : '';

  const pointerHTML = isSelected 
    ? `<div style="position: absolute; bottom: -10px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 10px solid transparent; border-right: 10px solid transparent; border-top: 10px solid var(--primary); z-index: 999; pointer-events: none;"></div>` 
    : '';

  return `
    <article class="item-card ${enchantClass}" style="position: relative; cursor: pointer; ${activeStyle} ${colorStyle}" onclick="selectCharacter(${item.id})">
      ${pointerHTML}
      <button onclick="toggleLike(event, ${item.id})" style="position:absolute; top:12px; right:12px; background:white; border:2px solid var(--line); border-radius:50%; width:32px; height:32px; cursor:pointer; font-size:16px; display:flex; align-items:center; justify-content:center; z-index:20;">
        ${isLiked ? '💖' : '🤍'}
      </button>
      <div style="width:100%; height:180px; display:flex; justify-content:center; align-items:center; background:radial-gradient(circle at center, ${item.themeColor}33 0%, var(--surface) 80%); border-radius:6px; margin-bottom:12px;">
        <img src="${getCharacterImagePath(item.id)}" alt="${item.name}" style="height:140px; object-fit:contain;" onerror="this.src='https://placehold.co/150?text=${item.name}'" />
      </div>
      <h3 style="font-size:16px; margin:0 0 6px;">${item.title}</h3>
      <div style="margin-top:auto;">
        <div style="display:flex; justify-content:space-between; font-size:11px; margin-bottom:4px; font-weight:800;">
          <span>호감도</span>
          <strong style="color:${item.themeColor};">${curScore}%</strong>
        </div>
        <div class="affection-track">
          <div class="affection-fill ${enchantClass}" style="width:${Math.min(curScore, 100)}%; background:${item.themeColor}; ${colorStyle}"></div>
        </div>
      </div>
    </article>
  `;
}

function renderCards(items = starterItems) {
  if (!cardGrid) return;
  cardGrid.innerHTML = items.length === 0 ? `<div style="padding:40px;">결과가 없습니다.</div>` : items.map(createCard).join("");
  renderGallerySection(); 
  renderStatsDashboard(); 
}

window.selectCharacter = function(id) {
  selectedCharacterId = id; currentSceneKey = "start";
  localStorage.setItem(STATE_KEYS.SELECTED, id);
  renderCards(getCurrentFilteredItems()); 
  renderVN();
  
  const target = document.querySelector("#feature-a") || vnFeatureSlot;
  if(target) target.scrollIntoView({ behavior: "smooth" });
};

function renderVN() {
  if (!selectedCharacterId) return;
  const character = starterItems.find(item => item.id === selectedCharacterId);
  const curScore = affectionScores[character.id] || 0;
  const isMax = curScore >= 100;

  if (isMax && currentSceneKey === "start") {
    currentSceneKey = "secret_max_love";
    character.script["secret_max_love"] = {
      speaker: character.name, expression: "💖 비밀 편지 전달",
      text: secretDialogues[character.id] || "내 마음을 모두 네가 채워버렸어! 갤러리에서 내 비밀 편지를 확인해줘!",
      choices: []
    };
  }

  let scene = character.script[currentSceneKey];
  if (scene && scene.isCheck) {
    currentSceneKey = curScore >= scene.threshold ? scene.passNext : scene.failNext;
    scene = character.script[currentSceneKey];
  }

  const enchantClass = isMax ? 'enchanted' : '';
  const colorStyle = isMax ? `color: ${character.themeColor};` : '';
  const haloStyle = isMax ? `background: radial-gradient(circle, ${character.themeColor}55 0%, transparent 68%);` : '';

  vnFeatureSlot.innerHTML = `
    <div style="width:100%; box-sizing:border-box; position:relative; background:var(--surface); border-radius:12px; height:680px; display:flex; flex-direction:column; border:2px solid var(--line); overflow:hidden;">
      <div style="display:flex; justify-content:space-between; align-items:center; padding:14px 20px; z-index:10; background:rgba(255,255,255,0.05); border-bottom: 1px solid var(--line);">
        <div style="font-weight:900; background:var(--surface); padding:6px 14px; border:2px solid var(--line); font-size:14px;">💬 ${character.name} 루트</div>
        <div style="display:flex; align-items:center; gap:12px; background:var(--surface); padding:6px 14px; border:2px solid var(--line);">
          <span style="font-size:12px; font-weight:800;">호감도</span>
          <div style="width:120px; height:8px; background:var(--bg); border-radius:4px; overflow:hidden;">
            <div class="affection-fill ${enchantClass}" style="width:${Math.min(curScore, 100)}%; height:100%; background:${character.themeColor}; ${colorStyle} transition:width 0.4s;"></div>
          </div>
        </div>
      </div>
      <div style="flex-grow:1; display:flex; justify-content:center; align-items:center; overflow:hidden; min-height: 0; padding: 10px 0;">
        <div style="display:flex; justify-content:center; align-items:center; width:460px; height:460px; max-height:100%; ${haloStyle} transition: 0.3s;">
          <img src="${getCharacterImagePath(character.id)}" style="max-height:360px; max-width:100%; object-fit:contain; filter:drop-shadow(0 10px 12px rgba(0,0,0,0.15));" />
        </div>
      </div>
      <div style="position:relative; width:100%; background:var(--surface); z-index:20; flex-shrink:0;">
        <div id="vnChoicesContainer" style="position:absolute; bottom:100%; left:0; width:100%; box-sizing:border-box; display:flex; flex-direction:column; gap:8px; padding:0 24px 12px;"></div>
        <div onclick="completeTypingDirectly()" style="width:100%; box-sizing:border-box; border-top:3px solid ${character.themeColor}; padding:26px 24px 22px; min-height:150px; cursor:pointer; position:relative;">
          <div style="background-color:${character.themeColor}; color:white; padding:5px 18px; font-size:14px; font-weight:900; position:absolute; top:-16px; left:24px; border-radius:4px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">${scene.speaker}</div>
          <div id="vnSystemTag" style="display:none; font-size:11px; font-weight:800; color:var(--muted); background:var(--surface-soft); padding:2px 8px; border-radius:4px; width:max-content; margin-bottom:8px; border:1px solid var(--line);"></div>
          <div id="vnText" style="font-size:16px; line-height:1.7; font-weight:700; color:var(--text); word-break:keep-all; text-align:left; white-space: pre-wrap;"></div>
        </div>
      </div>
    </div>
  `;
  
  let processingText = scene.text;
  let systemHeader = "";
  if (currentSceneKey === "secret_max_love") {
    systemHeader = "[호감도 100% 달성 시크릿 대화]";
  } else if (processingText.startsWith("[")) {
    const closeBracketIndex = processingText.indexOf("]");
    if (closeBracketIndex !== -1) {
      systemHeader = processingText.substring(0, closeBracketIndex + 1);
      processingText = processingText.substring(closeBracketIndex + 1).trim();
    }
  }

  const sysTagEl = document.getElementById("vnSystemTag");
  if (systemHeader) {
    sysTagEl.textContent = systemHeader;
    sysTagEl.style.display = "block";
  } else {
    sysTagEl.style.display = "none";
  }

  startTypewriter(processingText, scene.choices, character);
}

function startTypewriter(text, choices, character) {
  const textEl = document.getElementById("vnText");
  const choicesContainer = document.getElementById("vnChoicesContainer");
  
  if (typingInterval) clearInterval(typingInterval);
  isTyping = true; currentFullText = text; textEl.textContent = ""; 
  if(choicesContainer) choicesContainer.innerHTML = "";
  
  let i = 0;
  typingInterval = setInterval(() => {
    if (i < text.length) { textEl.textContent += text.charAt(i); i++; }
    else {
      clearInterval(typingInterval); isTyping = false; 
      renderChoices(choices, character);
    }
  }, 22);
}

window.completeTypingDirectly = function() {
  if (!isTyping) return;
  clearInterval(typingInterval); isTyping = false;
  document.getElementById("vnText").textContent = currentFullText;
  const char = starterItems.find(item => item.id === selectedCharacterId);
  renderChoices(char.script[currentSceneKey].choices, char);
};

function renderChoices(choices, character) {
  const container = document.getElementById("vnChoicesContainer");
  if(!container || !choices) return;
  container.innerHTML = "";
  if (choices.length === 0) return;

  choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.style.cssText = `width:100%; box-sizing:border-box; padding:14px 20px; background:var(--surface); border:2px solid var(--line); border-left:8px solid ${character.themeColor}; text-align:left; font-weight:800; cursor:pointer; color:var(--text); transition:background 0.2s; margin:0;`;
    btn.textContent = choice.text;
    btn.onmouseover = () => btn.style.background = "var(--surface-soft)";
    btn.onmouseout = () => btn.style.background = "var(--surface)";
    btn.onclick = (e) => { e.stopPropagation(); handleChoice(choice.next, choice.score, character); };
    container.appendChild(btn);
  });
}

function handleChoice(nextKey, score, character) {
  let prevScore = affectionScores[character.id] || 0;
  let newScore = Math.max(0, Math.min(100, prevScore + score));
  
  affectionScores[character.id] = newScore;
  saveState(STATE_KEYS.AFFECTION, affectionScores);
  // handleChoice 함수 내부 토스트 팝업 부분
  if (prevScore < 100 && newScore >= 100) {
    // ❌ 기존: `${character.name}의 비밀 편지가...` ➔ 그대로 둬도 되지만 조사 함수를 쓰려면 아래처럼!
    showToast(`${getJosa(character.name, '이', '가')} 보낸 비밀 편지가 보관함에 도착했습니다!`);
  }
  
  currentSceneKey = nextKey;
  renderCards(getCurrentFilteredItems()); renderVN();
}

function renderGallerySection() {
  let galleryContainer = document.getElementById("gallerySection");
  if (!galleryContainer) {
    galleryContainer = document.createElement("div");
    galleryContainer.id = "gallerySection";
    galleryContainer.className = "section";
    cardGrid.parentNode.insertBefore(galleryContainer, cardGrid.nextSibling);
    
    const modalHTML = `
      <div id="epilogueModal" class="gallery-modal-overlay" onclick="closeEpilogueModal()">
        <div class="gallery-modal" onclick="event.stopPropagation()" style="background: #fffdf6; border: 3px solid #e2d3bb; max-width: 550px;">
          <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px dashed #e2d3bb; padding-bottom:16px; margin-bottom:16px;">
            <h2 id="modalTitle" style="margin:0; font-family:serif; font-weight:900; letter-spacing: -0.5px;">도착한 편지</h2>
            <button onclick="closeEpilogueModal()" style="background:none; border:none; font-size:24px; cursor:pointer; color:#9a8873; font-weight:bold;">✕</button>
          </div>
          <img id="modalImg" src="" style="width:100%; max-height:180px; object-fit:contain; background:#f4eedf; border-radius:8px; padding:10px; display:none;" />
          <div id="modalText" class="epilogue-text" style="font-family: serif; font-size: 16px; line-height: 1.9; color: #3a332a; background: #faf5eb; border-left: 4px solid currentColor; padding: 25px; box-shadow: inset 0 0 10px rgba(0,0,0,0.02);"></div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }

  const unlockedChars = starterItems.filter(item => (affectionScores[item.id] || 0) >= 100);

  galleryContainer.innerHTML = `
    <div style="margin-top: 50px; padding-top: 40px; border-top: 4px dashed var(--line);">
      <h2 style="margin-bottom: 20px;">💌 비밀 편지 보관함 <span style="font-size:14px; color:var(--muted); font-weight:700;">(호감도 100% 공략 시 편지 개방)</span></h2>
      ${unlockedChars.length === 0 
        ? `<div style="padding:40px; text-align:center; background:var(--surface); border:2px dashed var(--line); border-radius:12px; color:var(--muted); font-weight:700;">아직 도착한 비밀 편지가 없습니다. 호감도를 100%로 채워 편지를 받아보세요!</div>` 
        : `<div style="display:flex; gap:12px; flex-wrap:wrap;">
            ${unlockedChars.map(char => `
              <button onclick="openEpilogueModal(${char.id})" class="enchanted" style="background:${char.themeColor}; color:#ffffff; padding:14px 26px; border:2px solid ${char.themeColor}; border-radius:8px; cursor:pointer; font-weight:900; font-size:14px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); transition: opacity 0.2s;">
                <span>${char.name}의 손편지 읽기</span>
              </button>
            `).join('')}
           </div>`
      }
    </div>
  `;
}

window.openEpilogueModal = function(id) {
  const char = starterItems.find(item => item.id === id);
  if(!char) return;
  
  // ⭕ 수정 후: getJosa(char.name, '이', '가') 자체가 "어묵이" 또는 "떡볶이가"를 완성해 줍니다.
  const nameWithJosa = getJosa(char.name, '이', '가');
  document.getElementById("modalTitle").textContent = `${nameWithJosa} 보낸 비밀 손편지`;
  
  document.getElementById("modalTitle").style.color = char.themeColor;
  
  const textEl = document.getElementById("modalText");
  textEl.textContent = epilogueData[id] || "편지 내용이 아직 준비되지 않았습니다.";
  textEl.style.borderColor = char.themeColor;

  document.getElementById("epilogueModal").classList.add("show");
};

window.closeEpilogueModal = function() {
  document.getElementById("epilogueModal").classList.remove("show");
};

function populateVoteOptions() {
  if (!visitorFav) return;
  const currentSelected = visitorFav.value;
  visitorFav.innerHTML = `<option value="none">선택 안 함 (없음)</option>`;
  starterItems.forEach(char => {
    const opt = document.createElement("option");
    opt.value = char.name;
    opt.textContent = `${char.name} (${char.title})`;
    visitorFav.appendChild(opt);
  });
  if (currentSelected) visitorFav.value = currentSelected;
}

function renderGuestbook() {
  if (!guestbookList) return;
  if (guestbookMessages.length === 0) {
    guestbookList.innerHTML = `<div style="padding:30px; text-align:center; color:var(--muted); font-size:14px; font-weight:700;">아직 등록된 팬레터가 없습니다. 첫 한마디를 적어보세요!</div>`;
    return;
  }

  guestbookList.innerHTML = guestbookMessages.map(msg => {
    const matchedChar = starterItems.find(c => c.name === msg.fav);
    const badgeStyle = matchedChar 
      ? `background:${matchedChar.themeColor}15; color:${matchedChar.themeColor}; border:1px solid ${matchedChar.themeColor}44;` 
      : `background:var(--surface-soft); color:var(--muted); border:1px solid var(--line);`;
    
    return `
      <div style="padding:16px; background:var(--surface); border:2px solid var(--line); border-radius:10px; display:flex; flex-direction:column; gap:8px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px;">
          <div style="display:flex; align-items:center; gap:8px;">
            <strong style="font-size:14px; color:var(--text);">${msg.name}</strong>
            <span style="font-size:11px; padding:2px 8px; border-radius:4px; font-weight:800; ${badgeStyle}">
              🗳️ 최애캐 투표: ${msg.fav || '없음'}
            </span>
          </div>
          <span style="font-size:12px; color:var(--muted); font-weight:600;">${msg.date}</span>
        </div>
        <p style="margin:0; font-size:14px; line-height:1.5; color:var(--text); font-weight:700; white-space:pre-wrap; word-break:break-all;">${msg.message}</p>
      </div>
    `;
  }).join('');
}

// 📌 2. 통계 대시보드를 독립된 1단 형태의 레이아웃으로 외부 분리 렌더링
function renderStatsDashboard() {
  const container = document.getElementById("statsDashboardContainer");
  if (!container) return;

  const maxLoveCount = starterItems.filter(item => (affectionScores[item.id] || 0) >= 100).length;
  updateTopHeaderStats(maxLoveCount); 

  const voteCounts = {};
  starterItems.forEach(c => voteCounts[c.name] = 0);
  guestbookMessages.forEach(msg => {
    if (msg.fav && msg.fav !== "없음" && voteCounts[msg.fav] !== undefined) {
      voteCounts[msg.fav]++;
    }
  });

  const totalVotes = Object.values(voteCounts).reduce((a, b) => a + b, 0);

  let chartHTML = `<div style="display:flex; flex-direction:column; gap:12px; margin-top:16px;">`;
  starterItems.forEach(char => {
    const count = voteCounts[char.name] || 0;
    const ratio = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
    chartHTML += `
      <div style="display:flex; align-items:center; gap:14px; font-size:14px; font-weight:800;">
        <span style="width:80px; text-overflow:ellipsis; overflow:hidden; white-space:nowrap; color:var(--text);">${char.name}</span>
        <div style="flex-grow:1; height:18px; background:var(--surface-soft); border-radius:4px; overflow:hidden; border:1px solid var(--line); position:relative;">
          <div style="width:${ratio}%; height:100%; background:${char.themeColor}; transition:width 0.4s ease-out;"></div>
        </div>
        <span style="width:65px; text-align:right; color:var(--muted); font-size:13px;">${count}표 (${ratio}%)</span>
      </div>
    `;
  });
  chartHTML += `</div>`;

  // 🎨 방명록 탭과 명확히 구분되는 통계 대시보드 리스타일링
  container.innerHTML = `
    <div style="padding: 32px; background: var(--surface); border: 3px double var(--primary); border-radius: 16px; box-shadow: var(--shadow);">
      <h3 style="margin:0 0 8px 0; font-size:22px; color:var(--text); font-weight:900;">📊 실시간 분식 공략 대시보드</h3>
      <p style="margin:0 0 24px 0; font-size:14px; color:var(--muted); font-weight:600;">유저들의 팬레터 투표 및 공략 진행도가 집계된 독립 구역입니다.</p>
      
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:20px; margin-bottom:30px;">
        <div style="padding:20px; background:var(--surface-soft); border-radius:12px; border:1px solid var(--line); text-align:center;">
          <div style="font-size:13px; font-weight:800; color:var(--muted); margin-bottom:6px;">💖 나의 호감도 100% 달성 상태</div>
          <div style="font-size:26px; font-weight:900; color:var(--primary);">${maxLoveCount} / ${starterItems.length}명</div>
        </div>
        <div style="padding:20px; background:var(--surface-soft); border-radius:12px; border:1px solid var(--line); text-align:center;">
          <div style="font-size:13px; font-weight:800; color:var(--muted); margin-bottom:6px;">🗳️ 총 누적 팬레터 투표수</div>
          <div style="font-size:26px; font-weight:900; color:var(--text);">${totalVotes}표</div>
        </div>
      </div>

      <h4 style="margin:0; font-size:16px; font-weight:900; border-bottom:2px solid var(--line); padding-bottom:10px; color:var(--text); margin-bottom:16px;">🗳️ 캐릭터별 실시간 투표 지분 현황</h4>
      ${chartHTML}
    </div>
  `;
}

if (guestbookForm) {
  guestbookForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const nameVal = visitorName.value.trim();
    const favVal = visitorFav.value;
    const msgVal = visitorMessage.value.trim();

    if (!nameVal || !msgVal) {
      alert("닉네임과 팬레터 내용을 모두 입력해 주세요!");
      return;
    }

    if (msgVal.length < 5 || msgVal.length > 150) {
      alert(`팬레터 내용은 최소 5자 이상, 최대 150자 이하로 작성해야 전송이 가능합니다!\n(현재 입력 글자 수: ${msgVal.length}자)`);
      return;
    }

    const newMsg = {
      id: Date.now(),
      name: nameVal,
      fav: favVal === "none" ? "없음" : favVal,
      message: msgVal,
      date: new Date().toISOString().split('T')[0]
    };

    guestbookMessages.unshift(newMsg);
    saveState(STATE_KEYS.GUESTBOOK, guestbookMessages);

    visitorName.value = "";
    visitorFav.value = "none";
    visitorMessage.value = "";

    renderGuestbook();
    renderStatsDashboard(); 
    showToast("소중한 팬레터와 최애캐 투표가 성공적으로 기록되었습니다! 💌");
  });
}

if (clearGuestbookBtn) {
  clearGuestbookBtn.addEventListener("click", function() {
    if (confirm("정말 모든 팬레터 기록과 투표 통계를 초기화하시겠습니까?")) {
      guestbookMessages = [];
      saveState(STATE_KEYS.GUESTBOOK, guestbookMessages);
      renderGuestbook();
      renderStatsDashboard();
    }
  });
}

// 최초 구동
applyTheme();