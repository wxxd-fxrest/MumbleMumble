import 'package:flutter/material.dart';
import 'package:mumblemumble/constants/sizes.dart';

void main() {
  runApp(const MumbleMumble());
}

class MumbleMumble extends StatelessWidget {
  const MumbleMumble({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Mumble Mumble',
      theme: ThemeData(
        scaffoldBackgroundColor: Colors.white,
        primaryColor: const Color(0xFFE9435A),
        appBarTheme: const AppBarTheme(
          elevation: 0,
          foregroundColor: Colors.black,
          backgroundColor: Colors.white,
          titleTextStyle: TextStyle(
            color: Colors.black,
            fontSize: Sizes.size16 + Sizes.size2,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),
      // home: const InterestsScreen(),
    );
  }
}
