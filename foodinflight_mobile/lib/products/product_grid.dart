// ignore_for_file: prefer_const_constructors, sort_child_properties_last

import 'package:flutter/material.dart';
import 'package:mobile/components/colors.dart';
import 'package:mobile/products/categories.dart';
import 'package:mobile/products/product.dart';

class ProductGrid extends StatelessWidget {
  final List<Product> products;

  const ProductGrid({Key? key, required this.products}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        children: [
          GridView.builder(
            gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 2,
              childAspectRatio: 0.6,
            ),
            itemCount: products.length,
            shrinkWrap: true,
            physics: NeverScrollableScrollPhysics(),
            itemBuilder: (context, index) {
              final product = products[index];
              String description;

              switch (product.productCategory) {
                case ProductCategory.DRINK:
                  double liters = product.Weight / 1000;
                  description = liters.toStringAsFixed(
                          liters.truncateToDouble() == liters ? 0 : 1) +
                      'л';
                  break;
                case ProductCategory.FOOD:
                  int grams = product.Weight.toInt();
                  description = grams > 1000
                      ? (grams ~/ 1000).toString() + 'кг'
                      : grams.toString() + 'г';
                  break;
                default:
                  description = 'NaN';
              }
              return Container(
                margin: EdgeInsets.all(5),
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
                child: InkWell(
                  onTap: () {
                    print("hello world");
                  },
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      Expanded(
                        child: ClipRRect(
                          borderRadius: BorderRadius.vertical(
                            top: Radius.circular(20),
                          ),
                          child: Image.network(
                            product.ImageUrl,
                            fit: BoxFit.cover,
                          ),
                        ),
                      ),
                      Container(
                        padding: EdgeInsets.all(1),
                        decoration: BoxDecoration(
                          color: colorBackgroundScreen,
                          borderRadius: BorderRadius.vertical(
                            bottom: Radius.circular(20),
                          ),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                            Text(
                              product.Name,
                              style: TextStyle(
                                fontWeight: FontWeight.bold,
                                fontSize: 16,
                                color: colorNameProduct,
                              ),
                            ),
                            SizedBox(height: 8),
                            Text(
                              '${product.Price}₽',
                              style: TextStyle(
                                fontWeight: FontWeight.bold,
                                color: colorPriceProduct,
                              ),
                            ),
                            SizedBox(height: 6),
                            Text(
                              description,
                              style: TextStyle(
                                color: colorPriceProduct,
                              ),
                            ),
                            SizedBox(height: 6),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                ElevatedButton(
                                  onPressed: () {
                                    print("Clicked \'${product.Name}\'");
                                  },
                                  child: Icon(
                                    Icons.add_shopping_cart,
                                    color: colorIconCart,
                                  ),
                                  style: ElevatedButton.styleFrom(
                                    shape: StadiumBorder(),
                                    padding: EdgeInsets.symmetric(
                                      horizontal: 10,
                                      vertical: 12,
                                    ),
                                    backgroundColor: colorBottomPanelProduct,
                                  ),
                                ),
                              ],
                            ),
                            SizedBox(height: 6),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              );
            },
          ),
        ],
      ),
    );
  }
}
