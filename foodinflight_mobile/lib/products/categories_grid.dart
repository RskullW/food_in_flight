// ignore_for_file: prefer_const_constructors, sort_child_properties_last

import 'package:flutter/material.dart';
import 'package:mobile/components/colors.dart';
import 'package:mobile/products/product_categories.dart';

import '../components/gradient_color.dart';

class CategoriesGrid extends StatelessWidget {
  final List<ProductCategory> categories;

  const CategoriesGrid({Key? key, required this.categories}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        children: [
          GridView.builder(
            gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 2,
              childAspectRatio: 0.8,
            ),
            itemCount: categories.length,
            shrinkWrap: true,
            physics: NeverScrollableScrollPhysics(),
            itemBuilder: (context, index) {
              final category = categories[index];

              return Container(
                margin: EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: colorBlack,
                  borderRadius: BorderRadius.circular(20),
                  boxShadow: [
                    BoxShadow(
                      color: colorBlack.withOpacity(0.12),
                      spreadRadius: 1,
                      blurRadius: 5,
                      offset: Offset(0, 3),
                    ),
                  ],
                ),
                child: _buildStyleProduct(context, category),
              );
            },
          ),
        ],
      ),
    );
  }

  Widget _buildStyleProduct(BuildContext context, ProductCategory category) {
    return InkWell(
      highlightColor: Colors.transparent,
      splashColor: Colors.transparent,
      onTap: () {
        Navigator.pushNamed(
          context,
          '/product_categories_screen',
          arguments: {'categoryTitle': category.Title},
        );
      },
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Expanded(
            child: Stack(
              children: [
                ClipRRect(
                  borderRadius: BorderRadius.circular(20),
                  child: Image.network(
                    category.ImageUrl,
                    fit: BoxFit.cover,
                    height: double.infinity,
                    width: double.infinity,
                  ),
                ),
                Positioned.fill(
                  bottom: 0,
                  child: Container(
                    decoration: GetGradientImageItemForCategories(),
                  ),
                ),
                Positioned(
                  bottom: MediaQuery.of(context).size.width * 0.02,
                  left: 0,
                  right: 0,
                  child: Text(
                    '\n${category.Title}',
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 16,
                      color: colorNameProduct,
                    ),
                    textAlign: TextAlign.center,
                    maxLines: 3,
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
