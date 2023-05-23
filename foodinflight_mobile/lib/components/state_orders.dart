import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:mobile/components/cart.dart';
import 'package:mobile/users/auth_provider.dart';
import 'package:provider/provider.dart';
import 'package:mobile/components/delivery_type.dart';
import 'dart:convert';

class OrderState {
  String _uniqueKey = "NONE";

  String get UniqueKey => _uniqueKey;

  Future<void> UpdateState(String key, String value) async {}

  Future<void> SetStateOrder(
      BuildContext context, String key, String value) async {
    final response = await http.patch(
        Uri.parse('https://foodflight.ru/api/orders/$_uniqueKey/'),
        headers: {
          "Content-Type": "application/json",
          "Authorization":
              "token ${Provider.of<AuthProvider>(context, listen: false).getToken()}"
        },
        body: jsonEncode({
          key: value,
        }));

    if (response.statusCode != 200 &&
        response.statusCode != 201 &&
        response.statusCode != 204) {
      if (kDebugMode)
        ('Failed to set \'$key\' order: ${response.statusCode}\n');
    }
  }

  Future<void> CreateOrder(
      BuildContext context,
      String name,
      String phone,
      DeliveryType deliveryType,
      String address,
      List<ProductInCart> productsInCart) async {
    String uniqueKey = "NONE";
    String type =
        jsonEncode(deliveryType.toString().split('.')[1].toLowerCase());

    List<Map<String, dynamic>> items = productsInCart
        .map((productInCart) => {
              "slug": productInCart.product.Slug,
              "amount": productInCart.numbersOfCount,
              "add_ice": "False",
            })
        .toList();

    final response =
        await http.post(Uri.parse('https://foodflight.ru/api/orders/'),
            headers: {
              "Content-Type": "application/json",
              "Authorization":
                  "token ${Provider.of<AuthProvider>(context, listen: false).getToken()}"
            },
            body: jsonEncode({
              "name": name,
              "phone": phone,
              "delivery_type": type,
              "address": address,
              "items": items,
            }));

    if (response.statusCode == 201) {
      final jsonResponse = json.decode(response.body);

      _uniqueKey = jsonResponse['unique_uuid'];
    } else {
      final jsonResponse = json.decode(response.body);

      throw Exception(
          "Failed to create order. Status code: ${response.statusCode}:${jsonDecode(response.body)}");
    }
  }
}
