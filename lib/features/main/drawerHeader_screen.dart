import 'package:flutter/material.dart';
import 'package:mumblemumble/constants/sizes.dart';

class DrawerHeaderScreen extends StatelessWidget {
  final String image;
  final String name;
  final String account;

  const DrawerHeaderScreen({
    super.key,
    required this.image,
    required this.account,
    required this.name,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(
        top: Sizes.size20,
        left: Sizes.size40 - Sizes.size2,
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          Padding(
            padding: const EdgeInsets.only(
                // top: Sizes.size20,
                // left: Sizes.size40 - Sizes.size2,
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
                  image,
                  width: Sizes.size40,
                ),
              ),
            ),
          ),
          Column(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                padding: const EdgeInsets.only(
                  top: Sizes.size16,
                  bottom: Sizes.size3,
                ),
                child: Text(
                  name,
                  style: const TextStyle(
                    fontSize: Sizes.size16,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
              const Text(
                "@account",
                style: TextStyle(
                  fontSize: Sizes.size14,
                  color: Color(0xFF707070),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
