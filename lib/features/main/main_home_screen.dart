import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:mumblemumble/constants/gaps.dart';
import 'package:mumblemumble/constants/sizes.dart';

class MainHomeScreen extends StatefulWidget {
  const MainHomeScreen({super.key});

  @override
  State<MainHomeScreen> createState() => _MainHomeScreenState();
}

class _MainHomeScreenState extends State<MainHomeScreen> {
  bool _heart = false;
  bool _page = false;

  final List<String> _notifications = List.generate(20, (index) => "${index}h");

  void _onHeartClick() {
    _heart = !_heart;
    setState(() {});
  }

  void _onPageClick() {
    _page = !_page;
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          "Mumble-Mumble",
        ),
      ),
      body: ListView(
        children: [
          Gaps.v10,
          ListTile(
            title: Container(
              padding: const EdgeInsets.only(
                top: Sizes.size10,
                bottom: Sizes.size12,
                left: Sizes.size14,
                right: Sizes.size14,
              ),
              decoration: const BoxDecoration(
                color: Color(0xFFF09666),
                borderRadius: BorderRadius.all(
                  Radius.circular(Sizes.size8),
                ),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Padding(
                    padding: const EdgeInsets.symmetric(
                      vertical: Sizes.size5,
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        SizedBox(
                          width: 180,
                          child: Stack(
                            children: const [
                              CircleAvatar(
                                radius: 18,
                                foregroundImage: NetworkImage(
                                    "https://i.pinimg.com/564x/07/aa/a9/07aaa98dd45f1c670e755a0bc0ee6ec0.jpg"),
                              ),
                              Positioned(
                                left: 45,
                                bottom: 10,
                                child: Text(
                                  "joono",
                                  style: TextStyle(
                                    fontSize: Sizes.size16,
                                    fontWeight: FontWeight.bold,
                                  ),
                                  textAlign: TextAlign.center,
                                ),
                              )
                            ],
                          ),
                        ),
                        Gaps.h10,
                        Container(
                          child: Row(
                            children: const [
                              Icon(
                                FontAwesomeIcons.image,
                                color: Colors.black,
                                size: Sizes.size16 + Sizes.size2,
                              ),
                              Gaps.h14,
                              Icon(
                                FontAwesomeIcons.ellipsisVertical,
                                color: Colors.black,
                                size: Sizes.size16 + Sizes.size2,
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                  Stack(
                    children: [
                      Container(
                        padding: const EdgeInsets.only(
                          left: Sizes.size3,
                          right: Sizes.size3,
                        ),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            GestureDetector(
                              onTap: _onPageClick,
                              child: Icon(
                                _page ? FontAwesomeIcons.arrowLeft : null,
                                color: Colors.black,
                                size: Sizes.size16,
                              ),
                            ),
                            if (!_page == true)
                              Container(
                                width: 320,
                                height: 120,
                                padding: const EdgeInsets.symmetric(
                                  vertical: Sizes.size10,
                                  horizontal: Sizes.size10,
                                ),
                                // decoration: const BoxDecoration(
                                //   color: Colors.green,
                                // ),
                                child: const Text(
                                  "내용",
                                  style: TextStyle(
                                    fontSize: Sizes.size14,
                                  ),
                                  textAlign: TextAlign.start,
                                ),
                              ),
                            if (_page == true)
                              Container(
                                width: 320,
                                height: 120,
                                padding: const EdgeInsets.symmetric(
                                  vertical: Sizes.size10,
                                  horizontal: Sizes.size10,
                                ),
                                // decoration: const BoxDecoration(
                                //   color: Colors.green,
                                // ),
                                child: const Text(
                                  "music",
                                  style: TextStyle(
                                    fontSize: Sizes.size14,
                                  ),
                                  textAlign: TextAlign.start,
                                ),
                              ),
                            GestureDetector(
                              onTap: _onPageClick,
                              child: Icon(
                                !_page ? FontAwesomeIcons.arrowRight : null,
                                color: Colors.black,
                                size: Sizes.size16,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                  Gaps.v2,
                  Container(
                    padding: const EdgeInsets.symmetric(
                      vertical: Sizes.size5,
                      horizontal: Sizes.size48,
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Icon(
                          FontAwesomeIcons.faceAngry,
                          color: Colors.black,
                          size: Sizes.size16,
                        ),
                        GestureDetector(
                          onTap: _onHeartClick,
                          child: Icon(
                            !_heart
                                ? FontAwesomeIcons.heart
                                : FontAwesomeIcons.solidHeart,
                            color: Colors.black,
                            size: Sizes.size16,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          )
        ],
      ),
    );
  }
}
