// ignore_for_file: prefer_const_constructors, sort_child_properties_last, use_key_in_widget_constructors

import 'dart:convert';
import 'package:mobile/products/categories.dart';

class Product {
  final bool IsActive;
  final bool IsPopular;
  final String Slug;
  final ProductCategory Type;
  final List<String> Cuisine;
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
  });

  factory Product.fromJson(Map<String, dynamic> json) {
    final type =
        json['type'] == 'F' ? ProductCategory.FOOD : ProductCategory.DRINK;

    final groupCategories = <String>[];
    if (json['group_categories'] != null) {
      for (final category in json['group_categories']) {
        final title = category['title'];
        if (title != null) {
          groupCategories.add(utf8.decode(title.codeUnits));
        }
      }
    }

    return Product(
      IsActive: true,
      IsPopular: json['is_popular'],
      Slug: json['slug'],
      Cuisine: [
        'MEM',
      ], //utf8.decode(json['cuisine']['title'].codeUnits) ?? 'TEST',
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
    );
  }
}

class Product_Category {
  final String Url;
  final String Slug;
  final String Title;
  final String Image;
  final String? Icon;

  Product_Category({
    required this.Url,
    required this.Slug,
    required this.Title,
    required this.Image,
    this.Icon,
  });

  factory Product_Category.fromJson(Map<String, dynamic> json) {
    return Product_Category(
      Url: json['url'],
      Slug: json['slug'],
      Title: json['title'],
      Image: json['image'],
      Icon: json['icon'],
    );
  }
}
