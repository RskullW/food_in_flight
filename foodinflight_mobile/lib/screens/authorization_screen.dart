// ignore_for_file: prefer_const_constructors, prefer_const_literals_to_create_immutables

import 'package:flutter/material.dart';
import 'package:mobile/components/colors.dart';

class AuthorizationScreen extends StatefulWidget {
  @override
  _AuthorizationScreenState createState() => _AuthorizationScreenState();
}

class _AuthorizationScreenState extends State<AuthorizationScreen> {
  final String _mailUser = "";
  final String _passwordUser = "";

  @override
  Widget build(BuildContext context) {
    return _buildAllBars();
  }

  Widget _buildAllBars() {
    return Scaffold(
      body: _buildBody(),
      appBar: _buildAppBar(),
      backgroundColor: colorBackgroundScreen,
    );
  }

  PreferredSizeWidget _buildAppBar() {
    return PreferredSize(
      preferredSize: Size.fromHeight(kToolbarHeight),
      child: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        automaticallyImplyLeading: false,
        actions: <Widget>[
          const Spacer(flex: 30),
          IconButton(
            onPressed: () => Navigator.pop(context),
            icon: Icon(Icons.clear,
                color: colorAppBar,
                size: MediaQuery.of(context).size.width * 0.1),
            splashColor: Colors.transparent,
            highlightColor: colorAppBar.withOpacity(0.1),
          ),
          const Spacer(),
        ],
      ),
    );
  }

  Widget _buildBody() {
    final mailRegExp = RegExp(
      r"^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$",
    );

    final passwordRegExp = RegExp(r'^(?=.*?[A-Za-z])(?=.*?[0-9]).{5,}$');

    return Column(
      mainAxisAlignment: MainAxisAlignment.start,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        SizedBox(height: MediaQuery.of(context).size.width * 0.05),
        Center(
          child: Image.asset(
            'assets/images/logo.png',
            scale: MediaQuery.of(context).size.width * 0.015,
          ),
        ),
        SizedBox(height: MediaQuery.of(context).size.width * 0.05),
        Center(
          child: SizedBox(
            height: 62,
            child: Text(
              'Пожалуйста, введите почту и пароль,\nкоторую указывали при регистрации,\nчтобы авторизоваться',
              style: TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 16,
                color: colorAppBar,
              ),
              textAlign: TextAlign.center,
              maxLines: 3,
              overflow: TextOverflow.ellipsis,
            ),
          ),
        ),
        SizedBox(height: MediaQuery.of(context).size.width * 0.05),
        Row(
          children: [
            SizedBox(width: MediaQuery.of(context).size.width * 0.1),
            Expanded(
              child: Container(
                decoration: BoxDecoration(
                  color: colorBottomPanelProduct,
                  borderRadius: BorderRadius.all(Radius.circular(20)),
                  border: Border.all(color: colorAppBar, width: 0.2),
                ),
                child: Padding(
                  padding: const EdgeInsets.all(10.0),
                  child: TextField(
                      decoration: InputDecoration(
                        hintText: 'Введите почту',
                        border: InputBorder.none,
                      ),
                      onChanged: (_mailUser) {
                        if (_mailUser.length < 5 ||
                            !mailRegExp.hasMatch(_mailUser)) {
                          print('Invalid email');
                        } else {
                          print('Valid email');
                        }
                      }),
                ),
              ),
            ),
            SizedBox(width: MediaQuery.of(context).size.width * 0.1),
          ],
        ),
        SizedBox(
          height: MediaQuery.of(context).size.width * 0.02,
        ),
        Row(
          children: [
            SizedBox(width: MediaQuery.of(context).size.width * 0.1),
            Expanded(
              child: Container(
                decoration: BoxDecoration(
                  color: colorBottomPanelProduct,
                  borderRadius: BorderRadius.all(Radius.circular(20)),
                  border: Border.all(color: colorAppBar, width: 0.2),
                ),
                child: Padding(
                  padding: const EdgeInsets.all(10.0),
                  child: TextField(
                      decoration: InputDecoration(
                        hintText: 'Введите пароль',
                        border: InputBorder.none,
                      ),
                      obscureText: true,
                      onChanged: (_passwordUser) {
                        if (_passwordUser.length < 8 ||
                            !passwordRegExp.hasMatch(_passwordUser)) {
                          print('Invalid password');
                        } else {
                          print('Valid password');
                        }
                      }),
                ),
              ),
            ),
            SizedBox(width: MediaQuery.of(context).size.width * 0.1),
          ],
        ),
        SizedBox(
          height: MediaQuery.of(context).size.width * 0.02,
        ),
        Row(
          children: [
            SizedBox(width: MediaQuery.of(context).size.width * 0.1),
            GestureDetector(
              onTap: () => print("REGISTRATION SCREEN"),
              child: Container(
                padding: EdgeInsets.symmetric(vertical: 12.0, horizontal: 25.0),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(30.0),
                  color: colorAppBar,
                ),
                child: Text(
                  'Регистрация',
                  style: TextStyle(
                    fontSize: 16.0,
                  ),
                ),
              ),
            ),
            Spacer(),
            GestureDetector(
              onTap: () => ProcessAuthorization(),
              child: Container(
                padding: EdgeInsets.symmetric(vertical: 12.0, horizontal: 25.0),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(30.0),
                  color: colorAppBar,
                ),
                child: Text(
                  'Вход в аккаунт',
                  style: TextStyle(
                    fontSize: 16.0,
                  ),
                ),
              ),
            ),
            SizedBox(width: MediaQuery.of(context).size.width * 0.1),
          ],
        ),
      ],
    );
  }

  Widget ProcessAuthorization() {
    return Container();
  }
}
