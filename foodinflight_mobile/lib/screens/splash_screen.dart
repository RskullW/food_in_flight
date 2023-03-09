import 'package:flutter/material.dart';

class SplashScreen extends StatefulWidget {
  @override
  _SplashScreenState createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    _controller =
        AnimationController(duration: Duration(seconds: 5), vsync: this);
    _animation = Tween<double>(begin: 0.2, end: 1).animate(_controller)
      ..addListener(() {
        setState(() {});
      });
    _controller.forward().whenComplete(() {
      Navigator.pushReplacementNamed(context, '/home');
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color.fromARGB(255, 230, 141, 246),
      body: Center(
        child: Opacity(
            opacity: _animation.value,
            child: Transform.scale(
              scale: 0.7,
              child: Image.asset('assets/images/logo.png'),
            )),
      ),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }
}
