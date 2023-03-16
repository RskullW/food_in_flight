import 'dart:async';
import 'package:flutter/material.dart';
import 'package:connectivity/connectivity.dart';
import 'package:mobile/components/colors.dart';

const int FAILED_CONNECTION_TIME = 4;
const int SUCCESSFUL_CONNECTION_TIME = 10;

class InternetConnectivityChecker extends StatefulWidget {
  final Widget child;

  const InternetConnectivityChecker({
    required this.child,
  });

  @override
  _InternetConnectivityCheckerState createState() =>
      _InternetConnectivityCheckerState();
}

class _InternetConnectivityCheckerState
    extends State<InternetConnectivityChecker> {
  late StreamSubscription<ConnectivityResult> _subscription;
  bool _isConnected = true;
  late Timer _timer;

  @override
  void initState() {
    super.initState();
    _subscription = Connectivity()
        .onConnectivityChanged
        .listen((ConnectivityResult result) {
      setState(() {
        _isConnected = result != ConnectivityResult.none;
      });
    });

    _isConnected =
        Connectivity().checkConnectivity() == ConnectivityResult.none;

    _timer = Timer.periodic(
        Duration(
            seconds: (_isConnected
                ? SUCCESSFUL_CONNECTION_TIME
                : FAILED_CONNECTION_TIME)), (timer) async {
      var connectivityResult = await Connectivity().checkConnectivity();
      setState(() {
        _isConnected = connectivityResult != ConnectivityResult.none;
      });
    });
  }

  @override
  void dispose() {
    _subscription.cancel();
    _timer.cancel();
    super.dispose();
  }

  Widget _buildNoInternetScreen() {
    print("Error connection!\n");

    final screenWidth = MediaQuery.of(context).size.width;
    final fontSize = screenWidth > 0 ? screenWidth : 20.0;

    return Scaffold(
      backgroundColor: colorSplashScreen,
      body: Center(
        child: Transform.scale(
          scale: 0.7,
          child: Center(
            child: Text(
              'Попытка восстановить соединение...',
              style: TextStyle(
                  fontSize: fontSize,
                  color: colorSelectIcon,
                  fontFamily: 'Roboto-Black',
                  fontWeight: FontWeight.bold),
            ),
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return _isConnected ? widget.child : _buildNoInternetScreen();
  }
}
