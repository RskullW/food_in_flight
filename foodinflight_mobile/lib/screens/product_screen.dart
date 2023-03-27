// ignore_for_file: prefer_const_constructors

import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:mobile/components/colors.dart';
import 'package:mobile/products/product.dart';
import '../components/gradient_color.dart';
import 'package:http/http.dart' as http;

import '../products/product_grid.dart';

class ProductScreen extends StatefulWidget {
  final Product? product;

  ProductScreen({this.product});
  @override
  _ProductScreenState createState() => _ProductScreenState();
}

class _ProductScreenState extends State<ProductScreen> {
  @override
  Widget build(BuildContext context) {
    return _buildAllBars();
  }

  Widget _buildAllBars() {
    return Container(
      decoration: GetGradientBackgroundScreenOnMenu(),
      child: Scaffold(
        body: _buildBody(),
        appBar: _buildAppBar(),
        bottomNavigationBar: _buildBottomAppBar(),
        backgroundColor: Colors.transparent,
      ),
    );
  }

  Widget _buildBottomAppBar() {
    return Container();
  }

  PreferredSizeWidget _buildAppBar() {
    return AppBar();
  }

  Widget _buildBody() {
    return Container();
  }
}
