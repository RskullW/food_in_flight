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
  String UuidOrder;
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
    required this.UuidOrder,
  });
}

class HistoryOrders extends StatefulWidget {
  @override
  _HistoryOrdersState createState() => _HistoryOrdersState();
}

class _HistoryOrdersState extends State<HistoryOrders> {
  List<ProductsInCartHistory> _productsInCart = [];
  bool _isLoading = true;
  Color circle = colorAppBar;

  @override
  Widget build(BuildContext context) {
    return _buildAllBars();
  }

  @override
  void initState() {
    super.initState();
    _loadOrders();
  }

  Widget _buildAllBars() {
    var body =
        _isLoading ? Center(child: CircularProgressIndicator()) : _buildBody();

    return Container(
      decoration: GetGradientBackgroundScreenOnMenu(),
      child: Scaffold(
        body: body,
        appBar: _buildAppBar(),
        backgroundColor: Colors.transparent,
      ),
    );
  }

  Widget _buildBody() {
    return ListView.builder(
      itemCount: _productsInCart.length,
      itemBuilder: (context, index) {
        final order = _productsInCart[index];

        return Container(
          decoration: BoxDecoration(
            border: Border.all(color: Colors.grey),
            borderRadius: BorderRadius.circular(8.0),
          ),
          margin: EdgeInsets.all(8.0),
          child: ExpansionTile(
            title: Column(
              children: [
                Row(
                  children: [
                    Text(
                      'Заказ № ',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: MediaQuery.of(context).size.width * 0.05,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    Text(
                      '${order.UuidOrder}',
                      style: TextStyle(
                        color: Colors.white.withOpacity(0.7),
                        fontSize: MediaQuery.of(context).size.width * 0.05,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
                Row(
                  children: [
                    Text(
                      'Статус: ',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: MediaQuery.of(context).size.width * 0.05,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    Text(
                      '${order.StatusOrder}',
                      style: TextStyle(
                        color: Colors.white.withOpacity(0.7),
                        fontSize: MediaQuery.of(context).size.width * 0.05,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
                Row(
                  children: [
                    Text(
                      'Общая сумма заказа: ',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: MediaQuery.of(context).size.width * 0.05,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    Text(
                      '${order.Price + 200} ₽',
                      style: TextStyle(
                        color: Colors.white.withOpacity(0.7),
                        fontSize: MediaQuery.of(context).size.width * 0.05,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
                SizedBox(
                  height: MediaQuery.of(context).size.height * 0.02,
                ),
                Row(
                  children: [
                    Text(
                      'Дата заказа: ',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: MediaQuery.of(context).size.width * 0.05,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    Text(
                      '${order.DataCreateOrder}',
                      style: TextStyle(
                        color: Colors.white.withOpacity(0.7),
                        fontSize: MediaQuery.of(context).size.width * 0.05,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
              ],
            ),
            backgroundColor: colorAppBar.withOpacity(0.7),
            children: [
              ListView.builder(
                shrinkWrap: true,
                physics: ClampingScrollPhysics(),
                itemCount: order.ProductsInCart.length,
                itemBuilder: (context, productIndex) {
                  final product = order.ProductsInCart[productIndex].product;
                  final productCount =
                      order.ProductsInCart[productIndex].numbersOfCount;

                  return ListTile(
                    title: Row(
                      children: [
                        Text(
                          '${product.Name} ',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: MediaQuery.of(context).size.width * 0.04,
                            fontStyle: FontStyle.italic,
                          ),
                        ),
                        Text(
                          'x${productCount}\t\t',
                          style: TextStyle(
                            color: Colors.white.withOpacity(0.8),
                            fontSize: MediaQuery.of(context).size.width * 0.04,
                            fontStyle: FontStyle.italic,
                          ),
                        ),
                        Text(
                          '${(product.Price * productCount).toInt()}₽',
                          style: TextStyle(
                            color: Colors.white.withOpacity(0.8),
                            fontSize: MediaQuery.of(context).size.width * 0.035,
                            fontStyle: FontStyle.italic,
                          ),
                        ),
                      ],
                    ),
                  );
                },
              ),
            ],
          ),
        );
      },
    );
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
            color: Colors.white,
            fontWeight: FontWeight.bold,
            fontSize: MediaQuery.of(context).size.width * 0.05,
          ),
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
    String uuidOrder = json['unique_uuid'];
    /* Преобразование времени */
    DateTime dateTime = DateTime.parse(dataCreateOrder);

    String formattedDate =
        "${dateTime.day.toString().padLeft(2, '0')}.${dateTime.month.toString().padLeft(2, '0')}.${dateTime.year} ${(dateTime.hour + 3).toString().padLeft(2, '0')}:${dateTime.minute.toString().padLeft(2, '0')}";

    uuidOrder = uuidOrder.substring(28, 36);

    switch (state) {
      case 'PENDING':
        state = "Ожидает оплаты";
        break;
      case 'PAID':
        state = "Оплачено";
        break;
      case 'COOKING':
        state = "Готовится";
        break;
      case 'DELIVERING':
        state = "В пути";
        break;
      case 'DELIVERED':
        state = "Доставлен";
        break;
      case 'CANCELED':
        state = "Отменен";
        break;
      default:
        break;
    }

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
      UuidOrder: uuidOrder,
    );
  }

  Future<void> _loadOrders() async {
    setState(() {
      _isLoading = true;
    });

    await _getOrders();

    setState(() {
      _isLoading = false;
    });
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

        if (productsInCartHistory.StatusOrder == "PENDING") {
          continue;
        }
        _productsInCart.add(productsInCartHistory);
      }
    } else {
      final jsonResponse = jsonDecode(response.body);

      throw Exception(
          "Failed to create order. Status code: ${response.statusCode}:${jsonDecode(response.body)}");
    }
  }
}
