import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:mumblemumble/constants/sizes.dart';
import 'package:mumblemumble/features/main/Card_scrren.dart';
import 'package:mumblemumble/features/main/homeDrawer.dart';

class MainHomeScreen extends StatefulWidget {
  const MainHomeScreen({super.key});

  @override
  State<MainHomeScreen> createState() => _MainHomeScreenState();
}

class _MainHomeScreenState extends State<MainHomeScreen> {
  int _currentScreen = 0;
  bool _heart = false;
  bool _page = false;

  // final List<String> _notifications = List.generate(20, (index) => "${index}h");
  // final List<int> _notifications = List.generate(5, (int index) => index * 2);
  final List<Map<String, String?>> postList = [
    {
      "title": "title 1",
      "color": "color 1",
    },
    {
      "title": "title 2",
      "color": "color 2",
    },
    {
      "title": "title 3",
      "color":
          "세계문자 가운데 한글,즉 훈민정음은 흔히들 신비로운 문자라 부르곤 합니다. 그것은 세계 문자 가운데 유일하게 한글만이 그것을 만든 사람과 반포일을 알며, 글자를 만든 원리까지 알기 때문입니다. 세계에 이런 문자는 없습니다. 그래서 한글은, 정확히 말해 [훈민정음 해례본](국보 70호)은 진즉에 유네스코 세계기록유산으로 등재되었습니다. ‘한글’이라는 이름은 1910년대 초에 주시경 선생을 비롯한 한글학자들이 쓰기 시작한 것입니다. 여기서 ‘한’이란 크다는 것을 뜻하니, 한글은 ‘큰 글’을 말한다고 하겠습니다.[네이버 지식백과] 한글 - 세상에서 가장 신비한 문자 (위대한 문화유산, 최준식)",
    },
  ];

  void _onHeartClick() {
    _heart = !_heart;
    setState(() {});
  }

  void _onPageClick() {
    _page = !_page;
    setState(() {});
  }

  // AssetImage('assets/image/paper texture.jpg'),

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          "Mumble-Mumble",
        ),
        leading: Builder(
          builder: (BuildContext context) {
            return GestureDetector(
              onTap: () => Scaffold.of(context).openDrawer(),
              child: Padding(
                padding: const EdgeInsets.all(
                  Sizes.size9,
                ),
                child: Container(
                  decoration: const BoxDecoration(
                    borderRadius: BorderRadius.all(
                      Radius.circular(500),
                    ),
                    color: Colors.white,
                  ),
                  child: ClipRRect(
                    child: Image.asset(
                      fit: BoxFit.cover,
                      'assets/image/Trash-mumble.png',
                    ),
                  ),
                ),
              ),
            );
          },
        ),
      ),
      drawer: const homeDrawer(),
      body: const CardScreen(),
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
