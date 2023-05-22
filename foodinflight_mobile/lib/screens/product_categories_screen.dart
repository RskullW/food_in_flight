// ignore_for_file: prefer_const_constructors

import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:mobile/components/colors.dart';
import 'package:mobile/products/product.dart';
import 'package:mobile/users/auth_provider.dart';
import 'package:provider/provider.dart';
import '../components/gradient_color.dart';
import 'package:http/http.dart' as http;

import '../products/product_grid.dart';

class CategoryProductsScreen extends StatefulWidget {
  final String? categoryTitle;

  CategoryProductsScreen({this.categoryTitle});
  @override
  _CategoryProductsScreenState createState() => _CategoryProductsScreenState();
}

class _CategoryProductsScreenState extends State<CategoryProductsScreen> {
  @override
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();
  bool _isSearchOpen = false;
  TextEditingController _searchController = TextEditingController();
  List<Product> _products = [];
  List<Product> _productsSearchList = [];
  List<String> _categories = [];
  Color circle = colorAppBar;
  bool isLoading = true;

  Future<List<Product>> fetchProducts() async {
    final http.Response response =
        await http.get(Uri.parse('https://foodflight.ru/api/products'));

    if (response.statusCode == 200) {
      final products = <Product>[];
      final jsonData = jsonDecode(response.body);
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
    setState(() {
      isLoading = true;
    });

    final products = await fetchProducts();

    final categories = <String>{};

    for (var product in products) {
      categories.add(product.Category);
    }

    setState(() {
      _products = products
          .where((product) => product.Category == widget.categoryTitle)
          .toList();
      _productsSearchList = List<Product>.from(_products);
      _categories.add(widget.categoryTitle ?? "Продукты:");
      isLoading = false;
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

  Widget _buildTrailingIcon() {
    return IconButton(
      icon: _isSearchOpen
          ? Icon(
              Icons.close,
              color: Colors.white,
            )
          : Icon(
              Icons.search,
              color: Colors.white,
            ),
      onPressed: () {
        setState(() {
          _isSearchOpen = !_isSearchOpen;

          if (!_isSearchOpen) {
            _searchController.clear();
            _productsSearchList = List<Product>.from(_products);
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
        hintStyle: TextStyle(
          color: colorMoreScreenAppBar,
          fontWeight: FontWeight.w600,
        ),
        enabledBorder:
            UnderlineInputBorder(borderSide: BorderSide(color: colorAppBar)),
        focusedBorder:
            UnderlineInputBorder(borderSide: BorderSide(color: colorAppBar)),
      ),
      style: TextStyle(
        color: colorMoreScreenAppBar,
        fontWeight: FontWeight.w600,
      ),
      onChanged: _searchForProducts,
    );
  }

  PreferredSizeWidget _buildAppBar() {
    String street =
        Provider.of<AuthProvider>(context, listen: false).getAddressUser();

    return PreferredSize(
      preferredSize: Size.fromHeight(kToolbarHeight),
      child: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        automaticallyImplyLeading: true,
        title: _isSearchOpen
            ? _buildSearchBar()
            : Text(street.length > 1 ? street : 'Добавьте адрес...',
                style: TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                  fontSize: MediaQuery.of(context).size.width * 0.05,
                )),
        centerTitle: true,
        actions: <Widget>[
          _buildTrailingIcon(),
        ],
      ),
    );
  }

  Widget? _buildBody() {
    var productGrid = ProductGridWithTitle(
      products: _products,
      categories: _categories,
      popularityProducts:
          _products.where((element) => element.IsActive).toList(),
      isHavePopularProduct: false,
    );

    return _isSearchOpen
        ? _productsSearchList.isNotEmpty
            ? ProductGrid(products: _productsSearchList)
            : Center(
                child: Text(
                  'Товар не найден!',
                  style: TextStyle(
                    fontSize: MediaQuery.of(context).size.width * 0.05,
                    color: colorAppBar,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              )
        : productGrid;
  }

  Widget _buildAllBars() {
    var body =
        isLoading ? Center(child: CircularProgressIndicator()) : _buildBody();

    return Container(
      decoration: GetGradientBackgroundScreenOnMenu(),
      child: Scaffold(
        key: _scaffoldKey,
        body: body,
        appBar: _buildAppBar(),
        backgroundColor: Colors.transparent,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return _buildAllBars();
  }
}
