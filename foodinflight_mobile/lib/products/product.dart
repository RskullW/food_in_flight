// ignore_for_file: prefer_const_constructors, sort_child_properties_last, use_key_in_widget_constructors

import 'package:mobile/products/categories.dart';

class Product {
  final String Name;
  final String ImageUrl;
  final String Description;
  final double Price;
  final double Weight;

  final ProductCategory productCategory;

  Product({
    required this.Name,
    required this.ImageUrl,
    required this.Price,
    required this.Description,
    required this.Weight,
    required this.productCategory,
  });
}
