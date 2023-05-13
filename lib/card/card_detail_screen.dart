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

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          "Trash-Card",
        ),
      ),
      body: Container(
        padding: const EdgeInsets.symmetric(
          vertical: Sizes.size14,
          horizontal: Sizes.size5,
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
                            const Padding(
                              padding: EdgeInsets.only(
                                right: Sizes.size10,
                              ),
                              child: Icon(
                                FontAwesomeIcons.comment,
                                size: Sizes.size16 + Sizes.size2,
                              ),
                            ),
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
                      // Positioned(
                      //   bottom: 0,
                      //   width: size.width,
                      //   child: Container(
                      //     color: Theme.of(context).scaffoldBackgroundColor,
                      //     child: Padding(
                      //       padding: const EdgeInsets.only(
                      //         top: Sizes.size14,
                      //         bottom: Sizes.size36,
                      //         left: Sizes.size20,
                      //         right: Sizes.size20,
                      //       ),
                      //       child: Row(
                      //         children: [
                      //           CircleAvatar(
                      //             radius: 18,
                      //             backgroundColor: Colors.grey.shade500,
                      //             foregroundColor: Colors.white,
                      //             child: const Text("주노"),
                      //           ),
                      //           Gaps.h10,
                      //           Expanded(
                      //             child: SizedBox(
                      //               height: Sizes.size44,
                      //               child: TextField(
                      //                 onTap: () {},
                      //                 expands: true,
                      //                 minLines: null,
                      //                 maxLines: null,
                      //                 textInputAction: TextInputAction.newline,
                      //                 cursorColor:
                      //                     Theme.of(context).primaryColor,
                      //                 decoration: InputDecoration(
                      //                   hintText: "Write a comment...",
                      //                   border: OutlineInputBorder(
                      //                       borderRadius: BorderRadius.circular(
                      //                         Sizes.size12,
                      //                       ),
                      //                       borderSide: BorderSide.none),
                      //                   filled: true,
                      //                   fillColor: Colors.grey.shade200,
                      //                   contentPadding:
                      //                       const EdgeInsets.symmetric(
                      //                     horizontal: Sizes.size10,
                      //                   ),
                      //                   suffixIcon: Padding(
                      //                     padding: const EdgeInsets.only(
                      //                       right: Sizes.size14,
                      //                     ),
                      //                     child: Row(
                      //                       mainAxisSize: MainAxisSize.min,
                      //                       children: [
                      //                         Gaps.h8,
                      //                         GestureDetector(
                      //                           onTap: () {},
                      //                           child: FaIcon(
                      //                             FontAwesomeIcons
                      //                                 .circleArrowUp,
                      //                             size: Sizes.size20 +
                      //                                 Sizes.size2,
                      //                             color: Theme.of(context)
                      //                                 .primaryColor,
                      //                           ),
                      //                         ),
                      //                       ],
                      //                     ),
                      //                   ),
                      //                 ),
                      //               ),
                      //             ),
                      //           ),
                      //         ],
                      //       ),
                      //     ),
                      //   ),
                      // ),
                    ],
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
