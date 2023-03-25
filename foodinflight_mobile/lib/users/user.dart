import 'package:flutter/material.dart';

class User {
  final String Login;
  final String Name;
  final String Password;
  final String Mail;

  final bool IsActive;

  User({
    required this.Login,
    required this.Name,
    required this.Password,
    required this.Mail,
    required this.IsActive,
  });
}
