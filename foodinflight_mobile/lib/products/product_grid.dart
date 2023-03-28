// ignore_for_file: prefer_const_constructors, sort_child_properties_last

import 'package:flutter/material.dart';
import 'package:mobile/components/colors.dart';
import 'package:mobile/products/product_type.dart';
import 'package:mobile/products/product.dart';
import 'package:mobile/screens/product_screen.dart';
import 'package:provider/provider.dart';

import '../components/gradient_color.dart';

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
              childAspectRatio: 0.75,
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
                  description =
                      '${liters.toStringAsFixed(liters.truncateToDouble() == liters ? 0 : 1)}л';
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
                  child: _buildStyleProduct(context, product, description));
            },
          ),
        ],
      ),
    );
  }

  Widget _buildStyleProduct(
      BuildContext context, Product product, String description) {
    return InkWell(
      highlightColor: Colors.transparent,
      splashColor: Colors.transparent,
      onTap: () {
        Navigator.push(
          context,
          PageRouteBuilder(
            pageBuilder: (context, animation, secondaryAnimation) =>
                ProductScreen(product: product),
            transitionDuration: Duration(milliseconds: 150),
            transitionsBuilder:
                (context, animation, secondaryAnimation, child) {
              var begin = 0.0;
              var end = 1.0;
              var tween = Tween(begin: begin, end: end);
              var curvedAnimation =
                  CurvedAnimation(parent: animation, curve: Curves.easeInOut);

              return ScaleTransition(
                scale: tween.animate(curvedAnimation),
                child: child,
              );
            },
          ),
        );
      },
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Expanded(
            child: Stack(
              children: [
                ClipRRect(
                  borderRadius: BorderRadius.vertical(
                    top: Radius.circular(20),
                    bottom: Radius.circular(20),
                  ),
                  child: Image.network(
                    product.ImageUrl,
                    fit: BoxFit.cover,
                    height: double.infinity,
                    width: double.infinity,
                  ),
                ),
                Positioned.fill(
                  bottom: 0,
                  child: Container(
                    decoration: GetGradientImageItemForProducts(),
                  ),
                ),
                Positioned(
                  top: MediaQuery.of(context).size.width * 0.02,
                  left: 0,
                  right: 0,
                  child: Container(
                    padding: EdgeInsets.symmetric(vertical: 8, horizontal: 12),
                    child: Text(
                      '${product.Name}',
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
                ),
                Positioned(
                  bottom: MediaQuery.of(context).size.width * 0.01,
                  left: MediaQuery.of(context).size.width * 0.03,
                  right: MediaQuery.of(context).size.width * 0.02,
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            '${product.Price}₽',
                            style: TextStyle(
                              fontWeight: FontWeight.bold,
                              color: colorNameProduct,
                              fontSize:
                                  MediaQuery.of(context).size.width * 0.05,
                            ),
                          ),
                          SizedBox(height: 6),
                          Text(
                            '${product.Weight} г',
                            style: TextStyle(
                              color: colorNameProduct,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ],
                      ),
                      _buildButtonAddToCart(),
                    ],
                  ),
                )
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildButtonAddToCart() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        ElevatedButton(
          onPressed: () {
            print("Clicked \'Add to cart\'");
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
            backgroundColor: Colors.white.withOpacity(0.05),
            elevation: 0,
          ),
        ),
      ],
    );
  }
}

class ProductGridWithTitle extends StatelessWidget {
  final List<Product> products;
  final List<Product> popularityProducts;
  final List<String> categories;
  final bool isHavePopularProduct;

  const ProductGridWithTitle({
    Key? key,
    required this.products,
    required this.categories,
    required this.popularityProducts,
    required this.isHavePopularProduct,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    List<Widget> productColumns = [];

    if (popularityProducts.isNotEmpty && isHavePopularProduct) {
      productColumns.add(
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Padding(
              padding:
                  const EdgeInsets.symmetric(vertical: 16.0, horizontal: 24.0),
              child: Text(
                'Популярное',
                style: TextStyle(
                  fontSize: 24.0,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                  shadows: [
                    Shadow(
                      offset: Offset(
                        0,
                        0,
                      ),
                      blurRadius: 2.0,
                      color: Colors.black.withOpacity(0.5),
                    ),
                  ],
                ),
              ),
            ),
            ProductGrid(products: popularityProducts),
          ],
        ),
      );
    } else if (!isHavePopularProduct &&
        !popularityProducts.isNotEmpty &&
        productColumns.isEmpty) {
      return Center(
        child: Center(
          child: Text(
            'Товаров в категории "${categories[0]}"\n не найдено!\nЗагляните чуть позже ;-)',
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 18.0,
              fontWeight: FontWeight.bold,
              color: Colors.white,
              shadows: [
                Shadow(
                  offset: Offset(
                    0,
                    0,
                  ),
                  blurRadius: 2.0,
                  color: Colors.black.withOpacity(0.5),
                ),
              ],
            ),
          ),
        ),
      );
    }

    categories.forEach((category) {
      List<Product> categoryProducts =
          products.where((product) => product.Category == category).toList();

      if (categoryProducts.isNotEmpty) {
        productColumns.add(
          Column(
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
                    color: Colors.white,
                    shadows: [
                      Shadow(
                        offset: Offset(
                          0,
                          0,
                        ),
                        blurRadius: 2.0,
                        color: Colors.black.withOpacity(0.5),
                      ),
                    ],
                  ),
                ),
              ),
              ProductGrid(products: categoryProducts),
            ],
          ),
        );
      }
    });
    return SingleChildScrollView(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: productColumns,
      ),
    );
  }
}
