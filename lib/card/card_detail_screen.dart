import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:mumblemumble/constants/gaps.dart';
import 'package:mumblemumble/constants/sizes.dart';

class CardDetailScreen extends StatefulWidget {
  const CardDetailScreen({
    super.key,
  });

  @override
  State<CardDetailScreen> createState() => _CardDetailScreenState();
}

int _currentScreen = 0;

final List<Map> postList = [
  {
    "name": "이사라",
    "account": "@junkypalnter",
    "text":
        "우발적이어야 하고, 다른 의학적 이유로 나타난 증상이 아니어야 해요. 제일 첫 번째로 말했던 거나 두 번째 것 중 하나, 그리고 나머지를 전부 충족할 때 이 병명이 확실히 내려오는 건데, 이해하셨어요? 치료는, 완벽히 듣는다고 알려진 약물은 없는데 신경안정제나 항경련제를 쓰기도 해요.",
    "img": 'assets/image/paper texture.jpg',
  },
  {
    "name": "이주노",
    "account": "@BringRuinUpon",
    "text": "",
    "img": 'assets/image/paper texture.jpg',
  },
  {
    "name": "허윤제",
    "account": "@RyanGold",
    "text":
        "세계문자 가운데 한글,즉 훈민정음은 흔히들 신비로운 문자라 부르곤 합니다. 그것은 세계 문자 가운데 유일하게 한글만이 그것을 만든 사람과 반포일을 알며, 글자를 만든 원리까지 알기 때문입니다. 세계에 이런 문자는 없습니다. 그래서 한글은, 정확히 말해 [훈민정음 해례본](국보 70호)은 진즉에 유네스코 세계기록유산으로 등재되었습니다. ‘한글’이라는 이름은 1910년대 초에 주시경 선생을 비롯한 한글학자들이 쓰기 시작한 것입니다. 여기서 ‘한’이란 크다는 것을 뜻하니, 한글은 ‘큰 글’을 말한다고 하겠습니다.[네이버 지식백과] 한글 - 세상에서 가장 신비한 문자 (위대한 문화유산, 최준식)",
    "img": 'assets/image/Trash-mumble.png',
  },
];

bool _heart = false;

class _CardDetailScreenState extends State<CardDetailScreen> {
  bool _isWriting = false;

  final ScrollController _scrollController = ScrollController();

  void _stopWriting() {
    FocusScope.of(context).unfocus();
    setState(() {
      _isWriting = false;
    });
  }

  void _onHeartClick() {
    _heart = !_heart;
    setState(() {});
  }

  void _onCommentTap(BuildContext context) {
    showModalBottomSheet(
      context: context,
      builder: (context) => Container(),
    );
  }

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          "Trash-Card",
        ),
      ),
      body: Column(
        children: [
          Container(
            padding: const EdgeInsets.only(
              top: Sizes.size14,
              bottom: Sizes.size1,
              left: Sizes.size5,
              right: Sizes.size5,
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Gaps.h7,
                Container(
                  decoration: const BoxDecoration(
                    borderRadius: BorderRadius.all(
                      Radius.circular(500),
                    ),
                    color: Colors.amber,
                  ),
                  child: ClipRRect(
                    child: Image.asset(
                      fit: BoxFit.cover,
                      'assets/image/Trash-mumble.png',
                      width: Sizes.size40,
                      height: Sizes.size40,
                    ),
                  ),
                ),
                Gaps.h6,
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: [
                    Row(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: const [
                        Text(
                          'name',
                          style: TextStyle(
                            fontSize: Sizes.size14,
                            fontWeight: FontWeight.w600,
                            color: Colors.black,
                          ),
                        ),
                        Gaps.h4,
                        Text(
                          'account',
                          style: TextStyle(
                            fontSize: Sizes.size12,
                            color: Color(0xFF707070),
                          ),
                        )
                      ],
                    ),
                    SizedBox(
                      width: 355,
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Container(
                            padding: const EdgeInsets.only(
                              top: Sizes.size2,
                            ),
                            child: const Text(
                              'text',
                              style: TextStyle(
                                fontSize: Sizes.size12 + Sizes.size1,
                                color: Colors.black,
                              ),
                            ),
                          ),
                          Gaps.v5,
                          ClipRRect(
                            borderRadius: const BorderRadius.all(
                              Radius.circular(12),
                            ),
                            child: Image.asset(
                              fit: BoxFit.cover,
                              'assets/image/paper texture.jpg',
                              height: 200,
                            ),
                          ),
                          Container(
                            padding: const EdgeInsets.only(
                              top: Sizes.size10,
                              bottom: Sizes.size10,
                            ),
                            decoration: const BoxDecoration(
                              // color: Colors.blue,
                              border: Border(
                                bottom: BorderSide(
                                  color: Color.fromARGB(255, 244, 243, 243),
                                ),
                              ),
                            ),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.end,
                              children: [
                                // Padding(
                                //   padding: const EdgeInsets.only(
                                //     right: Sizes.size10,
                                //   ),
                                //   child: GestureDetector(
                                //     onTap: () => _onCommentTap(context),
                                //     child: const Icon(
                                //       FontAwesomeIcons.comment,
                                //       size: Sizes.size16 + Sizes.size2,
                                //     ),
                                //   ),
                                // ),
                                Padding(
                                  padding: const EdgeInsets.only(
                                    right: Sizes.size10,
                                  ),
                                  child: GestureDetector(
                                    onTap: _onHeartClick,
                                    child: (_heart
                                        ? const Icon(
                                            FontAwesomeIcons.heart,
                                            size: Sizes.size16 + Sizes.size2,
                                          )
                                        : const Icon(
                                            FontAwesomeIcons.solidHeart,
                                            size: Sizes.size16 + Sizes.size2,
                                          )),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
          GestureDetector(
            child: Container(
              height: size.height * 0.385,
              decoration: const BoxDecoration(
                  // color: Colors.amber,
                  ),
              child: Stack(
                children: [
                  ListView.separated(
                    controller: _scrollController,
                    padding: const EdgeInsets.only(
                      top: Sizes.size10,
                      bottom: Sizes.size96 + Sizes.size20,
                      left: Sizes.size16,
                      right: Sizes.size16,
                    ),
                    separatorBuilder: (context, index) => Gaps.v20,
                    itemCount: 10,
                    itemBuilder: (context, index) => Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        CircleAvatar(
                          radius: 18,
                          backgroundColor: Colors.grey.shade700,
                          child: const Text("주노"),
                        ),
                        Gaps.h16,
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                "Jono",
                                style: TextStyle(
                                  fontWeight: FontWeight.bold,
                                  fontSize: Sizes.size14,
                                  color: Colors.grey.shade500,
                                ),
                              ),
                              Gaps.v3,
                              const Text(
                                  "html, css, javascript, react를 배우고 backend 공부를 하고 싶어 java 입문을 찾던 중에 이 강의를 발견하게 되었는데 너무 잘 이해되고 아주 좋은 강의였습니다. 확실히 한가지 프로그래밍 언어를 알고 배우는게 훨씬 이해가 빠르긴 하네요 감사합니다")
                            ],
                          ),
                        ),
                        Gaps.h10,
                        Column(
                          children: [
                            Gaps.v64,
                            GestureDetector(
                              onTap: () => _onCommentTap(context),
                              child: Icon(
                                FontAwesomeIcons.comment,
                                size: Sizes.size20 + Sizes.size2,
                                color: Colors.grey.shade500,
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
          Positioned(
            bottom: 0,
            width: size.width,
            child: Container(
              // height: Sizes.size64 + Sizes.size4,
              padding: const EdgeInsets.symmetric(
                // horizontal: Sizes.size10,
                vertical: Sizes.size10,
              ),
              decoration: const BoxDecoration(
                border: Border(
                  top: BorderSide(
                    color: Color.fromARGB(255, 244, 243, 243),
                  ),
                ),
              ),
              child: Padding(
                padding: const EdgeInsets.only(
                  // top: Sizes.size2,
                  // bottom: Sizes.size2,
                  left: Sizes.size20,
                  right: Sizes.size20,
                ),
                child: Expanded(
                  child: SizedBox(
                    height: Sizes.size44,
                    child: TextField(
                      onTap: () {},
                      expands: true,
                      minLines: null,
                      maxLines: null,
                      textInputAction: TextInputAction.newline,
                      cursorColor: Theme.of(context).primaryColor,
                      decoration: InputDecoration(
                        hintText: "Write a comment...",
                        border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(
                              Sizes.size12,
                            ),
                            borderSide: BorderSide.none),
                        filled: true,
                        fillColor: Colors.grey.shade700,
                        contentPadding: const EdgeInsets.symmetric(
                          horizontal: Sizes.size10,
                        ),
                        suffixIcon: Padding(
                          padding: const EdgeInsets.only(
                            right: Sizes.size14,
                          ),
                          child: Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              GestureDetector(
                                onTap: () {},
                                child: FaIcon(
                                  FontAwesomeIcons.circleArrowUp,
                                  size: Sizes.size20 + Sizes.size2,
                                  color: Theme.of(context).primaryColor,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentScreen,
        onTap: (int index) {
          setState(() {
            _currentScreen = index;
          });
        },
        showSelectedLabels: false,
        showUnselectedLabels: false,
        type: BottomNavigationBarType.fixed,
        items: [
          BottomNavigationBarItem(
            icon: (_currentScreen == 1
                ? Icon(
                    FontAwesomeIcons.house,
                    color: Colors.grey[400],
                  )
                : const Icon(
                    FontAwesomeIcons.house,
                    color: Colors.blue,
                  )),
            label: "Home",
          ),
          BottomNavigationBarItem(
            icon: Icon(
              _currentScreen == 1
                  ? FontAwesomeIcons.solidUser
                  : FontAwesomeIcons.user,
            ),
            label: "Profile",
          ),
        ],
      ),
    );
  }
}
