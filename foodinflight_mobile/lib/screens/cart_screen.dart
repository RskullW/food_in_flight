import 'package:flutter/material.dart';
import 'package:mobile/components/colors.dart';

class CartScreen extends StatefulWidget {
  @override
  _CartScreenState createState() => _CartScreenState();
}

class _CartScreenState extends State<CartScreen> {
  late int _numberStatusCreationOrder;
  GlobalKey<_CartScreenState> _orderLineKey = GlobalKey<_CartScreenState>();
  PreferredSizeWidget _buildAppBar() {
    return PreferredSize(
      preferredSize: Size.fromHeight(kToolbarHeight),
      child: AppBar(
        title: Text(
          "Корзина",
          style: TextStyle(
              color: colorNameApp,
              fontWeight: FontWeight.bold,
              fontFamily: 'Roboto-Black'),
        ),
        centerTitle: true,
      ),
    );
  }

  Widget _buildStatusOrderLine() {
    return Column();
  }

  @override
  void initState() {
    super.initState();
    _numberStatusCreationOrder = 0;
  }

  Widget _buildBody() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [],
        )
      ],
    );
  }

  Widget _buildAllBars() {
    return Scaffold(
      body: Container(),
      appBar: _buildAppBar(),
      bottomNavigationBar: Container(),
      backgroundColor: colorBackgroundScreen,
    );
  }

  @override
  Widget build(BuildContext context) {
    return _buildAllBars();
  }
}