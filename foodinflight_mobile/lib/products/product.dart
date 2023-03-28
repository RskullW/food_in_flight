// ignore_for_file: prefer_const_constructors, sort_child_properties_last, use_key_in_widget_constructors

import 'dart:convert';
import 'package:mobile/products/product_type.dart';

class Product {
  final bool IsActive;
  final bool IsPopular;
  final String Slug;
  final ProductType Type;
  final String Cuisine;
  final String Name;
  final String Description;
  final String Composition;
  final double Price;
  final double Weight;
  final double Calories;
  final double Proteins;
  final double Fats;
  final double Carbohydrates;
  final String ImageUrl;
  final String Category;
  final List<String> GroupCategory;

  bool IsAddToCart = false;

  Product({
    required this.IsActive,
    required this.IsPopular,
    required this.Slug,
    required this.Type,
    required this.Cuisine,
    required this.Name,
    required this.Description,
    required this.Composition,
    required this.Price,
    required this.Weight,
    required this.Calories,
    required this.Proteins,
    required this.Fats,
    required this.Carbohydrates,
    required this.ImageUrl,
    required this.Category,
    required this.GroupCategory,
    required this.IsAddToCart,
  });

  factory Product.fromJson(Map<String, dynamic> json) {
    final type = json['type'] == 'F' ? ProductType.FOOD : ProductType.DRINK;

    final groupCategories = <String>[];
    String cuisine = 'Американская';

    if (json['group_categories'] != null) {
      for (final category in json['group_categories']) {
        final title = category['title'];
        if (title != null) {
          groupCategories.add(utf8.decode(title.codeUnits));
        }
      }
    }

    if (json['cuisine'] != null) {
      final title = json['cuisine']['title'];

      if (title != null) {
        cuisine = title;
      }
    }

    return Product(
      IsActive: true,
      IsPopular: json['is_popular'],
      Slug: json['slug'],
      Cuisine: cuisine,
      Name: utf8.decode(json['title'].codeUnits),
      Description: utf8.decode(json['description'].codeUnits),
      Composition: utf8.decode(json['composition'].codeUnits),
      Price: json['price'].toDouble(),
      Weight: json['weight'].toDouble(),
      Calories: json['calories'].toDouble(),
      Proteins: json['proteins'].toDouble(),
      Fats: json['fats'].toDouble(),
      Carbohydrates: json['carbohydrates'].toDouble(),
      ImageUrl: json['images'].isNotEmpty
          ? json['images'][0]['image'] ??
              "https://i.ibb.co/Px7bWvM/Image-Not-Loaded.png"
          : "https://i.ibb.co/Px7bWvM/Image-Not-Loaded.png",
      Type: type,
      Category: utf8.decode((json['category']['title']).codeUnits),
      GroupCategory: groupCategories,
      IsAddToCart: false,
    );
  }
}
