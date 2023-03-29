import 'package:flutter/material.dart';
import 'package:mobile/products/product.dart';
import 'package:mobile/screens/authorization_screen.dart';
import 'package:mobile/screens/cart_screen.dart';
import 'package:mobile/screens/home_screen.dart';
import 'package:mobile/screens/menu_screen.dart';
import 'package:mobile/screens/more_screen.dart';
import 'package:mobile/screens/product_screen.dart';
import 'package:mobile/screens/registration_screen.dart';
import 'package:mobile/screens/product_categories_screen.dart';
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
          '/authorization_screen': (context) => AuthorizationScreen(),
          '/registration_screen': (context) => RegistrationScreen(),
          '/product_categories_screen': (context) {
            final arguments = ModalRoute.of(context)?.settings.arguments
                as Map<String, dynamic>?;
            final categoryTitle = arguments?['categoryTitle'] as String?;
            return CategoryProductsScreen(categoryTitle: categoryTitle);
          },
          '/product_screen': (context) {
            final arguments = ModalRoute.of(context)?.settings.arguments
                as Map<String, dynamic>?;
            final product = arguments?['product'] as Product?;
            return ProductScreen(product: product);
          },
        },
      ),
    );
  }
}
