import 'package:flutter/material.dart';
import 'package:mobile/screens/cart_screen.dart';
import 'package:mobile/screens/home_screen.dart';
import 'package:mobile/screens/more_screen.dart';
import 'package:mobile/screens/splash_screen.dart';
import 'package:mobile/utils/internet_connectivity_checker.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Food in Flight',
      theme: ThemeData(
        primarySwatch: Colors.purple,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: MediaQuery(
        data: MediaQueryData(),
        child: InternetConnectivityChecker(
          child: SplashScreen(),
        ),
      ),
      routes: {
        '/home': (context) => HomeScreen(),
        '/more': (context) => MyMoreScreen(),
        '/cart_screen': (context) => CartScreen(),
      },
    );
  }
}
