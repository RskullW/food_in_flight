import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class AuthProvider with ChangeNotifier {
  bool _isAuthenticated = false;
  String _tokenUser = "";

  Future<void> set(bool isAuthenticated, String token) async {
    _isAuthenticated = isAuthenticated;
    _tokenUser = token;

    print("IS_AUTHENTICATED (set): $_isAuthenticated");

    notifyListeners();

    SharedPreferences prefs = await SharedPreferences.getInstance();

    await prefs.setBool('isAuthenticated', _isAuthenticated);

    if (_isAuthenticated) {
      await prefs.setString("tokenUser", _tokenUser);
    } else {
      await prefs.remove("tokenUser");
    }
  }

  bool getAuthenticated() {
    print("IS_AUTHENTICATED (get): $_isAuthenticated");

    return _isAuthenticated;
  }

  String getToken() {
    print("IS_TOKEN (get): $_isAuthenticated");
    return _tokenUser;
  }

  void LoadData() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    _isAuthenticated = prefs.getBool('isAuthenticated') ?? false;

    if (_isAuthenticated) {
      _tokenUser = prefs.getString("tokenUser") ?? "";
    }
  }
}

/* 

  Сохранить информацию об авторизации пользователя
  Provider.of<AuthProvider>(context, listen: false).setAuthenticated(true);

  Получить инфомацию: авторизован пользователь или нет
  bool isAuthenticated = Provider.of<AuthProvider>(context).isAuthenticated;
*/