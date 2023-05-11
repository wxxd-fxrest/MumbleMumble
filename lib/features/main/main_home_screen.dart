import 'package:flutter/material.dart';
import 'package:mumblemumble/constants/sizes.dart';
import 'package:mumblemumble/features/main/drawerHeader_screen.dart';

class MainHomeScreen extends StatefulWidget {
  const MainHomeScreen({super.key});

  @override
  State<MainHomeScreen> createState() => _MainHomeScreenState();
}

class _MainHomeScreenState extends State<MainHomeScreen> {
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
                  Sizes.size6,
                ),
                child: Container(
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
                    ),
                  ),
                ),
              ),
            );
          },
        ),
        actions: [
          Padding(
            padding: const EdgeInsets.all(Sizes.size12),
            child: Image.asset(
              fit: BoxFit.cover,
              'assets/image/Trash-mumble.png',
            ),
          ),
        ],
      ),
      drawer: Drawer(
        child: ListView(
          children: const [
            DrawerHeaderScreen(
              image: "assets/image/Trash-mumble.png",
              account: "asldfj123",
              following: 123,
              followers: 345,
              // Image.asset(
              //   fit: BoxFit.cover,
              //   'assets/image/Trash-mumble.png',
              // ),
            ),
          ],
        ),
      ),
      // body: ListView.builder(
      //   itemCount: postList.length,
      //   itemBuilder: (BuildContext context, int index) {
      //   return Padding(
      //     padding: const EdgeInsets.symmetric(
      //       horizontal: Sizes.size14,
      //       vertical: Sizes.size10,
      //     ),
      //     child: Container(
      //       clipBehavior: Clip.hardEdge,
      //       padding: const EdgeInsets.only(
      //         bottom: Sizes.size6,
      //         // left: Sizes.size14,
      //         // right: Sizes.size14,
      //       ),
      //       decoration: const BoxDecoration(
      //         color: Color(0xFFF09666),
      //         borderRadius: BorderRadius.all(
      //           Radius.circular(Sizes.size8),
      //         ),
      //       ),
      //       child: Column(
      //         children: [
      //           Container(
      //             color: Colors.amber,
      //             padding: const EdgeInsets.symmetric(
      //               vertical: Sizes.size10,
      //               horizontal: Sizes.size14,
      //             ),
      //             child: Row(
      //               mainAxisAlignment: MainAxisAlignment.spaceBetween,
      //               children: [
      //                 Row(
      //                   children: [
      //                     const CircleAvatar(
      //                       radius: 18,
      //                       foregroundImage: NetworkImage(
      //                           "https://i.pinimg.com/564x/07/aa/a9/07aaa98dd45f1c670e755a0bc0ee6ec0.jpg"),
      //                     ),
      //                     Gaps.h10,
      //                     RichText(
      //                       text: TextSpan(
      //                         text: postList[index]["title"],
      //                         style: const TextStyle(
      //                           fontSize: Sizes.size16,
      //                           fontWeight: FontWeight.bold,
      //                         ),
      //                       ),
      //                     ),
      //                   ],
      //                 ),
      //                 Row(
      //                   children: const [
      //                     Icon(
      //                       FontAwesomeIcons.image,
      //                       color: Colors.black,
      //                       size: Sizes.size16 + Sizes.size2,
      //                     ),
      //                     Gaps.h10,
      //                     Icon(
      //                       FontAwesomeIcons.ellipsisVertical,
      //                       color: Colors.black,
      //                       size: Sizes.size16 + Sizes.size2,
      //                     ),
      //                   ],
      //                 )
      //               ],
      //             ),
      //           ),
      //           Container(
      //             // padding: const EdgeInsets.all(
      //             //   // Sizes.size12,
      //             // ),
      //             decoration: const BoxDecoration(
      //               color: Colors.blue,
      //             ),
      //             child: Row(
      //               mainAxisAlignment: MainAxisAlignment.spaceBetween,
      //               children: [
      //                 Gaps.h2,
      //                 const Icon(
      //                   FontAwesomeIcons.arrowLeft,
      //                   color: Colors.black,
      //                   size: Sizes.size16 + Sizes.size2,
      //                 ),
      //                 Container(
      //                   width: Sizes.size96 +
      //                       Sizes.size96 +
      //                       Sizes.size96 +
      //                       Sizes.size32,
      //                   height: 150,
      //                   color: Colors.red,
      //                   padding: const EdgeInsets.symmetric(
      //                     vertical: Sizes.size5,
      //                     horizontal: Sizes.size5,
      //                   ),
      //                   child: RichText(
      //                     text: TextSpan(
      //                       text: postList[index]["color"],
      //                       style: const TextStyle(
      //                         fontSize: Sizes.size12,
      //                         fontWeight: FontWeight.bold,
      //                       ),
      //                     ),
      //                   ),
      //                 ),
      //                 const Icon(
      //                   FontAwesomeIcons.arrowRight,
      //                   color: Colors.black,
      //                   size: Sizes.size16 + Sizes.size2,
      //                 ),
      //                 Gaps.h2,
      //               ],
      //             ),
      //           ),
      //           Container(
      //             padding: const EdgeInsets.symmetric(
      //               horizontal: Sizes.size44,
      //               vertical: Sizes.size4,
      //             ),
      //             child: Row(
      //               mainAxisAlignment: MainAxisAlignment.spaceBetween,
      //               children: const [
      //                 Icon(
      //                   FontAwesomeIcons.faceAngry,
      //                   color: Colors.black,
      //                   size: Sizes.size20,
      //                 ),
      //                 Icon(
      //                   FontAwesomeIcons.heart,
      //                   color: Colors.black,
      //                   size: Sizes.size20,
      //                 ),
      //               ],
      //             ),
      //           ),
      //         ],
      //       ),
      //     ),
      //   );
      //   },
      // ),
    );
  }
}


// child: ListTile(
//   minVerticalPadding = Sizes.size16,
//   title = RichText(
//     text: TextSpan(
//       text: postList[index]["title"],
//       style: const TextStyle(
//         fontSize: Sizes.size16,
//         fontWeight: FontWeight.bold,
//       ),
//       // textAlign: TextAlign.center,
//     ),
//   ),
// ),