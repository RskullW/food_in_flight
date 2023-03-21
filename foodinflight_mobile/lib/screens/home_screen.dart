// ignore_for_file: prefer_const_constructors, sort_child_properties_last, use_key_in_widget_constructors

import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:mobile/components/bottom_bar.dart';
import 'package:mobile/products/categories.dart';
import 'package:mobile/products/product.dart';
import 'package:mobile/products/product_grid.dart';
import 'package:mobile/components/colors.dart';

class HomeScreen extends StatefulWidget {
  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();
  bool _isSearchOpen = false;
  TextEditingController _searchController = TextEditingController();
  List<Product> _products = [];
  List<Product> _productsSearchList = [];
  List<String> _categories = [];

  Future<List<Product>> fetchProducts() async {
    final response =
        await http.get(Uri.parse('https://foodflight.ru/api/products/'));

    if (response.statusCode == 200) {
      final jsonData = jsonDecode(response.body);
      final products = <Product>[];

      for (var item in jsonData) {
        products.add(Product.fromJson(item));
      }

      return products;
    } else {
      throw Exception('Failed to load products');
    }
  }

  @override
  void initState() {
    super.initState();
    _loadProducts();
  }

  Future<void> _loadProducts() async {
    final products = await fetchProducts();
    final categories = <String>{};

    for (var product in products) {
      categories.add(product.Category);
    }

    setState(() {
      _products = products;
      _productsSearchList = List<Product>.from(_products);
      _categories = categories.toList();
    });
  }

  void _searchForProducts(String query) {
    setState(() {
      _productsSearchList = _products
          .where((product) =>
              product.Name.toLowerCase().contains(query.toLowerCase()))
          .toList();
    });
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

          if (!_isSearchOpen) {
            _searchController.clear();
            _productsSearchList =
                List<Product>.from(_products); // TODO: Optimaze
          }
        });
      },
      color: colorIcon,
      splashColor: Colors.transparent,
      highlightColor: colorIcon.withOpacity(0.1),
    );
  }

  Widget _buildSearchBar() {
    return TextField(
      controller: _searchController,
      decoration: InputDecoration(
        hintText: 'Введите запрос...',
        hintStyle: TextStyle(color: colorAppBar),
        enabledBorder:
            UnderlineInputBorder(borderSide: BorderSide(color: colorAppBar)),
        focusedBorder:
            UnderlineInputBorder(borderSide: BorderSide(color: colorAppBar)),
      ),
      style: TextStyle(color: colorAppBar),
      onChanged: _searchForProducts,
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
                  color: colorNameApp,
                  fontWeight: FontWeight.bold,
                )),
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

  Widget? _buildBody() {
    return _isSearchOpen
        ? _productsSearchList.isNotEmpty
            ? ProductGrid(products: _productsSearchList)
            : Center(
                child: Text(
                  'Товар не найден!',
                  style: TextStyle(
                    fontSize: MediaQuery.of(context).size.width * 0.05,
                    color: colorAppBar,
                  ),
                ),
              )
        : ProductGridWithTitle(products: _products, categories: _categories);
  }

  Widget _buildAllBars() {
    return Scaffold(
      key: _scaffoldKey,
      body: _buildBody(),
      appBar: _buildAppBar(),
      bottomNavigationBar: MyBottomAppBar("Home"),
      backgroundColor: colorBackgroundScreen,
    );
  }

  @override
  Widget build(BuildContext context) {
    return _buildAllBars();
  }
}
