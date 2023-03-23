// ignore_for_file: prefer_const_constructors, sort_child_properties_last, use_key_in_widget_constructors

import 'dart:convert';
import 'package:mobile/products/product_type.dart';
import 'package:mobile/products/product.dart';

class ProductCategory {
  final String Slug;
  final String Title;
  final String ImageUrl;

  ProductCategory({
    required this.Slug,
    required this.ImageUrl,
    required this.Title,
  });

  factory ProductCategory.fromJson(Map<String, dynamic> json) {
    return ProductCategory(
      Slug: json['slug'],
      Title: utf8.decode(json['title'].codeUnits),
      ImageUrl:
          json['image'] ?? "https://i.ibb.co/Px7bWvM/Image-Not-Loaded.png",
    );
  }
}
