import 'dart:math';

import 'package:flutter/foundation.dart';
import 'package:mobile/maps/map_screen.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;

class AuthProvider with ChangeNotifier {
  bool _isAuthenticated = false;
  String _tokenUser = "";
  String _loginUser = "";
  String _addressUser = "";

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
      final url = Uri.parse('https://foodflight.ru/api/logout/');
      Map<String, String> headers = {
        'ContentType': 'application/json',
        'Authorization': 'Token $_tokenUser',
      };

      final response = await http.post(url, headers: headers);
      if (response.statusCode == 204) {
        if (kDebugMode) ('Logout all successful');
      } else {
        if (kDebugMode) {
          print('Logout all failed with status code ${response.statusCode}');
        }
      }

      notifyListeners();

      SharedPreferences prefs = await SharedPreferences.getInstance();

      _loginUser = _tokenUser = _addressUser = "";
      _isAuthenticated = false;
      await prefs.setBool('isAuthenticated', false);
      await prefs.remove("tokenUser");
      await prefs.remove("loginUser");
      await prefs.remove("addressUser");
      await prefs.remove("numberPhoneUser");
      await prefs.remove("nameUser");
    }
  }

  void LoadData() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    _isAuthenticated = prefs.getBool('isAuthenticated') ?? false;

    if (_isAuthenticated) {
      _tokenUser = prefs.getString("tokenUser") ?? "";
      _loginUser = prefs.getString("loginUser") ?? "";
      _addressUser = prefs.getString("addressUser") ?? "";
      MapScreen.STREET.value = _addressUser;
    }
  }

  Future<void> saveStateUser(
      String addressUser, String numberPhoneUser, String nameUser) async {
    _addressUser = addressUser;

    if (kDebugMode) print("IS_STATS_USER (set): $nameUser");

    notifyListeners();

    SharedPreferences prefs = await SharedPreferences.getInstance();

    await prefs.setString("addressUser", _addressUser);
  }

  String getAddressUser() {
    if (kDebugMode) print("IS_ADDRESS_USER (get): $_addressUser");
    return _addressUser;
  }
}
