import 'package:flutter/material.dart';
import 'package:mumblemumble/constants/sizes.dart';
import 'package:mumblemumble/features/main/main_home_screen.dart';

void main() {
  runApp(const MumbleMumble());
}

class MumbleMumble extends StatelessWidget {
  const MumbleMumble({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Mumble Mumble',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        scaffoldBackgroundColor: Colors.white,
        primaryColor: const Color(0xFFE9435A),
        appBarTheme: const AppBarTheme(
          elevation: 0,
          foregroundColor: Colors.white,
          backgroundColor: Color(0xFFE65100),
          titleTextStyle: TextStyle(
            color: Colors.white,
            fontSize: Sizes.size20,
            fontWeight: FontWeight.w500,
          ),
        ),
      ),
      home: const MainHomeScreen(),
    );
  }
}
