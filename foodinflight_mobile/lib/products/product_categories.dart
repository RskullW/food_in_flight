// ignore_for_file: prefer_const_constructors, sort_child_properties_last, use_key_in_widget_constructors

import 'dart:convert';
import 'package:mobile/products/product_type.dart';
import 'package:mobile/products/product.dart';

class ProductCategory {
  final String Slug;
  final String Title;
  final String ImageUrl;
  List<Product> Products = <Product>[];

  ProductCategory({
    required this.Slug,
    required this.ImageUrl,
    required this.Title,
    required this.Products,
  });

  factory ProductCategory.fromJson(
      Map<String, dynamic> json, List<Product> products) {
    return ProductCategory(
      Slug: json['slug'],
      Title: utf8.decode(json['title'].codeUnits),
      ImageUrl: json['images'].isNotEmpty
          ? json['images'][0]['image'] ??
              "https://i.ibb.co/Px7bWvM/Image-Not-Loaded.png"
          : "https://i.ibb.co/Px7bWvM/Image-Not-Loaded.png",
      Products: products,
    );
  }

  void AddProduct(Product product) {
    Products.add(product);
  }

  String GetTitle() {
    return Title;
  }
}
