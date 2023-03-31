// ignore_for_file: prefer_const_constructors, unrelated_type_equality_checks, use_build_context_synchronously

import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:mobile/components/colors.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../components/gradient_color.dart';
import '../users/auth_provider.dart';

class RegistrationScreen extends StatefulWidget {
  @override
  _RegistrationScreenState createState() => _RegistrationScreenState();
}

class _RegistrationScreenState extends State<RegistrationScreen> {
  bool _isLoading = false;
  String _email = " ";
  String _password = " ";
  String _tokenUser = "";

  @override
  Widget build(BuildContext context) {
    return _buildAllBars();
  }

  Widget _buildAllBars() {
    return Container(
      decoration: GetGradientBackgroundScreen(),
      child: Scaffold(
        body: _buildBody(),
        appBar: _buildAppBar(),
        backgroundColor: Colors.transparent,
      ),
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
    final emailRegExp = RegExp(
      r"^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$",
    );
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
                      'РЕГИСТРАЦИЯ',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 24,
                        color: colorAppBar,
                      ),
                      textAlign: TextAlign.center,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
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
                                hintText: 'Введите почту',
                                border: InputBorder.none,
                              ),
                              onChanged: (emailUser) {
                                setState(() {
                                  if (emailUser.length >= 4 &&
                                      emailRegExp.hasMatch(emailUser)) {
                                    _email = emailUser;
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
                                  if (passwordUser.length >= 8 &&
                                      passwordRegExp.hasMatch(passwordUser)) {
                                    _password = passwordUser;
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
                Center(
                  child: GestureDetector(
                    onTap: () => ProcessRegistration(),
                    child: Container(
                      padding: EdgeInsets.symmetric(
                          vertical: 12.0, horizontal: 25.0),
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(30.0),
                        color: colorAppBar,
                      ),
                      child: Text(
                        'Зарегистрироваться',
                        style: TextStyle(
                          fontSize: 16.0,
                        ),
                      ),
                    ),
                  ),
                ),
              ],
            ),
          )
        : Center(
            child: CircularProgressIndicator(),
          );
  }

  Future<void> ProcessRegistration() async {
    final passwordRegExp = RegExp(r'^(?=.*?[A-Za-z])(?=.*?[0-9]).{5,}$');
    final emailRegExp = RegExp(
      r"^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$",
    );

    if (_password.length < 8 || !passwordRegExp.hasMatch(_password)) {
      ShowMessage("Пароль должен быть не менее 8 символов!");
    } else if (_email.length < 4 || !emailRegExp.hasMatch(_email)) {
      ShowMessage("Неверно указан электронный адрес!");
    } else {
      bool isExistanceLogin = await RegistrationAccount();

      if (isExistanceLogin) {
        ShowMessage("Аккаунт с такой почтой или логином уже существует!");
      } else {
        await Provider.of<AuthProvider>(context, listen: false)
            .set(true, _tokenUser, _email);
        Navigator.pushNamedAndRemoveUntil(
          context,
          '/home',
          (route) => false,
        );
      }
    }
  }

  void ShowMessage(String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
        duration: Duration(seconds: 3),
      ),
    );
  }

  Future<bool> RegistrationAccount() async {
    setState(() {
      _isLoading = true;
    });
    final response = await http.post(
      Uri.parse('https://foodflight.ru/api/register/'),
      body: {
        'username': _email,
        'email': _email,
        'password': _password,
      },
    );

    setState(() {
      _isLoading = false;
    });
    if (response.statusCode == 201) {
      final jsonBody = json.decode(response.body);
      _tokenUser = jsonBody['token'];
      return false;
    } else if (response.statusCode == 400) {
      final jsonBody = json.decode(response.body);
      ShowMessage("Ошибка при регистрации аккаунта!");
    }

    return true;
  }
}
