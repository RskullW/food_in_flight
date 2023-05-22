// ignore_for_file: prefer_const_constructors, sort_child_properties_last, use_key_in_widget_constructors

import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:mobile/components/bottom_bar.dart';
import 'package:mobile/products/categories_grid.dart';
import 'package:mobile/products/product.dart';
import 'package:mobile/components/colors.dart';
import 'package:mobile/products/product_categories.dart';
import 'package:mobile/users/auth_provider.dart';
import 'package:provider/provider.dart';
import '../components/gradient_color.dart';

class HomeScreen extends StatefulWidget {
  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();
  TextEditingController _searchController = TextEditingController();
  List<ProductCategory> _categories = <ProductCategory>[];
  bool _isLoading = true;

  Future<List<Product>> fetchProducts() async {
    final http.Response response =
        await http.get(Uri.parse('https://foodflight.ru/api/categories'));

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
    _loadCategories();
  }

  Widget _buildLeadingIcon() {
    return Image.asset('assets/images/icon.png');
  }

  PreferredSizeWidget _buildAppBar() {
    String street =
        Provider.of<AuthProvider>(context, listen: false).getAddressUser();

    return PreferredSize(
      preferredSize: Size.fromHeight(kToolbarHeight),
      child: AppBar(
          backgroundColor: Colors.transparent,
          elevation: 0,
          automaticallyImplyLeading: false,
          title: Text(street.length > 1 ? street : "",
              style: TextStyle(
                color: Colors.white,
                fontWeight: FontWeight.bold,
                fontSize: MediaQuery.of(context).size.width * 0.05,
              )),
          leading: Row(
            children: [
              Flexible(
                child: Padding(
                  padding: EdgeInsets.only(
                      left: MediaQuery.of(context).size.width * 0.015),
                  child: _buildLeadingIcon(),
                ),
              ),
            ],
          )),
    );
  }

  Widget? _buildBody() {
    var categoriesGrid = CategoriesGrid(categories: _categories);

    return categoriesGrid;
  }

  Widget _buildAllBars() {
    var body =
        _isLoading ? Center(child: CircularProgressIndicator()) : _buildBody();

    return Container(
      decoration: GetGradientBackgroundScreenOnMenu(),
      child: Scaffold(
        key: _scaffoldKey,
        body: body,
        appBar: _buildAppBar(),
        bottomNavigationBar: MyBottomAppBar("Home"),
        backgroundColor: Colors.transparent,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return _buildAllBars();
  }

  Future<List<ProductCategory>> fetchCategories() async {
    final http.Response response =
        await http.get(Uri.parse('https://foodflight.ru/api/categories'));

    if (response.statusCode == 200) {
      final category = <ProductCategory>[];
      final jsonData = jsonDecode(response.body);
      for (var item in jsonData) {
        category.add(ProductCategory.fromJson(item));
      }

      return category;
    } else {
      throw Exception('Failed to load categories');
    }
  }

  Future<void> _loadCategories() async {
    setState(() {
      _isLoading = true;
    });

    final categories = await fetchCategories();

    setState(() {
      _categories = categories;
      _isLoading = false;
    });
  }
}
