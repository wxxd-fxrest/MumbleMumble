import 'package:flutter/material.dart';
import 'package:mumblemumble/constants/sizes.dart';

class DrawerItem extends StatelessWidget {
  final IconData icon;
  final String label;

  const DrawerItem({
    super.key,
    required this.icon,
    required this.label,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(
        top: Sizes.size24,
        left: Sizes.size40 - Sizes.size2,
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.center,
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            width: Sizes.size96 + Sizes.size10,
            padding: const EdgeInsets.symmetric(
              vertical: Sizes.size12,
              horizontal: Sizes.size12,
            ),
            decoration: const BoxDecoration(
              color: Colors.amber,
            ),
            child: Text(
              label,
              style: const TextStyle(
                fontSize: Sizes.size14,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
          Container(
            padding: const EdgeInsets.only(
              top: Sizes.size8,
              bottom: Sizes.size8,
              left: Sizes.size16,
              right: Sizes.size14,
            ),
            decoration: const BoxDecoration(
              color: Colors.grey,
            ),
            child: Icon(icon),
          ),
        ],
      ),
    );
  }
}
