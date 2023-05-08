// ignore_for_file: prefer_const_constructors, unrelated_type_equality_checks, use_build_context_synchronously

import 'package:flutter/material.dart';
import 'package:mobile/components/bottom_bar.dart';
import 'package:mobile/components/colors.dart';
import 'package:mobile/components/custom_icons.dart';
import 'package:provider/provider.dart';
import 'package:mobile/users/auth_provider.dart';
import '../components/display_message.dart';
import '../components/gradient_color.dart';
import 'package:url_launcher/url_launcher.dart';

class MyMoreScreen extends StatefulWidget {
  @override
  _MyMoreScreenState createState() => _MyMoreScreenState();
}

class _MyMoreScreenState extends State<MyMoreScreen> {
  bool _isAuthenticated = false;
  Future<void>? _launched;

  Widget _buildAllBars() {
    return Container(
      decoration: GetGradientBackgroundScreenOnMenu(),
      child: Scaffold(
        body: _buildBody(),
        appBar: _buildAppBar(),
        bottomNavigationBar: MyBottomAppBar("More"),
        backgroundColor: Colors.transparent,
      ),
    );
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();

    _isAuthenticated =
        Provider.of<AuthProvider>(context, listen: false).getAuthenticated() ==
            true;
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
            ? () => onPressed()
            : () => ShowMessage(context,
                'MORE_SCREEN._BUILD_BUTTON_MORE.EXPANDED.GESTUREDETECTOR.ONTAP.ACTION = ONTAP'),
        child: Container(
          decoration: BoxDecoration(
            color: colorBackgroundScreen.withOpacity(0.1),
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
          onTap: () => _launchSite("vk.com", path: "5fs4d3j2"),
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
          onTap: () => _launchSite('instagram.com'),
          child: CustomIcons.GetIcon(
              'instagram',
              MediaQuery.of(context).size.width * 0.065,
              MediaQuery.of(context).size.height * 0.065,
              opacity: 0.6),
        ),
        Spacer(),
        Spacer(),
        Text(
          'Version 00.50.0.r (130)',
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

  Widget _buildConnectToProfileFrom(bool isAuthenticated) {
    return Expanded(
      child: GestureDetector(
        child: Container(
          decoration: BoxDecoration(
            color: colorMoreScreenAppBar.withOpacity(0.6),
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
                            isAuthenticated
                                ? Provider.of<AuthProvider>(context,
                                        listen: false)
                                    .getLogin()
                                : "Войти",
                            style: TextStyle(
                              color: colorAppBar,
                              fontSize:
                                  MediaQuery.of(context).size.width * 0.04,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ],
                      ),
                      Spacer(),
                      isAuthenticated
                          ? SizedBox()
                          : GestureDetector(
                              onTap: () => Navigator.pushNamed(
                                  context, '/authorization_screen'),
                              child: Container(
                                padding: EdgeInsets.symmetric(
                                    vertical: 12.0, horizontal: 20.0),
                                decoration: BoxDecoration(
                                  borderRadius: BorderRadius.circular(30.0),
                                  color:
                                      colorBottomPanelProduct.withOpacity(0.2),
                                ),
                                child: Text(
                                  'Войти',
                                  style: TextStyle(
                                    fontSize: 16.0,
                                    fontWeight: FontWeight.w600,
                                    color: colorAppBar.withBlue(220),
                                  ),
                                ),
                              ),
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
        _buildConnectToProfileFrom(_isAuthenticated),
        SizedBox(height: MediaQuery.of(context).size.height * 0.04),
        _buildButtonMore(
            "Мои заказы",
            colorMoreScreenAppBar,
            colorBlack,
            colorAppBar,
            ProcessButtonHistoryOrders,
            Icons.arrow_forward_ios_sharp,
            colorAppBar),
        _buildButtonMore(
            "Перейти на сайт",
            colorMoreScreenAppBar,
            colorBlack,
            colorAppBar,
            () => _launchSite("foodflight.ru"),
            Icons.arrow_forward_ios_sharp,
            colorAppBar),
        _buildButtonMore(
          "Ссылка на репозиторий: ",
          colorMoreScreenAppBar,
          colorBlack,
          colorAppBar,
          () => _launchSite("github.com", path: "RskullW"),
          Icons.arrow_forward_ios_sharp,
          colorAppBar,
        ),
        _buildButtonMore(
          "Команда разработчиков: ",
          colorMoreScreenAppBar,
          colorBlack,
          colorAppBar,
          () => _launchSite("foodflight.ru", path: "more/developers"),
          Icons.arrow_forward_ios_sharp,
          colorAppBar,
        ),
        _isAuthenticated
            ? _buildButtonMore(
                "Выйти из профиля",
                colorMoreScreenAppBar,
                colorBlack,
                colorBottomPanelProduct,
                () => ProcessButtonExitProfile(),
                Icons.exit_to_app,
                colorBottomPanelProduct)
            : Container(),
        _buildUnderPanelMoreScreen(),
      ],
    );
  }

  void _launchSite(String url, {String path = ""}) {
    final Uri toLaunch = Uri(scheme: 'https', host: url, path: path);
    _launchInBrowser(toLaunch);
    FutureBuilder<void>(future: _launched, builder: _launchStatus);
  }

  Widget _launchStatus(BuildContext context, AsyncSnapshot<void> snapshot) {
    if (snapshot.hasError) {
      return Text('Error: ${snapshot.error}');
    } else {
      return const Text('');
    }
  }

  Future<void> _launchInBrowser(Uri url) async {
    if (!await launchUrl(
      url,
      mode: LaunchMode.externalApplication,
    )) {
      throw Exception('Could not launch $url');
    }
  }

  Future<void> ProcessButtonExitProfile() async {
    await Provider.of<AuthProvider>(context, listen: false).deleteToken();
    Navigator.pushNamedAndRemoveUntil(
      context,
      '/home',
      (route) => false,
    );
  }

  void ProcessButtonHistoryOrders() {
    Navigator.pushNamed(context, '/history_orders');
  }

  PreferredSizeWidget _buildAppBar() {
    return PreferredSize(
      preferredSize: Size.fromHeight(kToolbarHeight),
      child: AppBar(
        elevation: 0,
        backgroundColor: Colors.transparent,
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
