// ignore_for_file: prefer_const_constructors, prefer_const_literals_to_create_immutables, use_build_context_synchronously

import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:mobile/components/colors.dart';
import 'package:http/http.dart' as http;
import 'package:provider/provider.dart';

import '../users/auth_provider.dart';

class AuthorizationScreen extends StatefulWidget {
  @override
  _AuthorizationScreenState createState() => _AuthorizationScreenState();
}

class _AuthorizationScreenState extends State<AuthorizationScreen> {
  String _loginUser = "";
  String _passwordUser = "";
  bool _isLoading = false;

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
    final passwordRegExp = RegExp(r'^(?=.*?[A-Za-z])(?=.*?[0-9]).{5,}$');

    return !_isLoading
        ? SingleChildScrollView(
            child: Column(
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
                                hintText: 'Введите логин',
                                border: InputBorder.none,
                              ),
                              onChanged: (loginUser) {
                                setState(() {
                                  if (loginUser.length < 3) {
                                    print('Uncorrect login');
                                  } else {
                                    print('Correct login');
                                    _loginUser = loginUser;
                                  }
                                });
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
                              onChanged: (passwordUser) {
                                setState(() {
                                  if (passwordUser.length < 8 ||
                                      !passwordRegExp.hasMatch(passwordUser)) {
                                    print('Incorrect password');
                                  } else {
                                    print('Correct password');
                                    _passwordUser = passwordUser;
                                  }
                                });
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
                        padding: EdgeInsets.symmetric(
                            vertical: 12.0, horizontal: 25.0),
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
                        padding: EdgeInsets.symmetric(
                            vertical: 12.0, horizontal: 25.0),
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
            ),
          )
        : Center(
            child: CircularProgressIndicator(),
          );
  }

  Future<void> ProcessAuthorization() async {
    var isCorrectLogin = await checkLogin();

    if (isCorrectLogin == true) {
      await Provider.of<AuthProvider>(context, listen: false)
          .setAuthenticated(true);
      Navigator.pushNamedAndRemoveUntil(
        context,
        '/home',
        (route) => false,
      );
    } else {
      ShowMessageAtAuthorization();
    }
  }

  void ShowMessageAtAuthorization() {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Ошибка авторизации. Проверьте почту и пароль'),
        duration: Duration(seconds: 3),
      ),
    );
  }

  Future<bool> checkLogin() async {
    setState(() {
      _isLoading = true;
    });

    final response = await http.post(
        Uri.parse('https://foodflight.ru/api/login/'),
        body: {"username": _loginUser, "password": _passwordUser});

    setState(() {
      _isLoading = false;
    });
    if (response.statusCode == 200) {
      final jsonResponse = json.decode(response.body);
      final bool isCorrect = jsonResponse['token'] == "" ? false : true;

      return isCorrect;
    } else {
      throw Exception('Failed to check login');
    }
  }
}
