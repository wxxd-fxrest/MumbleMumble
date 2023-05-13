import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:mumblemumble/constants/sizes.dart';
import 'package:mumblemumble/features/main/card_scrren.dart';
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
