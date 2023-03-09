// ignore_for_file: prefer_const_constructors, sort_child_properties_last, use_key_in_widget_constructors

import 'package:flutter/material.dart';
import 'package:mobile/components/bottom_bar.dart';
import 'package:mobile/components/product.dart';
import 'package:mobile/components/product_grid.dart';
import 'package:mobile/components/colors.dart';

class HomeScreen extends StatefulWidget {
  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();
  bool _isSearchOpen = false;
  TextEditingController _searchController = TextEditingController();
  late List<Product> _products;
  late ProductGrid _productGrid;

  @override
  void initState() {
    super.initState();
    _products = [
      Product(
        name: "Серёжа, иди нахуй",
        price: 10000000000000000000000,
        imageUrl: "https://picsum.photos/200/300",
      ),
      Product(
        name: "Харам с соусом",
        price: 100,
        imageUrl: "https://picsum.photos/200/300",
      ),
      Product(
        name: "Харам с соусом",
        price: 100,
        imageUrl: "https://picsum.photos/200/300",
      ),
      Product(
        name: "Харам с соусом",
        price: 100,
        imageUrl: "https://picsum.photos/200/300",
      ),
      Product(
        name: "Харам с соусом",
        price: 100,
        imageUrl: "https://picsum.photos/200/300",
      )
    ];
    _productGrid = ProductGrid(products: _products);
  }

  Widget _buildLeadingIcon() {
    return Image.asset('assets/images/icon.png');
  }

  Widget _buildTrailingIcon() {
    return IconButton(
      icon: _isSearchOpen ? Icon(Icons.close) : Icon(Icons.search),
      onPressed: () {
        setState(() {
          _isSearchOpen = !_isSearchOpen;
        });
      },
    );
  }

  Widget _buildSearchBar() {
    return TextField(
      controller: _searchController,
      decoration: InputDecoration(
        hintText: 'Введите запрос...',
      ),
    );
  }

  PreferredSizeWidget _buildAppBar() {
    return PreferredSize(
      preferredSize: Size.fromHeight(kToolbarHeight),
      child: AppBar(
        backgroundColor: colorBackgroundScreen,
        automaticallyImplyLeading: false,
        title: _isSearchOpen
            ? _buildSearchBar()
            : Text('FOOD IN FLIGHT',
                style: TextStyle(
                    color: colorNameApp, fontWeight: FontWeight.bold)),
        centerTitle: true,
        leading: _isSearchOpen
            ? null
            : Row(
                children: [
                  Flexible(
                    child: _buildLeadingIcon(),
                  ),
                ],
              ),
        actions: <Widget>[
          _buildTrailingIcon(),
        ],
      ),
    );
  }

  Widget _buildAllBars() {
    return Scaffold(
      key: _scaffoldKey,
      appBar: _buildAppBar(),
      body: _productGrid,
      bottomNavigationBar: MyBottomAppBar("Home"),
      backgroundColor: colorBackgroundScreen,
    );
  }

  @override
  Widget build(BuildContext context) {
    return _buildAllBars();
  }
}
