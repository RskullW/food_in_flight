// ignore_for_file: prefer_const_constructors, sort_child_properties_last

import 'package:flutter/material.dart';
import 'package:mobile/components/colors.dart';
import 'package:mobile/products/product_type.dart';
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

              switch (product.Type) {
                case ProductType.DRINK:
                  double liters = product.Weight / 1000;
                  description = liters.toStringAsFixed(
                          liters.truncateToDouble() == liters ? 0 : 1) +
                      'л';
                  break;
                case ProductType.FOOD:
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
                  highlightColor: Colors.transparent,
                  splashColor: Colors.transparent,
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
                            SizedBox(
                              height: 72,
                              child: Text(
                                '\n${product.Name}',
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

class ProductGridWithTitle extends StatelessWidget {
  final List<Product> products;
  final List<String> categories;

  const ProductGridWithTitle({
    Key? key,
    required this.products,
    required this.categories,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: categories
            .map((category) => Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Padding(
                      padding: const EdgeInsets.symmetric(
                          vertical: 16.0, horizontal: 24.0),
                      child: Text(
                        category,
                        style: TextStyle(
                          fontSize: 24.0,
                          fontWeight: FontWeight.bold,
                          color: colorAppBar,
                        ),
                      ),
                    ),
                    ProductGrid(
                      products: products
                          .where((product) => product.Category == category)
                          .toList(),
                    ),
                  ],
                ))
            .toList(),
      ),
    );
  }
}
