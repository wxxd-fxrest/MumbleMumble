import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:mumblemumble/features/main/drawerHeader_screen.dart';
import 'package:mumblemumble/features/main/drawerItem.dart';

class homeDrawer extends StatelessWidget {
  const homeDrawer({super.key});

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: ListView(
        children: const [
          DrawerHeaderScreen(
            image: "assets/image/Trash-mumble.png",
            account: "asldfj123",
            name: "공대생",
          ),
          Divider(),
          DrawerItem(icon: FontAwesomeIcons.house, label: "Home"),
          DrawerItem(icon: FontAwesomeIcons.pencil, label: "Write"),
          DrawerItem(icon: FontAwesomeIcons.solidUser, label: "Profile"),
          DrawerItem(icon: FontAwesomeIcons.userPen, label: "Profile Edit"),
          DrawerItem(icon: FontAwesomeIcons.doorOpen, label: "Log Out"),
        ],
      ),
    );
  }
}
