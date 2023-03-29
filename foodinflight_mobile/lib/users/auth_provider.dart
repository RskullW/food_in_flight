import 'dart:math';

import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;

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

  Future<void> deleteToken() async {
    if (_tokenUser.isNotEmpty) {
      final url = Uri.parse('https://foodflight.ru/api/logoutall/');
      Map<String, String> headers = {
        'ContentType': 'application/json',
        'Authorization': 'Token $_tokenUser',
      };

      final response = await http.post(url, headers: headers);
      if (response.statusCode == 204) {
        print('Logout all successful');
      } else {
        print('Logout all failed with status code ${response.statusCode}');
      }

      notifyListeners();

      SharedPreferences prefs = await SharedPreferences.getInstance();

      _loginUser = _tokenUser = "";
      _isAuthenticated = false;
      await prefs.setBool('isAuthenticated', false);
      await prefs.remove("tokenUser");
      await prefs.remove("loginUser");
    }
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
