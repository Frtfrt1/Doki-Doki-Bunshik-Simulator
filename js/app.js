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
  1: "흥... 딱히 네가 좋아서 주는 건 아니니까 착각하지 마! 내 마음속 빈 공간을 네가 100% 채워버렸잖아. 이거, 널 위해 밤새 꾹꾹 눌러쓴 비밀 편지니까... 아무한테도 보여주지 말고 너만 읽어!",
  2: "야! 너랑 같이 달리기하다 보니까 내 심장 엔진이 호감도 100%까지 오버히트해 버렸잖아! 고추장 소스처럼 뜨거워진 내 진심을 꽉꽉 담은 편지야. 당장 받아라!",
  3: "얼음처럼 차갑던 제 마음에 이토록 달콤한 온기를 불어넣어 준 사람은 당신이 처음이에요. 가라앉은 아이스티 가루처럼 숨겨왔던 제 진심... 이 편지로 전할게요.",
  4: "헐, 대박! 오빠가 내 마음 완전 다 채워버렸잖아, 진짜 감동 작렬 소름 돋아! 부끄럽지만 톡톡 튀는 내 진심 완전 가득 담은 러브레터거든? 꼭 읽어줘야 해, 약속~!",
  5: "맨날 너랑 골목대장 놀이나 하던 내가 이런 걸 쓰려니까 되게 쑥스럽네... 항상 털털한 내 옆자리를 지켜준 너에게만 주는, 주먹밥처럼 든든하고 고소한 내 러브레터야!",
  6: "저... 저기... 늘 그릇 구석에서 숨죽여 지내던 소심한 저를 따뜻하게 건져내 주셔서 감사해요. 제 진심을 꾹꾹 우려내어 적은 첫 편지인데... 받아주실래요...?",
  7: "마냥 아이 같던 네가 내 손을 잡아 이끄는 멋진 남자가 되었구나. 이젠 든든한 마망이 아니라 한 명의 여자로서, 영원히 곁에서 챙겨주고 싶단다. 내 깊은 사랑을 서신에 담으마."
};

const epilogueData = {
  1: "[바삭바삭 츤데레 튀김의 비밀 편지]\n\n매일같이 나를 찾아오니까 이젠 네 얼굴만 봐도 기름 온도가 오르는 것처럼 온몸이 보글보글 뜨거워지잖아.\n처음엔 그냥 귀찮고 눅눅해지면 금방 도망갈 손님인 줄 알았는데... 어느새 내 가장 완벽하고 바삭한 속마음까지 네가 다 차지해 버렸어.\n앞으로는 다른 데 가서 튀김 찾지도 말고, 내 생각만 해! 평생 너만을 위해 겉바속촉한 특별 튀김을 만들어 줄 테니까! 아, 물론 공짜는 아니야! 평생 내 곁에 있어 주는 게 대가라고, 바보야! 사랑해.",
  2: "[열혈 체육부장 떡볶이의 비밀 편지]\n\n하아, 하아... 너랑 같이 땀 흘리며 달리다 보니 내 심장이 고추장 소스처럼 새빨갛고 뜨겁게 끓어오르는 게 멈추질 않아!\n처음엔 그냥 운동 신경 좋은 부원인 줄 알았는데, 어느새 쫄깃한 떡처럼 내 온 마음에 네가 착 달라붙어서 떨어지질 않잖아. 스포츠 정신에 걸맞게 내 진심을 직진으로 고백할게!\n나랑 평생 인생이라는 쿼터에서 같이 뛸 팀메이트가 되어줘! 딴 데 한눈팔면 바로 레드카드야, 알았지? 널 정말 사랑한다!!",
  3: "[쿨뷰티 미소녀 복숭아 아이스티의 비밀 편지]\n\n언제나 이 차가운 학생회실에서 얼음처럼 차가운 미소만 짓던 저였습니다.\n가라앉은 복숭아 가루처럼 남들에게 쉽게 보여주지 않던 제 가장 깊고 달콤한 속마음을, 당신은 다정한 온기로 녹여서 남김없이 저어 주셨지요.\n겉으론 도도해 보여도 당신 앞에서는 한없이 달콤해지고 싶은 제 진심을 이 투명한 편지에 담습니다. 앞으로도 제 차가움을 녹여줄 유일한 분이 되어주세요.",
  4: "[압구정 갸루 복숭아 슬러시의 비밀 편지]\n\n와, 진짜 대박 사건! 오빠가 내 마음의 온도를 완전 100% 찍어버려서 나 지금 슬러시처럼 사르르 녹아내리는 중이잖아~!\n나 원래 아무한테나 상큼발랄한 척 인싸인 척하지만, 오빠가 딴 여자랑 얘기할 때마다 질투 나서 톡톡 터질 것 같았다고! 웅? 내 맘 알지?\n이제 딴 여자 보구 눈돌리기 없기다? 톡톡 튀는 세상에서 제일 예쁜 갸루 여친이 평생 상큼하게 만들어 줄게. 하트 뿅뿅이야!",
  5: "[톰보이 주먹밥의 비밀 편지]\n\n안녕? 맨날 너랑 만나면 어깨동무하고 티격태격 쌈박질을 하느라, 내가 여자처럼 안 보일까 봐 사실 혼자 끙끙 앓았었어.\n내가 좀 험하게 말하고 털털해도, 넌 내 있는 그대로를 너무 소중하게 아껴주었지. 고마워, 진짜로.\n이제 털털한 선머슴 가면은 벗어던질래. 너만을 위해 영양가 가득하고 고소한 참치마요 주먹밥처럼 든든하게 네 끼니와 인생을 평생 책임지는 아내가 될게!",
  6: "[소심한 어묵의 비밀 편지]\n\n...찬 바람이 쌩쌩 부는 날, 호호 불며 꼬치 끝을 잡고 소심하게 서 있던 저에게 먼저 손을 내밀어 주신 분은 당신이었습니다.\n비비 꼬인 어묵처럼 늘 제자신을 원망하고 구석에 숨어있었지만, 당신의 따뜻한 국물 같은 다정함이 제 고독함을 올바르게 펴주었어요.\n제가 너무 소심해서 표현이 서툴지만... 이제 당신은 저의 유일한 안식처예요. 언제든 지칠 때 제 온기에 기대어 쉬어가세요. 평생 따끈하게 데워드릴게요.",
  7: "[모성애 가득한 마망 순대의 비밀 편지]\n\n귀엽고 사랑스러운 나의 아이 같던 네가, 어느새 내 거친 손을 든든하게 잡아 이끄는 멋진 남자가 되었구나.\n언제나 쫀득하고 깊은 맛으로 널 품에 안고 보듬어주려고만 생각했던 내가, 오히려 네 넓은 사랑 속에서 가장 평온한 안식처를 선물 받았단다.\n이제는 보살펴주는 마망이 아니라, 네 곁을 나란히 걷는 단 하나의 여자로서 남은 모든 생을 너의 온기로 가득 채우고 싶구나. 부디 내 진심을 받아주렴."
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

// app.js 내부 함수 수정
function getCurrentFilteredItems() {
  const q = characterSearch ? characterSearch.value.toLowerCase().trim() : "";
  let c = categoryFilter ? categoryFilter.value : "all";
  const onlyLiked = likeFilter ? likeFilter.checked : false;

  return starterItems.filter(i => {
    // 1. 검색어 필터 (이름, 타이틀, 태그 포함)
    const m1 = i.name.toLowerCase().includes(q) || 
               i.title.toLowerCase().includes(q) || 
               i.tags.some(t => t.includes(q));
    
    // 2. 카테고리 드롭다운 필터 (변환된 매핑 값 적용)
    const m2 = (c === "all" || i.category === c);
    
    // 3. 좋아요 찜 필터
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

// app.js 내부 함수 수정
// app.js 내부 renderVN() 함수의 상단 분기 로직 수정
function renderVN() {
  if (!selectedCharacterId) return;
  const character = starterItems.find(item => item.id === selectedCharacterId);
  const curScore = affectionScores[character.id] || 0;
  const isMax = curScore >= 100;

  // 1. 만약 사용자가 선택지를 골라 '이미 4장 엔딩 결과 씬'에 도달해 있다면 그 씬을 그대로 유지합니다.
  if (currentSceneKey === "stage4_pass" || currentSceneKey === "stage4_fail") {
    // 이미 최종 대사 상태이므로 강제 전환하지 않고 그대로 둡니다.
  } 
  // 2. 호감도가 100%이지만 아직 4장 결과를 안 본 상태('start', 'stage2', 'stage3' 등)일 때 시크릿 씬으로 세팅합니다.
  else if (isMax && (currentSceneKey === "start" || !character.script[currentSceneKey]?.choices?.length)) {
    currentSceneKey = "secret_max_love";
    character.script["secret_max_love"] = {
      speaker: character.name, 
      expression: "💖 비밀 편지 전달",
      text: secretDialogues[character.id] || "내 마음을 모두 네가 채워버렸어! 갤러리에서 내 비밀 편지를 확인해줘!",
      choices: [] // 최종 시크릿 대사이므로 하단 선택지를 비워둠
    };
  }

  // currentSceneKey에 따른 씬 오브젝트 참조
  let scene = character.script[currentSceneKey];
  
  // 3. 만약 분기점(isCheck) 조건 판정 씬이라면 점수를 체크하여 패스/페일로 갱신
  if (scene && scene.isCheck) {
    currentSceneKey = curScore >= scene.threshold ? scene.passNext : scene.failNext;
    scene = character.script[currentSceneKey]; 
  }

  // 예외 방지용 기본 롤백
  if (!scene) {
    scene = character.script["start"];
  }

  // --- 이하 vnFeatureSlot.innerHTML 렌더링 및 UI 코드 동일 ---

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