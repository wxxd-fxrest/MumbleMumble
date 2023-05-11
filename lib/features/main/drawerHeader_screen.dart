import 'package:flutter/material.dart';
import 'package:mumblemumble/constants/sizes.dart';

class DrawerHeaderScreen extends StatelessWidget {
  final String image;
  final String account;
  final int following;
  final int followers;

  const DrawerHeaderScreen({
    super.key,
    required this.image,
    required this.account,
    required this.following,
    required this.followers,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Padding(
          padding: const EdgeInsets.all(Sizes.size16),
          child: ClipRRect(
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
        ),
      ],
    );
  }
}
