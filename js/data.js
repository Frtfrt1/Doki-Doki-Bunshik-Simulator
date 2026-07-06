const starterItems = [
  {
    id: 1, name: "튀김", title: "바삭바삭 츤데레 아가씨", category: "twigim",
    description: "겉은 까칠하고 바삭하지만 속은 누구보다 부드러운 츤데레 미소녀.",
    themeColor: "#eab308", tags: ["츤데레", "겉바속촉", "모둠튀김"],
    script: {
      start: {
        speaker: "튀김", expression: "😠 화남",
        text: "[1장: 까칠한 첫인상]\n흥! 딱히 네가 보고 싶어서 여기 서 있었던 건 아니니까 착각하지 마! ...그, 그냥 기름 온도가 잘 올랐나 확인하던 것뿐이야!",
        choices: [
          { text: "오늘따라 유난히 더 바삭하고 예쁜데?", next: "stage2", score: 15 },
          { text: "기름기 많아 보이는데 눅눅한 거 아냐?", next: "stage2", score: -5 }
        ]
      },
      stage2: {
        speaker: "튀김", expression: "😳 부끄럼",
        text: "[2장: 의외의 모습]\n뭐, 뭣... 예, 예쁘다니! 너 진짜 머리에 간장이라도 들이부은 거 아니야? 갑자기 사람 당황스럽게... 아, 묻지도 않았는데 왜 김말이를 챙겨주냐고? 남아서 주는 거거든?!",
        choices: [
          { text: "김말이 좋아! 네 마음처럼 따뜻하네.", next: "stage3", score: 20 },
          { text: "난 튀김옷 두꺼운 건 딱 질색인데.", next: "stage3", score: -10 }
        ]
      },
      stage3: {
        speaker: "튀김", expression: "💕 설렘",
        text: "[3장: 속마음의 틈새]\n너... 자꾸 그렇게 빤히 보지 마! 기름에 튀겨지는 것처럼 얼굴이 뜨거워지잖아... 너 진짜 책임질 것도 아니면서 사람 마음 흔드는 게 취미야?",
        choices: [
          { text: "당연히 평생 책임져야지, 바보야.", next: "check1", score: 25 },
          { text: "그냥 떡볶이 국물이나 찍어 먹으려고.", next: "check1", score: -15 }
        ]
      },
      check1: {
        speaker: "튀김", expression: "🔮 심판",
        text: "정말 겉만 번지르르한 말인지, 아니면 내 바삭한 진심을 알아채 준 건지... 확인해 보겠어.",
        isCheck: true, checkAttr: "score", threshold: 50,
        passNext: "stage4_pass", failNext: "stage4_fail"
      },
      stage4_pass: {
        speaker: "튀김", expression: "💖 사랑",
        text: "[4장: 겉바속촉의 완성]\n바보... 눈치채는 게 너무 늦단 말이야... 이제 내 튀김옷 안의 따뜻한 속마음은 온전히 네 거야. 평생 나만 바라봐 줘야 해?",
        choices: []
      },
      stage4_fail: {
        speaker: "튀김", expression: "😭 실망",
        text: "[엔딩: 눅눅해진 마음]\n거 봐, 결국 너도 다른 손님들이랑 똑같아... 날 그냥 스쳐 지나가는 간식 정도로 생각한 거지? 다신 내 앞에 나타나지 마.",
        choices: []
      }
    }
  },
  {
    id: 2, name: "떡볶이", title: "불타오르는 열혈 체육부장", category: "tteokbokki",
    description: "새빨간 고추장 소스처럼 언제나 에너지가 넘치고 직진하는 열혈 미소녀.",
    themeColor: "#ef4444", tags: ["열혈", "체육부장", "매콤달콤"],
    script: {
      start: {
        speaker: "떡볶이", expression: "🔥 투지",
        text: "[1장: 심장 오버히트]\n오! 왔구나! 마침 잘 됐어! 나랑 같이 운동장 10바퀴 뛰고 땀 좀 흘려보자고! 내 심장 엔진은 벌써 오버히트 직전이니까 말이야!",
        choices: [
          { text: "너랑 뛰는 거라면 100바퀴도 좋지! 가자!", next: "stage2", score: 15 },
          { text: "야, 냄새나고 더워. 저리 가 있어.", next: "stage2", score: -10 }
        ]
      },
      stage2: {
        speaker: "떡볶이", expression: "😆 활기",
        text: "[2장: 스트레이트 어택]\n하하하! 역시 내 파트너다워! 끈기 있는 밀떡처럼 근성이 대단한걸? 야, 근데... 너랑 이렇게 가까이 있으니까 매콤한 소스가 확 끓어오르는 것처럼 가슴이 뛰어...!",
        choices: [
          { text: "그건 너도 날 좋아하기 시작했다는 증거야.", next: "stage3", score: 20 },
          { text: "너 부정맥 있는 거 아냐? 병원 가 봐.", next: "stage3", score: -5 }
        ]
      },
      stage3: {
        speaker: "떡볶이", expression: "😳 당황",
        text: "[3장: 레드카드 직전]\n뭐, 뭐라구?! 나, 내가 널...?! 으아아! 반칙이야, 그런 멘트는 전력 질주로 들어오는 스트레이트 어택이라고! 당장 해명해, 안 그러면 레드카드 끊을 거야!",
        choices: [
          { text: "네 인생의 영원한 팀메이트가 되고 싶어.", next: "check1", score: 25 },
          { text: "그냥 운동 친구로서 장난친 건데?", next: "check1", score: -15 }
        ]
      },
      check1: {
        speaker: "떡볶이", expression: "⚡ 확인",
        text: "내 호감도 스코어보드가 과연 100점 만점에 도달했을까? 스포츠맨십을 걸고 심판의 시간을 갖는다!",
        isCheck: true, checkAttr: "score", threshold: 50,
        passNext: "stage4_pass", failNext: "stage4_fail"
      },
      stage4_pass: {
        speaker: "떡볶이", expression: "💖 우승",
        text: "[4장: 완전한 승리]\n와아아! 경기 종료! 우리 사랑의 리그 완전 우승이다! 이제 우리는 평생 같은 팀이야! 절대 트레이드 안 해줄 테니까 각오하라고, 사랑해!!",
        choices: []
      },
      stage4_fail: {
        speaker: "떡볶이", expression: "😢 패배",
        text: "[엔딩: 예선 탈락]\n결국... 경기 종료 휘슬이 울려버렸네... 나 혼자만 오버페이스로 달렸던 거구나. 오늘의 패배는 깨끗이 인정할게. 안녕...",
        choices: []
      }
    }
  },
  {
    id: 3, name: "복숭아 아이스티", title: "얼음 왕국의 쿨뷰티 미소녀", category: "drink",
    description: "차가운 얼음과 도도한 미소 뒤에 달콤함을 숨긴 학생회장 선배.",
    themeColor: "#f97316", tags: ["쿨뷰티", "학생회장", "얼음눈빛"],
    script: {
      start: {
        speaker: "복숭아 아이스티", expression: "😐 도도",
        text: "[1장: 차가운 시선]\n학생회실엔 무슨 일로 오셨죠? 사적인 용무라면 곤란합니다. 가라앉은 아이스티 가루처럼, 제 마음을 어지럽히는 불청객은 사양하고 싶거든요.",
        choices: [
          { text: "선배의 차가운 눈빛마저 달콤해서 찾아왔어요.", next: "stage2", score: 20 },
          { text: "아, 그냥 지나가던 길인데 신경 끄세요.", next: "stage2", score: -5 }
        ]
      },
      stage2: {
        speaker: "복숭아 아이스티", expression: "😒 미소",
        text: "[2장: 미세한 흔들림]\n...꽤나 대담한 후배군요. 그런 서투른 칭찬으로 얼음처럼 꽁꽁 얼어붙은 제 마음이 녹을 거라 생각했다면 큰 오산입니다. 하지만... 싫지는 않네요.",
        choices: [
          { text: "조금 더 저어드릴게요. 완전히 달콤해질 때까지.", next: "stage3", score: 25 },
          { text: "단맛이 덜하네요. 시럽 좀 더 타야겠어요.", next: "stage3", score: -10 }
        ]
      },
      stage3: {
        speaker: "복숭아 아이스티", expression: "😳 부끄럼",
        text: "[3장: 투명한 진심]\n자, 잠깐만요... 자꾸 그렇게 다정하게 저어버리면, 제 숨겨진 단맛이 전부 투명하게 드러나 버리잖아요... 선배로서의 체면이 서지 않게 만들 작정인가요?",
        choices: [
          { text: "제 앞에서만은 솔직하고 달콤한 선배여도 돼요.", next: "check1", score: 25 },
          { text: "선배의 완벽한 쿨뷰티 모습이 깨지니 깨네요.", next: "check1", score: -15 }
        ]
      },
      check1: {
        speaker: "복숭아 아이스티", expression: "🧐 검증",
        text: "당신이 제 마음에 빠뜨린 온기가, 과연 이 얼음들을 완벽하게 녹여냈을지 학생회장으로서 엄격하게 검증해 보겠어요.",
        isCheck: true, checkAttr: "score", threshold: 50,
        passNext: "stage4_pass", failNext: "stage4_fail"
      },
      stage4_pass: {
        speaker: "복숭아 아이스티", expression: "💖 해제",
        text: "[4장: 얼음 왕국의 봄]\n...완패입니다. 제 차가운 장벽을 완전히 무너뜨린 건 당신이 처음이에요. 이제 학생회장의 권한으로 명합니다. 평생 제 곁에 머무르세요.",
        choices: []
      },
      stage4_fail: {
        speaker: "복숭아 아이스티", expression: "❄️ 냉정",
        text: "[엔딩: 다시 얼어붙은 방]\n온도가 맞지 않았던 모양이네요. 얼음은 다시 단단하게 굳어버렸고, 가루는 차갑게 가라앉았습니다. 이만 나가주세요, 후배님.",
        choices: []
      }
    }
  },
  {
    id: 4, name: "복숭아 슬러시", title: "톡톡 튀는 압구정 갸루 미소녀", category: "drink",
    description: "상큼발랄하고 유행에 민감한, 질투 작전도 마다하지 않는 갸루 미소녀.",
    themeColor: "#ec4899", tags: ["갸루", "인싸", "상큼발랄"],
    script: {
      start: {
        speaker: "복숭아 슬러시", expression: "😜 발랄",
        text: "[1장: 헐 대박 사건]\n와, 대박! 오빠 진짜 오랜만~ 왤케 늦게 온 거야? 나 진짜 심심해서 슬러시처럼 완전히 사르르 녹아내릴 뻔했잖아! 징징!",
        choices: [
          { text: "오늘 유난히 더 눈부시고 상큼하네, 우리 갸루 공주님!", next: "stage2", score: 15 },
          { text: "너 화장이 너무 진한 거 아냐? 유난스럽긴.", next: "stage2", score: -10 }
        ]
      },
      stage2: {
        speaker: "복숭아 슬러시", expression: "😤 질투",
        text: "[2장: 갸루의 질투 작전]\n아하하, 말은 잘해요~! 근데 어제 옆반 여학생이랑 웃으면서 얘기하더라? 나 완전 짜증 나서 톡톡 터질 뻔했거든? 나 말고 다른 여자한테 눈돌리기 있기 없기?!",
        choices: [
          { text: "미안해, 내 눈엔 너밖에 안 보여. 진짜야!", next: "stage3", score: 20 },
          { text: "아니 친구끼리 얘기도 못 해? 피곤하게 하네.", next: "stage3", score: -15 }
        ]
      },
      stage3: {
        speaker: "복숭아 슬러시", expression: "🥰 하트",
        text: "[3장: 레알 감동 작렬]\n헐, 진짜루? 감동 작렬 소름 돋아...! 오빠가 그렇게 말해주니까 나 막 가슴이 몽글몽글해지구... 완전 하트 뿅뿅 상태란 말이야! 내 마음 책임질 수 있어?",
        choices: [
          { text: "당연하지! 세상에서 제일 예쁜 여친으로 만들어 줄게.", next: "check1", score: 25 },
          { text: "그냥 인싸들 맞춤용 립서비스였어.", next: "check1", score: -20 }
        ]
      },
      check1: {
        speaker: "복숭아 슬러시", expression: "📱 확인",
        text: "오빠의 진심 스펙이 내 핑크빛 기준치를 넘었는지 스마트하게 실시간 체크 들어가 볼까나~?",
        isCheck: true, checkAttr: "score", threshold: 50,
        passNext: "stage4_pass", failNext: "stage4_fail"
      },
      stage4_pass: {
        speaker: "복숭아 슬러시", expression: "💖 커플",
        text: "[4장: 해피 갸루 라이프]\n꺄악! 완전 최고! 오늘부터 오빠랑 나랑 공식 1일이야! SNS에 커플 셀카 당장 업로드할 거니까 예쁘게 포즈 잡으라구! 완전 사랑해!",
        choices: []
      },
      stage4_fail: {
        speaker: "복숭아 슬러시", expression: "💔 이별",
        text: "[엔딩: 블락 및 언팔]\n완전 어이없어... 결국 말만 번지르르한 바람둥이였던 거네? 오빠 같은 사람은 내 인생에서 바로 블락이야. 언팔하고 갈 테니까 연락하지 마.",
        choices: []
      }
    }
  },
  {
    id: 5, name: "주먹밥", title: "털털한 톰보이 골목대장", category: "side",
    description: "맨날 어깨동무하며 티격태격하지만, 속으로는 여자로 보이고 싶어 하는 톰보이 미소녀.",
    themeColor: "#64748b", tags: ["톰보이", "골목대장", "참치마요"],
    script: {
      start: {
        speaker: "주먹밥", expression: "😎 호탕",
        text: "[1장: 선머슴 친구]\n야! 굼벵이 기어 오냐? 왤케 늦어! 자, 영양가 가득한 고소한 참치마요니까 한 입 먹고 기운 내라! 우린 평생 의리 빼면 시체인 단짝 아이가!",
        choices: [
          { text: "고마워! 근데 주먹밥 보니까 네 손등 왤케 고와? 여자네.", next: "stage2", score: 20 },
          { text: "야, 톰보이. 주먹밥에서 참치 냄새 난다. 저리 가.", next: "stage2", score: -10 }
        ]
      },
      stage2: {
        speaker: "주먹밥", expression: "😳 당황",
        text: "[2장: 선머슴의 가면]\n뭐, 뭐라꼬?! 서, 선머슴 같은 내 손등이 곱다니... 너 갑자기 안 하던 소릴 하고 그러냐? 쳇, 맨날 어깨동무하고 티격태격 쌈박질만 하던 녀석이... 사람 부끄럽게...",
        choices: [
          { text: "부끄러워하는 모습 보니까 더 여자 같고 예쁜걸.", next: "stage3", score: 25 },
          { text: "그냥 의리로 칭찬 한 번 해준 거다, 친구야.", next: "stage3", score: -10 }
        ]
      },
      stage3: {
        speaker: "주먹밥", expression: "🫣 쑥스",
        text: "[3장: 단짝 친구의 고백]\n윽... 너 진짜 장난치는 거 아니지? 나 사실... 네가 날 그냥 남자인 친구로만 생각할까 봐 혼자 엄청 끙끙 앓았단 말이야... 나도 네 눈에 여자로 보이고 싶어...!",
        choices: [
          { text: "이젠 친구 안 해. 내 당당한 여친이 되어줘.", next: "check1", score: 25 },
          { text: "미안, 역시 넌 털털한 남동생 같은 게 편해.", next: "check1", score: -20 }
        ]
      },
      check1: {
        speaker: "주먹밥", expression: "🤔 의리",
        text: "우리가 쌓아온 든든한 의리가, 과연 뜨거운 러브 스코어로 이어졌을지 묵직하게 확인해 보겠어!",
        isCheck: true, checkAttr: "score", threshold: 50,
        passNext: "stage4_pass", failNext: "stage4_fail"
      },
      stage4_pass: {
        speaker: "주먹밥", expression: "💖 수줍",
        text: "[4장: 골목대장의 은퇴]\n헤헤... 골목대장 가면은 이제 은퇴다! 앞으로는 너만의 고소하고 든든한 참치마요 아내가 되어 평생 네 곁을 지킬게! 평생 책임져라!",
        choices: []
      },
      stage4_fail: {
        speaker: "주먹밥", expression: "😢 슬픔",
        text: "[엔딩: 영원한 친구로]\n그렇지 뭐... 괜히 혼자 설레발치다가 든든한 친구 하나만 잃었네. 앞으로 어색해서 어떻게 보냐... 난 이만 가볼게, 단짝 친구야.",
        choices: []
      }
    }
  },
  {
    id: 6, name: "어묵", title: "늘 구석에 숨은 소심한 소녀", category: "side",
    description: "비비 꼬인 마음을 가지고 그릇 구석에 숨어있지만, 다정한 안식처를 원하는 소심한 미소녀.",
    themeColor: "#06b6d4", tags: ["소심함", "안식처", "꼬불이"],
    script: {
      start: {
        speaker: "어묵", expression: "🥺 소심",
        text: "[1장: 구석의 그림자]\n저... 저기... 늘 그릇 구석에 숨어 숨죽여 지내던 저에게 말을 걸어주시다니... 죄송해요, 제가 꼬불이처럼 비비 꼬여있어서 재미없으시죠...?",
        choices: [
          { text: "아냐, 그 꼬불거리는 모습이 얼마나 귀엽고 보호본능을 자극하는데.", next: "stage2", score: 15 },
          { text: "어, 좀 답답하긴 하네. 국물만 먹고 갈게.", next: "stage2", score: -10 }
        ]
      },
      stage2: {
        speaker: "어묵", expression: "😳 수줍",
        text: "[2장: 따뜻한 국물 한 모금]\n앗... 고, 고맙습니다... 찬 바람 부는 날 제 꼬치 끝을 꼭 잡아주시고... 당신의 따뜻한 국물 같은 다정함이 제 고독한 마음을 올바르고 하얗게 펴주는 것 같아요...",
        choices: [
          { text: "평생 네 외로움을 녹여주는 안식처가 되어줄게.", next: "stage3", score: 20 },
          { text: "그냥 추워서 불쌍해 보여서 챙겨준 거야.", next: "stage3", score: -15 }
        ]
      },
      stage3: {
        speaker: "어묵", expression: "👀 간절",
        text: "[3장: 소심한 용기]\n제... 제 평생의 안식처요...? 믿기지 않아요... 늘 혼자였던 저라서 표현이 너무 서툴고 소심하지만... 저도 용기 내어 당신을 꼭 붙잡고 싶어요. 가지 마세요...",
        choices: [
          { text: "가지 않아. 영원히 네 온기에 기대어 쉴게.", next: "check1", score: 25 },
          { text: "미안, 역시 꼬인 마음을 받아주긴 버겁네.", next: "check1", score: -20 }
        ]
      },
      check1: {
        speaker: "어묵", expression: "🫣 수줍",
        text: "당신이 불어넣어 준 따뜻한 진심이 제 여린 마음에 깊게 우러났을지... 떨리는 마음으로 확인해 볼게요...",
        isCheck: true, checkAttr: "score", threshold: 50,
        passNext: "stage4_pass", failNext: "stage4_fail"
      },
      stage4_pass: {
        speaker: "어묵", expression: "💖 행복",
        text: "[4장: 따스한 품 안에서]\n흐아앙... 다행이에요... 이제 더 이상 그릇 구석에 숨지 않을게요. 당신의 따스한 품 안에서 가장 행복한 어묵이 될게요. 평생 함께해요...",
        choices: []
      },
      stage4_fail: {
        speaker: "어묵", expression: "😭 눈물",
        text: "[엔딩: 다시 차가운 구석으로]\n흐윽... 역시 전 혼자가 어울려요... 기대했던 제가 바보였죠. 다시 차가운 국물 속으로 숨을게요. 절 잊어주세요...",
        choices: []
      }
    }
  },
  {
    id: 7, name: "순대", title: "모성애 가득한 포근한 마망", category: "sundae",
    description: "쫀득하고 깊은 맛으로 언제나 상처받은 마음을 포근하게 품어주는 모성애 가득한 성숙한 미소녀.",
    themeColor: "#a855f7", tags: ["마망계", "모성애", "포근함"],
    script: {
      start: {
        speaker: "순대", expression: "🥰 자애",
        text: "[1장: 마망의 품]\n어머, 우리 착한 아이가 오늘도 지친 얼굴로 찾아왔구나. 이리 오렴, 쫀득하고 따끈한 이 마망의 품에 안겨서 오늘의 상처를 포근하게 치유하렴.",
        choices: [
          { text: "마망의 포근함과 자애로움은 우주 최고예요!", next: "stage2", score: 20 },
          { text: "아줌마, 껍질이 너무 질겨 보여요. 저리 가요.", next: "stage2", score: -15 }
        ]
      },
      stage2: {
        speaker: "순대", expression: "😏 미소",
        text: "[2장: 성숙한 매력]\n우후후, 아라아라~ 우주 최고라니 기쁘구나. 하지만 그렇게 어리광만 피우는 줄 알았던 우리 아이의 눈빛이... 오늘따라 듬직한 남자의 향기를 풍기네? 설레게 말이야.",
        choices: [
          { text: "더 이상 아이가 아니에요. 한 명의 여자로 사랑할게요.", next: "stage3", score: 25 },
          { text: "그냥 간이나 허파처럼 퍽퍽한 농담이었어요.", next: "stage3", score: -10 }
        ]
      },
      stage3: {
        speaker: "순대", expression: "😳 감동",
        text: "[3장: 여인으로서의 고백]\n어머나... 내 속을 다 보여주기도 전에 한 명의 여자로 봐주다니... 성숙한 척하던 이 마망의 심장 속 당면들이 마구 엉켜버릴 정도로 깊은 사랑을 느끼는구나.",
        choices: [
          { text: "남은 평생을 마망이 아닌 제 아내로 챙겨드릴게요.", next: "check1", score: 25 },
          { text: "역시 나이 차이가 느껴져서 안 되겠어요.", next: "check1", score: -20 }
        ]
      },
      check1: {
        speaker: "순대", expression: "🔮 자애",
        text: "네가 올곧게 키워온 한 남자의 진심이, 이 성숙한 서신을 열어볼 자격을 갖추었는지 지켜보마.",
        isCheck: true, checkAttr: "score", threshold: 50,
        passNext: "stage4_pass", failNext: "stage4_fail"
      },
      stage4_pass: {
        speaker: "순대", expression: "💖 반려",
        text: "[4장: 영원한 반려자]\n기특해라... 정말 멋지게 자라주었구나. 이젠 돌봐주는 마망이 아니라, 네 곁을 나란히 걷는 단 하나의 반려자로서 평생 네 온기를 가득 채워줄게.",
        choices: []
      },
      stage4_fail: {
        speaker: "순대", expression: "😢 슬픔",
        text: "[엔딩: 다시 아이로]\n우후후... 역시 일시적인 방황이었구나. 괜찮단다, 상처받은 마음은 언제든 이 마망의 그릇에서 달래고 가렴. 영원히 착한 아이로 남으렴.",
        choices: []
      }
    }
  }
];