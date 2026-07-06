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
        text: "[2장: 의외의 모습]\n뭐, 뭣... 예, 예쁘다니! 너 진짜 머리에 간장이라도 들이부은 거 아니야? 갑자기 사람 당황스럽게... 아, 묻지도 않았는데 왜 고추튀김을 챙겨주냐고? 남아서 주는 거거든?!",
        choices: [
          { text: "고추튀김 좋아! 네 마음처럼 따뜻하네.", next: "stage3", score: 20 },
          { text: "난 오징어튀김이 더 좋은데...", next: "stage3", score: -10 }
        ]
      },
      stage3: {
        speaker: "튀김", expression: "🧐 관찰",
        text: "[3장: 거리를 좁히며]\n진짜 어이가 없네... 넌 내가 그렇게 까칠하게 구는데도 매일같이 찾아오더라? 이유가 뭔데? 혹시... 나한테 관심이라도 있는 거야?",
        choices: [
          { text: "당연하지. 네 바삭한 겉모습 속 진짜 모습을 알고 싶어.", next: "check1", score: 20 },
          { text: "음, 그냥 여기가 맛있어서?", next: "check1", score: 5 }
        ]
      },
      check1: {
        speaker: "튀김", expression: "🤔 생각",
        text: "......너, 진심으로 하는 말이지? 거짓말하면 튀김옷 다 벗겨버릴 거야.",
        isCheck: true, checkAttr: "score", threshold: 60,
        passNext: "stage4_pass", failNext: "stage4_fail"
      },
      stage4_pass: {
        speaker: "튀김", expression: "🥰 행복",
        text: "[4장: 열린 마음]\n하아... 정말 구제불능이라니까. 좋아, 그렇게까지 말한다면 특별히 내 옆자리를 내어줄게. 대신, 다른 애들 쳐다보면 바로 눅눅하게 만들어버린다?",
        choices: [{ text: "맹세할게, 너만 바라보겠다고!", next: "stage5", score: 25 }]
      },
      stage4_fail: {
        speaker: "튀김", expression: "💔 실망",
        text: "[배드 엔딩]\n그럴 줄 알았어. 너도 그냥 장난으로 찔러본 거였지? 내 황금빛 튀김옷을 모욕한 죄, 절대 용서 안 해! 가버려!",
        choices: [{ text: "처음부터 다시 시도하기", next: "start", score: -100 }]
      },
      stage5: {
        speaker: "튀김", expression: "💖 사랑",
        text: "[5장: 마음의 튀김기]\n사실은... 널 처음 본 순간부터 내 마음속 기름 온도가 200도까지 치솟았었어. 겉바속촉의 정석으로 널 영원히 사랑해줄게. 내 바삭한 손, 잡아줄래?",
        choices: [{ text: "물론이지! (마지막 남은 호감도 끌어모으기)", next: "start", score: 50 }] // 이후 호감도 100 달성으로 시크릿 엔딩 진입
      }
    }
  },
  {
    id: 2, name: "떡볶이", title: "불타오르는 열혈 체육부장", category: "tteokbokki",
    description: "매콤한 고추장 베이스의 열정으로 부원들을 이끄는 직진녀.",
    themeColor: "#ef4444", tags: ["운동계", "열혈", "직진녀"],
    script: {
      start: {
        speaker: "떡볶이", expression: "✨ 생기",
        text: "[1장: 매콤한 스퍼트]\n야! 거기 너! 오늘도 운동장 한 바퀴 뛰고 왔어? 인생은 매콤한 스퍼트라고! 자, 나와 함께 땀 흘려보자고!",
        choices: [
          { text: "너랑 같이 뛰면 백 바퀴도 가능하지!", next: "stage2", score: 15 },
          { text: "난 달리기 싫은데...", next: "stage2", score: 0 }
        ]
      },
      stage2: {
        speaker: "떡볶이", expression: "🤩 감격",
        text: "[2장: 타오르는 열정]\n네 대답, 마음에 들었어! 역시 내 라이벌다운 근성이야. 훈련 끝나면 내 특제 맵달 소스 떡볶이 사줄 테니까 포기하지 말고 따라와!",
        choices: [
          { text: "네 특제 소스라면 매일이라도 먹고 싶어.", next: "stage3", score: 20 },
          { text: "치즈 좀 많이 넣어줄래?", next: "stage3", score: 5 }
        ]
      },
      stage3: {
        speaker: "떡볶이", expression: "🤔 진지",
        text: "[3장: 잠시 쉬어가며]\n그런데 말이야... 넌 나랑 같이 달릴 때 빼고는 눈을 못 마주치더라? 나한테 불만 있어? 아니면... 부끄러운 거야?",
        choices: [
          { text: "네 불타는 눈빛을 보면 심장이 너무 빨리 뛰어서 그래.", next: "check1", score: 25 },
          { text: "그냥 눈부셔서 그래.", next: "check1", score: -5 }
        ]
      },
      check1: {
        speaker: "떡볶이", expression: "🔥 타오름",
        text: "좋아, 내 스파이크 레이더로 네 심장 박동수를 체크해 주마!",
        isCheck: true, checkAttr: "score", threshold: 60,
        passNext: "stage4_pass", failNext: "stage4_fail"
      },
      stage4_pass: {
        speaker: "떡볶이", expression: "💖 사랑",
        text: "[4장: 사랑의 골인]\n하핫! 진짜로 터질 것 같은 심장 소리네! 좋아, 인정할게. 나도 너랑 달릴 때마다 다리가 풀릴 것 같거든. 우리, 연애라는 풀코스 마라톤도 같이 뛰어볼래?",
        choices: [{ text: "영원히 너의 페이스메이커가 될게!", next: "stage5", score: 20 }]
      },
      stage4_fail: {
        speaker: "떡볶이", expression: "😭 슬픔",
        text: "[배드 엔딩]\n뭐야... 난 진심이었는데, 넌 기초 체력도 없는 약골이었어! 실망이다, 맵찔이 자식!",
        choices: [{ text: "체력 단련 후 다시 오기", next: "start", score: -100 }]
      },
      stage5: {
        speaker: "떡볶이", expression: "😊 미소",
        text: "[5장: 결승선]\n아싸! 오늘부터 우린 1일이다! 늦잠 자면 떡볶이 국물로 세수시킬 줄 알아! 사랑한다!!",
        choices: [{ text: "나도 사랑해!!", next: "start", score: 50 }]
      }
    }
  },
  {
    id: 3, name: "복숭아 아이스티", title: "얼음 왕국의 쿨뷰티 미소녀", category: "beverage",
    description: "달콤하지만 차가운 얼음을 동동 띄운 듯한 학생회장 선배.",
    themeColor: "#f43f5e", tags: ["쿨뷰티", "학생회장", "달콤쌉싸름"],
    script: {
      start: {
        speaker: "복숭아 아이스티", expression: "💬 침묵",
        text: "[1장: 차가운 이슬]\n차가운 음료가 필요한 계절이네. ...왜 그렇게 쳐다보지? 내가 그렇게 신기하게 생겼어?",
        choices: [
          { text: "얼음 뒤에 숨겨진 달콤함이 예뻐서요.", next: "stage2", score: 20 },
          { text: "너무 차가워서 다가가기 힘드네요.", next: "stage2", score: -5 }
        ]
      },
      stage2: {
        speaker: "복숭아 아이스티", expression: "😳 홍조",
        text: "[2장: 녹아내리는 마음]\n너... 그런 말을 아무렇지도 않게 하는구나. 컵 표면에 이슬이 맺히는 게... 내 마음이 녹아서 그런 걸지도 모르겠네. 착각은 하지 마.",
        choices: [
          { text: "제가 선배를 완전히 녹여드릴게요.", next: "stage3", score: 20 },
          { text: "저한테 한 입만 주세요.", next: "stage3", score: 5 }
        ]
      },
      stage3: {
        speaker: "복숭아 아이스티", expression: "🧐 진지",
        text: "[3장: 얼음 밑바닥의 진심]\n난 립톤 가루처럼 속마음이 항상 밑바닥에 가라앉아 있어. 남들은 그걸 섞어줄 인내심이 없어서 금방 떠나버리지. 너는 다를까?",
        choices: [
          { text: "바닥까지 달콤해지도록 영원히 저어드릴게요.", next: "check1", score: 25 },
          { text: "어차피 달달한 건 똑같잖아요.", next: "check1", score: -10 }
        ]
      },
      check1: {
        speaker: "복숭아 아이스티", expression: "🥺 기대",
        text: "네가 날 휘저을 준비가 되었는지, 마지막으로 확인해 볼게.",
        isCheck: true, checkAttr: "score", threshold: 60,
        passNext: "stage4_pass", failNext: "stage4_fail"
      },
      stage4_pass: {
        speaker: "복숭아 아이스티", expression: "💖 사랑",
        text: "[4장: 완벽한 농도]\n후후... 완전히 녹아버렸네. 내 차가웠던 세계를 이렇게 달콤하게 바꿔놓다니. 너, 책임져야 할 거야.",
        choices: [{ text: "선배의 하나뿐인 빨대가 될게요.", next: "stage5", score: 20 }]
      },
      stage4_fail: {
        speaker: "복숭아 아이스티", expression: "😭 슬픔",
        text: "[배드 엔딩]\n역시... 넌 참을성이 부족해. 얼음이 다 녹기도 전에 밍밍해져 버렸잖아. 이만 가 줘.",
        choices: [{ text: "처음부터 다시 다가가기", next: "start", score: -100 }]
      },
      stage5: {
        speaker: "복숭아 아이스티", expression: "😊 미소",
        text: "[5장: 오아시스]\n부끄러우니까 눈은 감아. 앞으로 넌 내 전속 바리스타야. 평생 달콤하게 해 줘.",
        choices: [{ text: "사랑해요 선배!", next: "start", score: 50 }]
      }
    }
  },
  {
    id: 4, name: "복숭아 슬러시", title: "톡톡 튀는 압구정 갸루 미소녀", category: "beverage",
    description: "상큼발랄한 갸루. 살얼음처럼 아삭하고 달콤한 매력을 뿜어낸다.",
    themeColor: "#ec4899", tags: ["갸루", "인싸", "아삭아삭"],
    script: {
      start: {
        speaker: "복숭아 슬러시", expression: "✨ 생기",
        text: "[1장: 짜릿한 만남]\n안뇽~! 오빠야! 왜 그렇게 멍하니 있어? 슬러시 기계처럼 빙글빙글 돌려버린다? 완전 대박~! ⭐️",
        choices: [
          { text: "오늘 스타일링 완전 힙하고 귀여워!", next: "stage2", score: 20 },
          { text: "시끄러워... 머리 띵해.", next: "stage2", score: -5 }
        ]
      },
      stage2: {
        speaker: "복숭아 슬러시", expression: "😆 기쁨",
        text: "[2장: 시럽 풀콤보]\n헐 진짜?! 역시 울 오빠 알아본다니까! 기분이다, 내 슬러시에 시럽 풀콤보로 때려 박아 줄게! 완전 달달구리하게 가자구!",
        choices: [
          { text: "너랑 있으면 365일이 축제 같아.", next: "stage3", score: 20 },
          { text: "적당히 줘, 진짜 머리 아파.", next: "stage3", score: 5 }
        ]
      },
      stage3: {
        speaker: "복숭아 슬러시", expression: "🤪 장난",
        text: "[3장: 질투 작전]\n근데 오빠, 아까 우리 얌전한 언니(아이스티) 쳐다보더라? 나 삐졌어! 솔직히 누가 더 좋아? 선택해!",
        choices: [
          { text: "당연히 톡톡 튀는 네가 백 배 더 좋지!", next: "check1", score: 25 },
          { text: "글쎄, 언니가 좀 더 어른스럽달까?", next: "check1", score: -15 }
        ]
      },
      check1: {
        speaker: "복숭아 슬러시", expression: "👀 심사",
        text: "진짜지? 내 하트 점수판에 오빠 이름 랭킹 1위로 올릴지 말지 결정한다?",
        isCheck: true, checkAttr: "score", threshold: 60,
        passNext: "stage4_pass", failNext: "stage4_fail"
      },
      stage4_pass: {
        speaker: "복숭아 슬러시", expression: "💖 사랑",
        text: "[4장: 슬러시 멜트]\n대박, 오빠 하트점수 개높아 미쳤나 봐! 나 이제 오빠 없으면 완전 얼어붙을 것 같음. 평생 꽁냥대기 콜?",
        choices: [{ text: "당연히 콜이지! 1일 축하해!", next: "stage5", score: 25 }]
      },
      stage4_fail: {
        speaker: "복숭아 슬러시", expression: "😡 분노",
        text: "[배드 엔딩]\n아 진짜 킹받아! 오빤 그냥 언니한테나 가버려! 나 완전 삐졌으니까 톡도 하지 마!",
        choices: [{ text: "미안해... 처음으로 돌아가기", next: "start", score: -100 }]
      },
      stage5: {
        speaker: "복숭아 슬러시", expression: "😉 윙크",
        text: "[5장: 압구정 데이트]\n아잉, 사랑해 오빠! 다음 데이트 땐 더 핫한 카페 데려가 주기다? 약속 도장 쾅쾅!",
        choices: [{ text: "그래, 어디든 같이 가자!", next: "start", score: 50 }]
      }
    }
  },
  {
    id: 5, name: "주먹밥", title: "보이시한 골목대장 톰보이", category: "rice",
    description: "김가루를 묻힌 듯 활동성이 좋은 참치마요 톰보이.",
    themeColor: "#10b981", tags: ["톰보이", "보이시", "든든함"],
    script: {
      start: {
        speaker: "주먹밥", expression: "😆 기쁨",
        text: "[1장: 유쾌한 등장]\n여어! 왔냐? 매일 떡볶이 국물만 축내지 말고 이 주먹밥 님이랑 주먹다짐이나 한판... 아니, 밥 한 끼 하자고! 캬하하!",
        choices: [
          { text: "주먹밥 속에 참치마요 들어있어? 든든하다!", next: "stage2", score: 20 },
          { text: "너 맨날 선머슴처럼 입고 다닐래?", next: "stage2", score: -10 }
        ]
      },
      stage2: {
        speaker: "주먹밥", expression: "😏 미소",
        text: "[2장: 숨겨진 매력]\n역시 맛을 아는구만! 겉은 거칠어 보여도 속은 고소한 참치마요로 꽉 차 있다고! 나 의외로... 일등 신붓감일지도?",
        choices: [
          { text: "그럼 나랑 진짜 결혼할래?", next: "stage3", score: 20 },
          { text: "에이, 무슨 신붓감이야 우린 찐친이지.", next: "stage3", score: 0 }
        ]
      },
      stage3: {
        speaker: "주먹밥", expression: "😭 슬픔",
        text: "[3장: 소녀의 고민]\n우윽... 나도 치마 입으면 나름... 어울린단 말이야. 너한테 예쁘게 보이려고 어제 머리핀도 사봤는데... 바보.",
        choices: [
          { text: "미안해! 지금 숏컷에 머리핀 한 모습이 제일 설레.", next: "check1", score: 25 },
          { text: "아냐, 넌 체육복이 짱이야.", next: "check1", score: -10 }
        ]
      },
      check1: {
        speaker: "주먹밥", expression: "😳 홍조",
        text: "자, 잠깐! 너 눈빛이 왜 그래? 장난치는 거 아니지? 우리 쌓아온 우정... 아니 애정 게이지가 얼만데!",
        isCheck: true, checkAttr: "score", threshold: 50,
        passNext: "stage4_pass", failNext: "stage4_fail"
      },
      stage4_pass: {
        speaker: "주먹밥", expression: "💖 사랑",
        text: "[4장: 우정에서 사랑으로]\n어라... 진짜였잖아? 김가루가 다 흩날릴 정도로 심장이 터질 것 같아... 나, 이제 동네 친구 말고 네 진짜 여자친구 할래!",
        choices: [{ text: "처음부터 여자친구로 생각했어.", next: "stage5", score: 25 }]
      },
      stage4_fail: {
        speaker: "주먹밥", expression: "😠 짜증",
        text: "[배드 엔딩]\n아오! 진짜 분위기 못 맞추네! 오늘 오락실 내기나 하자! 연애는 무슨 연애야!",
        choices: [{ text: "친구부터 다시 시작...", next: "start", score: -100 }]
      },
      stage5: {
        speaker: "주먹밥", expression: "😊 미소",
        text: "[5장: 가장 든든한 짝꿍]\n헤헷, 내 곁에 찰싹 붙어있어. 평생 든든하게 배부르고 행복하게 해줄 테니까! 사랑한다 찐친... 아니 내 남친!",
        choices: [{ text: "나도 사랑해!", next: "start", score: 50 }]
      }
    }
  },
  {
    id: 6, name: "어묵", title: "물가에 내놓은 소심한 문학소녀", category: "odeng",
    description: "뜨거운 국물 뒤에 숨어 눈치를 보는 극 I 성향 소심이.",
    themeColor: "#d97706", tags: ["소심함", "문학소녀", "온화"],
    script: {
      start: {
        speaker: "어묵", expression: "😳 부끄럼",
        text: "[1장: 국물 통 뒤에서]\n아... 안녕 하세요... 저, 저한테 볼일이 있으신가요...? 국물이 튀지 않게 조, 조심하셔야 해요...",
        choices: [
          { text: "너랑 대화하고 싶어서 왔어. 국물 한 컵 줄래?", next: "stage2", score: 20 },
          { text: "목소리가 너무 작아서 안 들려!", next: "stage2", score: -10 }
        ]
      },
      stage2: {
        speaker: "어묵", expression: "😊 미소",
        text: "[2장: 따뜻한 위로]\n하아... 다행이다. 제 국물이 따뜻하셨으면 좋겠어요. 여기에 무랑 다시마를 넣고 밤새 생각했거든요... 당신을...",
        choices: [
          { text: "네 정성이 듬뿍 담겨서 세계 최고의 맛이야.", next: "stage3", score: 20 },
          { text: "간장 종지는 어디 있어?", next: "stage3", score: 5 }
        ]
      },
      stage3: {
        speaker: "어묵", expression: "😭 슬픔",
        text: "[3장: 불어터진 마음]\n힉...! 저 같은 꼬불이 어묵을 왜 그렇게 잘해주시나요. 전 맨날 불어 터지기만 하고 한심한데... 꼬치에서 빠져나가 숨고 싶어요...",
        choices: [
          { text: "불어 터져도 부드럽고 따스한 네가 좋아.", next: "check1", score: 25 },
          { text: "그럼 좀 덜 익혀달라고 하지.", next: "check1", score: -15 }
        ]
      },
      check1: {
        speaker: "어묵", expression: "🥺 기대",
        text: "저처럼 나약한 어묵이라도... 정말 당신의 마음에 깊이 우러나 있을까요...?",
        isCheck: true, checkAttr: "score", threshold: 50,
        passNext: "stage4_pass", failNext: "stage4_fail"
      },
      stage4_pass: {
        speaker: "어묵", expression: "💖 사랑",
        text: "[4장: 끓는점 돌파]\n앗... 제 가슴속 온도가 100도 넘게 끓어오르고 있어요... 이 감정은 더 이상 숨길 수 없어요! 당신을 사랑해요!",
        choices: [{ text: "따스하게 꼭 안아줄게.", next: "stage5", score: 25 }]
      },
      stage4_fail: {
        speaker: "어묵", expression: "😭 슬픔",
        text: "[배드 엔딩]\n죄송해요... 역시 전 국물 속에 가라앉아 있는 게 어울리나 봐요. 안녕히 가세요...",
        choices: [{ text: "어묵 건지러 다시 가기", next: "start", score: -100 }]
      },
      stage5: {
        speaker: "어묵", expression: "😌 온화",
        text: "[5장: 평생의 조미료]\n제 일상에 소중한 조미료가 되어주셔서 감사해요. 평생 당신만을 위해 우러나는 따뜻한 아내가 될게요.",
        choices: [{ text: "매일 아침이 행복할 거야.", next: "start", score: 50 }]
      }
    }
  },
  {
    id: 7, name: "순대", title: "모든 것을 포용하는 성숙한 마망", category: "sundae",
    description: "속이 깊고 영양가가 풍부한 검은 보랏빛 매력의 연상녀 캐릭터.",
    themeColor: "#8b5cf6", tags: ["마망", "포용력", "연상녀"],
    script: {
      start: {
        speaker: "순대", expression: "😌 온화",
        text: "[1장: 따스한 품]\n어머, 우리 착한 아이 왔구나? 오늘도 밖에서 힘들고 거친 일 가득했지? 이리 오렴, 내 따스한 품에 기대렴.",
        choices: [
          { text: "순대 마망...! 위로해 주세요 ㅠㅠ", next: "stage2", score: 20 },
          { text: "내장은 빼고 순대만 썰어주세요.", next: "stage2", score: -5 }
        ]
      },
      stage2: {
        speaker: "순대", expression: "😌 따뜻",
        text: "[2장: 치유의 시간]\n그래그래, 착하지... 떡볶이 국물처럼 자극적인 세상에 치여 지쳤구나. 소금처럼 깔끔하고 소박하게 네 상처를 치유해 줄게.",
        choices: [
          { text: "마망의 포근함은 세계 최고예요.", next: "stage3", score: 20 },
          { text: "허파가 너무 쫄깃한 거 아니에요?", next: "stage3", score: 5 }
        ]
      },
      stage3: {
        speaker: "순대", expression: "😏 미소",
        text: "[3장: 어른의 매력]\n어머, 내 속을 다 보여주기도 전에 어리광만 피우는구나. 하지만 넌 이미 내 촉촉하고 깊은 매력에서 헤어 나올 수 없을 텐데?",
        choices: [
          { text: "네, 마망의 모든 것을 다 사랑할게요.", next: "check1", score: 25 },
          { text: "전 간은 좀 퍽퍽해서 싫어요.", next: "check1", score: -15 }
        ]
      },
      check1: {
        speaker: "순대", expression: "🔮 신비",
        text: "너의 그 올곧은 눈빛... 단순히 어리광을 피우는 게 아니라, 한 남자의 진심이 듬뿍 담겨있는지 볼까?",
        isCheck: true, checkAttr: "score", threshold: 50,
        passNext: "stage4_pass", failNext: "stage4_fail"
      },
      stage4_pass: {
        speaker: "순대", expression: "💖 사랑",
        text: "[4장: 반려자]\n기특해라... 다 컸구나. 이제는 품 안의 아이가 아니라 내 평생을 바쳐 기대고 싶은 진정한 반려자가 되었어. 내 손을 잡아주겠니?",
        choices: [{ text: "제가 평생 지켜드릴게요.", next: "stage5", score: 25 }]
      },
      stage4_fail: {
        speaker: "순대", expression: "😞 아쉬움",
        text: "[배드 엔딩]\n아직은 세상의 쓴맛을 더 보고 와야겠구나. 아가야, 더 성숙해지면 다시 오렴.",
        choices: [{ text: "어른이 되어서 다시 오기", next: "start", score: -100 }]
      },
      stage5: {
        speaker: "순대", expression: "😊 미소",
        text: "[5장: 완전한 사랑]\n볼에 양념이 묻었잖니. 닦아줄 테니 가만히 있으렴. 이제는 엄마가 아니라, 한 사람의 여자로서 널 영원히 사랑하마.",
        choices: [{ text: "저도 평생 사랑합니다.", next: "start", score: 50 }]
      }
    }
  }
];