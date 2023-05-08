// ignore_for_file: prefer_const_constructors

import 'package:flutter/material.dart';
import 'package:mobile/components/cart.dart';
import 'package:mobile/components/colors.dart';
import 'package:mobile/components/delivery_type.dart';
import 'package:mobile/components/state_orders.dart';
import 'package:provider/provider.dart';
import '../components/display_message.dart';
import '../components/gradient_color.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

import '../products/product.dart';
import '../users/auth_provider.dart';

class ProductsInCartHistory {
  List<ProductInCart> ProductsInCart;
  int Price;
  String DataCreateOrder;
  String StatusOrder;
  String Address;
  String NumberPhone;
  String NameClient;

  ProductsInCartHistory({
    required this.ProductsInCart,
    required this.Price,
    required this.DataCreateOrder,
    required this.StatusOrder,
    required this.Address,
    required this.NumberPhone,
    required this.NameClient,
  });
}

class HistoryOrders extends StatefulWidget {
  @override
  _HistoryOrdersState createState() => _HistoryOrdersState();
}

class _HistoryOrdersState extends State<HistoryOrders> {
  List<ProductsInCartHistory> _productsInCart = [];
  @override
  Widget build(BuildContext context) {
    return _buildAllBars();
  }

  @override
  void initState() {
    super.initState();
    _getOrders();
  }

  Widget _buildAllBars() {
    return Container(
      decoration: GetGradientBackgroundScreenOnMenu(),
      child: Scaffold(
        body: _buildBody(),
        appBar: _buildAppBar(),
        backgroundColor: Colors.transparent,
      ),
    );
  }

  Widget _buildBody() {
    return Container();
  }

  PreferredSizeWidget _buildAppBar() {
    return PreferredSize(
      preferredSize: Size.fromHeight(kToolbarHeight),
      child: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        title: Text(
          "История заказов",
          style: TextStyle(
              color: colorNameApp,
              fontWeight: FontWeight.bold,
              fontFamily: 'Roboto-Black'),
        ),
        centerTitle: true,
        automaticallyImplyLeading: false,
        leading: GestureDetector(
          child: Icon(Icons.arrow_back_ios),
          onTap: () => Navigator.pop(context),
        ),
      ),
    );
  }

  Future<Product> fetchProducts(String slug) async {
    final http.Response response =
        await http.get(Uri.parse('https://foodflight.ru/api/products/$slug'));
    if (response.statusCode == 200) {
      final jsonData = jsonDecode(response.body);
      return Product.fromJson(jsonData);
    } else {
      throw Exception('Failed to load products');
    }
  }

  Future<ProductsInCartHistory> _getProductsInCartHistory(dynamic json) async {
    List<ProductInCart> productsInCart = [];
    String dataCreateOrder = json["created"];
    String state = json['state'];
    /* Преобразование времени */
    DateTime dateTime = DateTime.parse(dataCreateOrder);

    String formattedDate =
        "${dateTime.day.toString().padLeft(2, '0')}.${dateTime.month.toString().padLeft(2, '0')}.${dateTime.year} ${(dateTime.hour + 3).toString().padLeft(2, '0')}:${dateTime.minute.toString().padLeft(2, '0')}";

    var items = json['items'];
    for (var item in items) {
      String slug = item['item_slug'];
      int amount = item['amount'];
      Product product = await fetchProducts(slug);
      productsInCart
          .add(ProductInCart(Product: product, numbersOfCount: amount));
    }

    return ProductsInCartHistory(
      ProductsInCart: productsInCart,
      Price: json['items_price'],
      DataCreateOrder: formattedDate,
      StatusOrder: state,
      Address: utf8.decode(json['address'].codeUnits),
      NumberPhone: json['phone'],
      NameClient: utf8.decode(json['name'].codeUnits),
    );
  }

  Future<void> _getOrders() async {
    final response = await http.get(
      Uri.parse('https://foodflight.ru/api/orders'),
      headers: {
        "Authorization":
            "Token ${Provider.of<AuthProvider>(context, listen: false).getToken()}"
      },
    );

    if (response.statusCode == 200) {
      final jsonData = jsonDecode(response.body);

      for (var item in jsonData) {
        ProductsInCartHistory productsInCartHistory =
            await _getProductsInCartHistory(item);
        _productsInCart.add(productsInCartHistory);
        print(
            "DEBUG:\nState:${productsInCartHistory.StatusOrder}\nAddress:${productsInCartHistory.Address}\nData:${productsInCartHistory.DataCreateOrder}\nName:${productsInCartHistory.NameClient}\nOrders:");
        for (var item in productsInCartHistory.ProductsInCart) {
          print("________________");
          print(
              "{Product: ${item.product.Name}\nAmount:${item.numbersOfCount}");
          print("________________");
        }
      }
    } else {
      print("statussss code:${response.statusCode}");
      final jsonResponse = jsonDecode(response.body);

      throw Exception(
          "Failed to create order. Status code: ${response.statusCode}:${jsonDecode(response.body)}");
    }
  }
}
