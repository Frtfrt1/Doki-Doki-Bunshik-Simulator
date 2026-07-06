const starterItems = [
  {
    id: 1,
    name: "떡볶이",
    title: "매콤달콤 츤데레 부장",
    category: "tteokbokki",
    description: "겉은 매콤하고 화끈하지만, 속은 밀떡처럼 쫀득하고 달콤한 츤데레. 자신을 쉽게 보지 말라며 매운맛을 보여주겠다고 벼르고 있다.",
    themeColor: "#ef4444",
    tags: ["매운맛", "츤데레", "밀떡파"],
    script: {
      start: {
        speaker: "떡볶이",
        expression: "😠 화남",
        text: "흥, 또 나 보러 온 거야? 착각하지 마! 그냥 널 위해 아주 쪼~금 매콤하게 만들어 준 것뿐이니까!",
        choices: [
          { text: "우와, 정말 맛있겠다! 고마워!", next: "thank", score: 15 },
          { text: "맵기만 하고 맛없는 거 아냐?", next: "spicy_challenge", score: -10 },
          { text: "너... 얼굴이 떡볶이처럼 빨개졌어.", next: "blush", score: 20 }
        ]
      },
      thank: {
        speaker: "떡볶이",
        expression: "😳 부끄럼",
        text: "맛, 맛있다고?! 으윽... 그렇게 웃으면서 말하면... 내가 김말이라도 서비스로 줄 줄 알고?! (부끄러워하며 고개를 돌린다)",
        choices: [
          { text: "김말이 서비스 환영이지! (웃음)", next: "end_happy", score: 10 },
          { text: "너랑 같이 먹으면 더 맛있을 것 같아.", next: "end_romance", score: 25 }
        ]
      },
      spicy_challenge: {
        speaker: "떡볶이",
        expression: "🔥 분노",
        text: "하아?! 맵기만 하다고?! 이게 바로 아주 귀한 고춧가루로 낸 100% 명품 매운맛이란 말이야! 다신 아는 척도 하지 마!",
        choices: [
          { text: "미안해, 농담이었어...", next: "apology", score: 10 },
          { text: "치, 엽기떡볶이나 먹으러 가야겠다.", next: "end_bad", score: -20 }
        ]
      },
      blush: {
        speaker: "떡볶이",
        expression: "🍅 홍조",
        text: "뭐, 뭐라고?! 내, 내가 언제 빨개졌다고 그래! 이건 그냥 떡볶이 양념 빛이 반사된 것뿐이야! 바보!",
        choices: [
          { text: "귀엽네. 앞으로 자주 놀러 올게.", next: "end_romance", score: 25 },
          { text: "더 빨개졌는데? 흐음~", next: "end_happy", score: 15 }
        ]
      },
      apology: {
        speaker: "떡볶이",
        expression: "😌 온화",
        text: "흥... 사과하면 다야? ...그래도 반성하는 기색은 보이네. 다음엔 더 달콤하게 만들어 줄 테니까, 꼭 다시 와야 해?",
        choices: [
          { text: "꼭 올게!", next: "end_happy", score: 15 }
        ]
      },
      end_happy: {
        speaker: "떡볶이",
        expression: "😊 미소",
        text: "그럼 약속한 거다? 나 말고 딴 순대나 튀김 녀석들한테 한눈팔기만 해봐, 가만 안 둘 테니까!",
        choices: []
      },
      end_romance: {
        speaker: "떡볶이",
        expression: "💖 사랑",
        text: "너, 정말 사람 정신 못 차리게 하는 재주가 있네... 좋아, 앞으로 매일매일 나랑 매콤달콤한 시간 보내는 거야!",
        choices: []
      },
      end_bad: {
        speaker: "떡볶이",
        expression: "💔 실망",
        text: "저리 가! 다신 내 떡볶이에 침 흘리지도 마! (차가운 눈초리로 쏘아본다)",
        choices: []
      }
    }
  },
  {
    id: 2,
    name: "순대",
    title: "조용하고 미스터리한 전학생",
    category: "sundae",
    description: "어두운 보랏빛 매력을 지닌 베일에 싸인 인물. 속을 알 수 없지만, 소금이나 초장, 떡볶이 국물 어디에나 자신을 맞춰주는 사려 깊은 성격.",
    themeColor: "#8b5cf6",
    tags: ["미스터리", "사려깊음", "내장포함"],
    script: {
      start: {
        speaker: "순대",
        expression: "💬 침묵",
        text: "안녕... 난 순대라고 해. 넌 보통 날 먹을 때 소금을 찍어 먹니, 아니면 초장...? 아니면... 그냥 아무것도 없이?",
        choices: [
          { text: "역시 떡볶이 국물에 찍먹이지!", next: "tteok_dip", score: 25 },
          { text: "깔끔하게 소금 찍어 먹는 걸 좋아해.", next: "salt_pure", score: 15 },
          { text: "간이랑 허파도 많이 줘!", next: "liver_love", score: 20 }
        ]
      },
      tteok_dip: {
        speaker: "순대",
        expression: "😏 미소",
        text: "떡볶이 국물이라... 후훗, 그 열정적인 빨간 소스에 내 검은 침묵을 섞는 것도 나쁘지 않지. 의외로 융합이 잘 되니까...",
        choices: [
          { text: "너랑 나도 떡볶이와 순대처럼 잘 어울려.", next: "end_romance", score: 25 },
          { text: "맛의 천재네!", next: "end_happy", score: 10 }
        ]
      },
      salt_pure: {
        speaker: "순대",
        expression: "🧐 사색",
        text: "순수한 소금... 본연의 담백한 맛을 아는구나. 너도 겉치레보다는 본질을 중요하게 생각하는 편인 것 같아.",
        choices: [
          { text: "너의 순수한 모습이 맘에 들어.", next: "end_romance", score: 20 },
          { text: "그냥 짭짤한 게 좋은 걸.", next: "end_happy", score: 5 }
        ]
      },
      liver_love: {
        speaker: "순대",
        expression: "😌 따뜻",
        text: "내장파구나... 특히 퍽퍽하지만 고소한 간을 좋아하는 사람은 인생의 쓴맛도 아는 법이지. 네게 내 속을 전부 보여줄 수 있어서 기뻐.",
        choices: [
          { text: "순대 너의 속마음도 알고 싶어.", next: "end_romance", score: 25 },
          { text: "허파가 말랑말랑해서 맛있어.", next: "end_happy", score: 10 }
        ]
      },
      end_happy: {
        speaker: "순대",
        expression: "😊 미소",
        text: "소박하지만 든든한 대화였어. 다음에도 분식집 한구석에서 널 조용히 기다릴게.",
        choices: []
      },
      end_romance: {
        speaker: "순대",
        expression: "💖 사랑",
        text: "어둠 속에서 길을 잃은 나에게, 넌 가장 맛있는 한 줄기 빛이 되어 주었어. 이 마음, 변치 않을게...",
        choices: []
      }
    }
  },
  {
    id: 3,
    name: "튀김",
    title: "바삭바삭 초긍정 아이돌",
    category: "twigim",
    description: "황금빛 튀김옷처럼 언제나 바삭하고 화려한 성격의 인싸. 눅눅해지는 것을 가장 싫어하며, 매 순간 신나고 열정적인 삶을 산다.",
    themeColor: "#eab308",
    tags: ["바삭바삭", "초긍정", "황금빛"],
    script: {
      start: {
        speaker: "튀김",
        expression: "✨ 생기",
        text: "짜잔~! 황금빛 매력의 튀김 등장! 오늘 하루도 눅눅하게 쳐져 있지 말고, 나와 함께 바삭하게 튀겨져 볼래?!",
        choices: [
          { text: "오! 튀김아! 김말이랑 고구마 튀김이 최고야!", next: "favorite_fried", score: 20 },
          { text: "간장에 살짝 찍어서 한입에 먹어버린다.", next: "eat_action", score: 15 },
          { text: "눅눅해진 튀김도 매력 있어.", next: "soggy_debate", score: -10 }
        ]
      },
      favorite_fried: {
        speaker: "튀김",
        expression: "😆 기쁨",
        text: "오예! 뭘 좀 아는걸? 바삭한 김말이에 당면 가득, 달콤한 고구마는 국룰이지! 넌 참 나와 미식 코드가 잘 맞아!",
        choices: [
          { text: "너랑 튀김 맛집 투어 다니고 싶다.", next: "end_romance", score: 25 },
          { text: "역시 튀김은 바삭함이지!", next: "end_happy", score: 15 }
        ]
      },
      eat_action: {
        speaker: "튀김",
        expression: "😳 부끄럼",
        text: "앗! 간장에 찍어서 바로?! 깜짝 놀랐잖아! 하지만 그 적극적인 태도... 완전 내 취향 저격인데? 짜릿해!",
        choices: [
          { text: "너의 바삭한 매력에 빠져들 것 같아.", next: "end_romance", score: 25 },
          { text: "간장이 짭조름해서 맛있네.", next: "end_happy", score: 10 }
        ]
      },
      soggy_debate: {
        speaker: "튀김",
        expression: "😭 슬픔",
        text: "누... 눅눅해진 튀김이 매력 있다고?! 윽, 내 황금빛 아이덴티티가 눅눅함에 젖어든다아... (시무룩)",
        choices: [
          { text: "미안해, 바삭한 게 최고야!", next: "favorite_fried", score: 20 },
          { text: "그래도 떡볶이 국물에 적셔 먹으면 꿀맛인걸?", next: "sauce_wet", score: 25 }
        ]
      },
      sauce_wet: {
        speaker: "튀김",
        expression: "🤩 감격",
        text: "아! 떡볶이 소스에 적셔서 부드러워진 튀김?! 헐... 그건 눅눅함이 아니라 새로운 '조화'구나! 네 말을 들으니 눈이 번쩍 뜨여!",
        choices: [
          { text: "다행이다! 역시 넌 융통성이 있어.", next: "end_happy", score: 15 },
          { text: "그럼 우리 소스 찍으러 갈까?", next: "end_romance", score: 25 }
        ]
      },
      end_happy: {
        speaker: "튀김",
        expression: "😉 윙크",
        text: "룰루랄라! 앞으로 내 바삭한 에너지는 오직 너에게만 줄게! 언제든 바삭함이 필요하면 날 불러!",
        choices: []
      },
      end_romance: {
        speaker: "튀김",
        expression: "💖 사랑",
        text: "눅눅한 비가 와도 너와 함께라면 언제나 뽀송뽀송 황금빛이야! 평생 내 곁에서 바삭하게 빛나줘!",
        choices: []
      }
    }
  },
  {
    id: 4,
    name: "오뎅",
    title: "포근하고 깊은 국물의 학생회장",
    category: "odeng",
    description: "추운 겨울 몸과 마음을 따뜻하게 녹여주는 오뎅 국물처럼, 모두를 품어주는 포근한 선배. 가끔 매운 고추를 넣어 얼큰한 반전 매력을 보인다.",
    themeColor: "#d97706",
    tags: ["따뜻함", "국물무한리필", "치유계"],
    script: {
      start: {
        speaker: "오뎅",
        expression: "😌 온화",
        text: "어서 오렴. 밖이 많이 춥지 않았니? 따끈한 오뎅 국물 한 컵 마시면서 몸 좀 녹이렴. 내가 호호 불어줄게.",
        choices: [
          { text: "선배의 오뎅 국물이 세상에서 제일 따뜻해요.", next: "soup_warm", score: 25 },
          { text: "꼬불이 오뎅이랑 길쭉이 오뎅 중에 뭐가 더 좋아요?", next: "odeng_shape", score: 15 },
          { text: "간장 종이에 찍지 말고 분무기로 뿌려주세요.", next: "spray_hygiene", score: 20 }
        ]
      },
      soup_warm: {
        speaker: "오뎅",
        expression: "😊 기쁨",
        text: "후훗, 그렇게 말해주니 무 기를 듬뿍 넣고 우려낸 보람이 있네. 네가 원한다면 언제든 내 품처럼 따뜻하게 국물을 리필해줄게.",
        choices: [
          { text: "앞으로 평생 선배 옆에서 국물 마실래요.", next: "end_romance", score: 25 },
          { text: "국물이 진짜 끝내줘요!", next: "end_happy", score: 10 }
        ]
      },
      odeng_shape: {
        speaker: "오뎅",
        expression: "😉 윙크",
        text: "흐음, 난 꼬불꼬불 꼬여서 국물이 더 잘 배어 있는 꼬불이 오뎅이 좋단다. 마치 복잡하지만 결국 나에게 닿는 너의 마음처럼 말이야.",
        choices: [
          { text: "심쿵... 선배 너무 멋있어요.", next: "end_romance", score: 25 },
          { text: "전 길쭉이가 먹기 편해요.", next: "end_happy", score: 5 }
        ]
      },
      spray_hygiene: {
        speaker: "오뎅",
        expression: "😳 홍조",
        text: "아, 위생을 생각해서 분무기로 간장을 뿌려달라고? 꼼꼼하기도 하지. 네 말대로 칙칙 뿌려줄 테니, 자, 아 해볼래?",
        choices: [
          { text: "선배가 직접 먹여주시는 건가요?! (부끄)", next: "end_romance", score: 25 },
          { text: "간장이 골고루 묻어서 맛있어요.", next: "end_happy", score: 10 }
        ]
      },
      end_happy: {
        speaker: "오뎅",
        expression: "😊 미소",
        text: "몸이 좀 따뜻해졌니? 다행이야. 지치고 힘들 때면 언제든지 이 따스한 국물 포장마차로 찾아오렴.",
        choices: []
      },
      end_romance: {
        speaker: "오뎅",
        expression: "💖 사랑",
        text: "이제 단순한 선후배 국물 나눔은 그만하고 싶어. 내 따스함은 평생 너만의 것이란다. 사랑해...",
        choices: []
      }
    }
  }
];
