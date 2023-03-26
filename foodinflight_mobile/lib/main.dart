import 'package:flutter/material.dart';
import 'package:mobile/screens/authorization_screen.dart';
import 'package:mobile/screens/cart_screen.dart';
import 'package:mobile/screens/home_screen.dart';
import 'package:mobile/screens/menu_screen.dart';
import 'package:mobile/screens/more_screen.dart';
import 'package:mobile/screens/registration_screen.dart';
import 'package:mobile/screens/user_screen.dart';
import 'package:mobile/screens/category_products.dart';
import 'package:mobile/screens/splash_screen.dart';
import 'package:mobile/users/auth_provider.dart';
import 'package:mobile/utils/internet_connectivity_checker.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider()),
      ],
      child: MaterialApp(
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
          '/menu_screen': (context) => MenuScreen(),
          '/category_products': (context) => CategoryProductsScreen(),
          '/user_screen': (context) => UserScreen(),
          '/authorization_screen': (context) => AuthorizationScreen(),
          '/registration_screen': (context) => RegistrationScreen(),
        },
      ),
    );
  }
}
