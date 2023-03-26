import 'dart:math';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class AuthProvider with ChangeNotifier {
  bool _isAuthenticated = false;
  String _tokenUser = "";
  String _loginUser = "";

  Future<void> set(bool isAuthenticated, String token, String login) async {
    _isAuthenticated = isAuthenticated;
    _tokenUser = token;
    _loginUser = login;

    if (kDebugMode) print("IS_AUTHENTICATED (set): $_isAuthenticated");

    notifyListeners();

    SharedPreferences prefs = await SharedPreferences.getInstance();

    await prefs.setBool('isAuthenticated', _isAuthenticated);

    if (_isAuthenticated) {
      await prefs.setString("tokenUser", _tokenUser);
      await prefs.setString("loginUser", _loginUser);
    } else {
      await prefs.remove("tokenUser");
      await prefs.remove("loginUser");
    }
  }

  bool getAuthenticated() {
    if (kDebugMode) print("IS_AUTHENTICATED (get): $_isAuthenticated");

    return _isAuthenticated;
  }

  String getToken() {
    if (kDebugMode) print("IS_TOKEN (get): $_isAuthenticated");
    return _tokenUser;
  }

  String getLogin() {
    if (kDebugMode) ("IS_NAME (get): $_loginUser");
    return _loginUser;
  }

  void LoadData() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    _isAuthenticated = prefs.getBool('isAuthenticated') ?? false;

    if (_isAuthenticated) {
      _tokenUser = prefs.getString("tokenUser") ?? "";
      _loginUser = prefs.getString("loginUser") ?? "";
    }
  }
}

/* 

  Сохранить информацию об авторизации пользователя
  Provider.of<AuthProvider>(context, listen: false).setAuthenticated(true);

  Получить инфомацию: авторизован пользователь или нет
  bool isAuthenticated = Provider.of<AuthProvider>(context).isAuthenticated;
*/