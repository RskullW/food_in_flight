import 'package:flutter/material.dart';
import 'package:mobile/components/bottom_bar.dart';

class MyMoreScreen extends StatefulWidget {
  @override
  _MyMoreScreenState createState() => _MyMoreScreenState();
}

class _MyMoreScreenState extends State<MyMoreScreen> {
  Widget _buildAllBars() {
    return Scaffold(
      body: Center(
        child: Text('More menu'),
      ),
      bottomNavigationBar: MyBottomAppBar("More"),
    );
  }

  @override
  Widget build(BuildContext context) {
    return _buildAllBars();
  }
}
