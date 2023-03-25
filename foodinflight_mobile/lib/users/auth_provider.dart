import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class AuthProvider with ChangeNotifier {
  bool _isAuthenticated = false;

  Future<void> setAuthenticated(bool value) async {
    _isAuthenticated = value;
    print("IS_AUTHENTICATED (set): $_isAuthenticated");

    notifyListeners();

    SharedPreferences prefs = await SharedPreferences.getInstance();

    await prefs.setBool('isAuthenticated', _isAuthenticated);
  }

  bool getAuthenticated() {
    print("IS_AUTHENTICATED (get): $_isAuthenticated");

    return _isAuthenticated;
  }

  void LoadData() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    _isAuthenticated = prefs.getBool('isAuthenticated') ?? false;
  }
}

/* 

  Сохранить информацию об авторизации пользователя
  Provider.of<AuthProvider>(context, listen: false).setAuthenticated(true);

  Получить инфомацию: авторизован пользователь или нет
  bool isAuthenticated = Provider.of<AuthProvider>(context).isAuthenticated;
*/