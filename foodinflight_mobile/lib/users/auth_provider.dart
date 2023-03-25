import 'package:flutter/material.dart';

class AuthProvider with ChangeNotifier {
  bool _isAuthenticated = false;

  bool get isAuthenticated => _isAuthenticated;

  void setAuthenticated(bool value) {
    _isAuthenticated = value;
    notifyListeners();
  }
}

/* 

  Сохранить информацию об авторизации пользователя
  Provider.of<AuthProvider>(context, listen: false).setAuthenticated(true);

  Получить инфомацию: авторизован пользователь или нет
  bool isAuthenticated = Provider.of<AuthProvider>(context).isAuthenticated;
*/