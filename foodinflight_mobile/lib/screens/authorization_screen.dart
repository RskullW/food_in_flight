import 'package:flutter/material.dart';
import 'package:mobile/components/colors.dart';

class AuthorizationScreen extends StatefulWidget {
  @override
  _AuthorizationScreenState createState() => _AuthorizationScreenState();
}

class _AuthorizationScreenState extends State<AuthorizationScreen> {
  @override
  Widget build(BuildContext context) {
    return _buildAllBars();
  }

  Widget _buildAllBars() {
    return Scaffold(
      body: _buildBody(),
      appBar: _buildAppBar(),
      backgroundColor: colorBackgroundScreen,
    );
  }

  PreferredSizeWidget _buildAppBar() {
    return PreferredSize(
      preferredSize: Size.fromHeight(kToolbarHeight),
      child: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        automaticallyImplyLeading: false,
        actions: <Widget>[
          const Spacer(flex: 30),
          IconButton(
            onPressed: () => Navigator.pop(context),
            icon: Icon(Icons.clear,
                color: colorAppBar,
                size: MediaQuery.of(context).size.width * 0.1),
            splashColor: Colors.transparent,
            highlightColor: colorAppBar.withOpacity(0.1),
          ),
          const Spacer(),
        ],
      ),
    );
  }

  Widget _buildBody() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Image.asset(
          'assets/images/logo.png',
          scale: MediaQuery.of(context).size.width * 0.025,
        ),
      ],
    );
  }
}
