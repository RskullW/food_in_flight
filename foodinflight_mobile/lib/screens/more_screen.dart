// ignore_for_file: prefer_const_constructors

import 'package:flutter/material.dart';
import 'package:mobile/components/bottom_bar.dart';
import 'package:mobile/components/colors.dart';
import 'package:mobile/components/custom_icons.dart';
import 'package:flutter_svg/flutter_svg.dart';

class MyMoreScreen extends StatefulWidget {
  @override
  _MyMoreScreenState createState() => _MyMoreScreenState();
}

class _MyMoreScreenState extends State<MyMoreScreen> {
  Widget _buildAllBars() {
    return Scaffold(
      body: _buildBody(),
      appBar: _buildAppBar(),
      bottomNavigationBar: MyBottomAppBar("More"),
      backgroundColor: colorBackgroundScreen,
    );
  }

  @override
  Widget build(BuildContext context) {
    return _buildAllBars();
  }

  Widget _buildButtonMore(
      String text,
      Color colorButton,
      Color colorUnderline,
      Color colorText,
      Function()? onPressed,
      IconData iconButton,
      Color colorIconButton,
      {double? sizeIcon = 24}) {
    return Expanded(
      child: GestureDetector(
        onTap: onPressed != null
            ? () => onPressed
            : () => print("Click \'${text}\'"),
        child: Container(
          decoration: BoxDecoration(
            color: colorBackgroundScreen,
            borderRadius: BorderRadius.zero,
          ),
          child: FractionallySizedBox(
            widthFactor: 1,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.end,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Padding(
                  padding: EdgeInsets.symmetric(
                      horizontal: MediaQuery.of(context).size.width * 0.1),
                  child: Row(
                    children: [
                      Text(
                        text,
                        style: TextStyle(
                          color: colorText,
                          fontSize: MediaQuery.of(context).size.width * 0.04,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      Spacer(),
                      Spacer(),
                      Icon(
                        iconButton,
                        color: colorIconButton,
                        size: sizeIcon,
                      ),
                    ],
                  ),
                ),
                SizedBox(height: MediaQuery.of(context).size.width * 0.05),
                Container(
                  height: 1.0,
                  decoration: BoxDecoration(
                    color: colorUnderline.withOpacity(0.35),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildUnderPanelMoreScreen() {
    return Expanded(
        child: Row(
      children: [
        SizedBox(
          width: MediaQuery.of(context).size.width * 0.09,
        ),
        GestureDetector(
          onTap: () => print('Clicked \'Vkontakte\''),
          child: CustomIcons.GetIcon(
              'vkontakte',
              MediaQuery.of(context).size.width * 0.065,
              MediaQuery.of(context).size.height * 0.065,
              opacity: 0.6),
        ),
        SizedBox(
          width: MediaQuery.of(context).size.width * 0.02,
        ),
        GestureDetector(
          onTap: () => print('Clicked \'Instagram\''),
          child: CustomIcons.GetIcon(
              'instagram',
              MediaQuery.of(context).size.width * 0.065,
              MediaQuery.of(context).size.height * 0.065,
              opacity: 0.6),
        ),
        Spacer(),
        Spacer(),
        Text(
          'Version 00.01.0.a (101)',
          style: TextStyle(
              fontFamily: 'Roboto-Black',
              color: colorAppBar.withOpacity(0.6),
              fontWeight: FontWeight.bold,
              fontSize: MediaQuery.of(context).size.width * 0.035),
        ),
        Spacer(),
      ],
    ));
  }

  Widget _buildConnectToProfileFrom() {
    return Expanded(
      child: GestureDetector(
        onTap: () => print("Click connect to profile'"),
        child: Container(
          decoration: BoxDecoration(
            color: colorMoreScreenAppBar,
            borderRadius: BorderRadius.circular(35),
          ),
          child: FractionallySizedBox(
            widthFactor: 0.9,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Padding(
                  padding: EdgeInsets.symmetric(
                      horizontal: MediaQuery.of(context).size.width * 0.05),
                  child: Row(
                    children: [
                      CircleAvatar(
                        backgroundColor: colorBackgroundScreen,
                        radius: MediaQuery.of(context).size.width * 0.05,
                        child: Icon(
                          Icons.person,
                          color: colorBottomPanelProduct,
                        ),
                      ),
                      SizedBox(width: MediaQuery.of(context).size.width * 0.01),
                      Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            "USER_NAME",
                            style: TextStyle(
                              color: colorAppBar,
                              fontSize:
                                  MediaQuery.of(context).size.width * 0.04,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          Text(
                            "Перейти в профиль",
                            style: TextStyle(
                              color: colorAppBar,
                              fontSize:
                                  MediaQuery.of(context).size.width * 0.04,
                            ),
                          ),
                        ],
                      ),
                      Spacer(),
                      Icon(
                        Icons.arrow_forward_ios_sharp,
                        color: colorAppBar,
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildBody() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: [
        SizedBox(height: MediaQuery.of(context).size.height * 0.06),
        _buildConnectToProfileFrom(),
        SizedBox(height: MediaQuery.of(context).size.height * 0.04),
        _buildButtonMore("Мои заказы", colorMoreScreenAppBar, colorBlack,
            colorAppBar, null, Icons.arrow_forward_ios_sharp, colorAppBar),
        _buildButtonMore("Акции", colorMoreScreenAppBar, colorBlack,
            colorAppBar, null, Icons.arrow_forward_ios_sharp, colorAppBar),
        _buildButtonMore("Вакансии", colorMoreScreenAppBar, colorBlack,
            colorAppBar, null, Icons.arrow_forward_ios_sharp, colorAppBar),
        _buildButtonMore("Перейти на сайт", colorMoreScreenAppBar, colorBlack,
            colorAppBar, null, Icons.arrow_forward_ios_sharp, colorAppBar),
        _buildButtonMore(
          "Подробнее о приложении",
          colorMoreScreenAppBar,
          colorBlack,
          colorAppBar,
          null,
          Icons.arrow_forward_ios_sharp,
          colorAppBar,
        ),
        _buildButtonMore(
            "Выйти из профиля",
            colorMoreScreenAppBar,
            colorBlack,
            colorBottomPanelProduct,
            null,
            Icons.exit_to_app,
            colorBottomPanelProduct),
        _buildUnderPanelMoreScreen(),
      ],
    );
  }

  PreferredSizeWidget _buildAppBar() {
    return PreferredSize(
      preferredSize: Size.fromHeight(kToolbarHeight),
      child: AppBar(
        backgroundColor: colorBackgroundScreen,
        automaticallyImplyLeading: false,
        title: Text(
          "Меню приложения",
          style: TextStyle(color: colorNameApp),
        ),
        centerTitle: true,
        leading: Row(
          children: [
            Flexible(
              child: Image.asset('assets/images/icon.png'),
            ),
          ],
        ),
      ),
    );
  }
}
