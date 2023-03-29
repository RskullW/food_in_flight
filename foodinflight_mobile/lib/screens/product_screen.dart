// ignore_for_file: prefer_const_constructors

import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:mobile/components/colors.dart';
import 'package:mobile/products/product.dart';
import 'package:mobile/products/product_categories.dart';
import 'package:mobile/products/product_type.dart';
import '../components/cart.dart';
import '../components/gradient_color.dart';
import 'package:http/http.dart' as http;

import '../products/product_grid.dart';

class ProductScreen extends StatefulWidget {
  Product? product;

  ProductScreen({this.product});
  @override
  _ProductScreenState createState() => _ProductScreenState();
}

class _ProductScreenState extends State<ProductScreen> {
  final Product _templateProduct = Product(
      IsActive: false,
      IsPopular: false,
      Slug: "",
      Type: ProductType.DRINK,
      Cuisine: "",
      Name: "",
      Description: "",
      Composition: "",
      Price: 0,
      Weight: 0,
      Calories: 0,
      Proteins: 0,
      Fats: 0,
      Carbohydrates: 0,
      ImageUrl: "",
      Category: "",
      GroupCategory: [""],
      IsAddToCart: false);
  @override
  Widget build(BuildContext context) {
    return _buildAllBars();
  }

  Widget _buildAllBars() {
    return Container(
      decoration: GetGradientBackgroundScreenOnMenu(),
      child: Scaffold(
        extendBodyBehindAppBar: true,
        body: _buildBody(),
        appBar: _buildAppBar(),
        bottomNavigationBar: _buildBottomAppBar(),
        backgroundColor: Colors.transparent,
      ),
    );
  }

  Widget _buildBottomAppBar() {
    int grams = widget.product?.Weight.toInt() ?? 10;
    String description;
    switch (widget.product!.Type) {
      case ProductType.DRINK:
        double liters = widget.product!.Weight / 1000;
        description =
            '${liters.toStringAsFixed(liters.truncateToDouble() == liters ? 0 : 1)}л';
        break;
      case ProductType.FOOD:
        int grams = widget.product!.Weight.toInt();
        description = grams > 1000
            ? (grams ~/ 1000).toString() + 'кг'
            : grams.toString() + 'г';
        break;
      default:
        description = 'NaN';
    }
    widget.product?.IsAddToCart =
        Cart.checkThisProduct(widget.product ?? _templateProduct);

    return StatefulBuilder(builder: (context, setState) {
      return BottomAppBar(
        color: Colors.transparent,
        elevation: 0,
        child: Row(
          children: [
            Padding(
              padding: EdgeInsets.only(
                  left: MediaQuery.of(context).size.width * 0.05),
              child: Text(
                "${widget.product?.Price.toInt() ?? "15"} ₽",
                textAlign: TextAlign.start,
                style: TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                    fontSize: MediaQuery.of(context).size.width * 0.07),
              ),
            ),
            Padding(
              padding: EdgeInsets.only(
                  left: MediaQuery.of(context).size.width * 0.1),
              child: Text(
                description,
                textAlign: TextAlign.start,
                style: TextStyle(
                    color: Colors.white70,
                    fontWeight: FontWeight.bold,
                    fontSize: MediaQuery.of(context).size.width * 0.035),
              ),
            ),
            SizedBox(
              width: MediaQuery.of(context).size.width * 0.07,
            ),
            GestureDetector(
              onTap: () {
                setState(() {
                  if (widget.product != null) {
                    Cart.toggleProduct(widget.product!);
                    widget.product!.IsAddToCart =
                        Cart.checkThisProduct(widget.product!);
                  }
                });
              },
              child: Padding(
                padding: EdgeInsets.symmetric(
                    vertical: MediaQuery.of(context).size.width * 0.05),
                child: Container(
                  height: 56.0,
                  decoration: GetGradientImageItemForCategories(),
                  child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 16.0),
                    child: Center(
                      child: Text(
                        widget.product!.IsAddToCart
                            ? "Убрать из корзины"
                            : 'Добавить в корзину',
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          fontSize: 16.0,
                          fontWeight: FontWeight.bold,
                          color: Colors.white,
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      );
    });
  }

  PreferredSizeWidget _buildAppBar() {
    return PreferredSize(
      preferredSize: Size.fromHeight(kToolbarHeight),
      child: AppBar(
          backgroundColor: Colors.transparent,
          elevation: 0,
          centerTitle: true,
          leading: GestureDetector(
            child: Icon(
              Icons.arrow_back_ios,
              color: Colors.white,
            ),
            onTap: () =>
                Navigator.pushReplacementNamed(context, '/menu_screen'),
          )),
    );
  }

  Widget _buildBody() {
    return SingleChildScrollView(
      padding: EdgeInsets.only(top: 0),
      child: Column(
        children: [
          _buildImage(),
          SizedBox(
            height: MediaQuery.of(context).size.height * 0.03,
          ),
          _buildNameProduct(context),
          SizedBox(
            height: MediaQuery.of(context).size.height * 0.03,
          ),
          _buildDescription(context),
          SizedBox(
            height: MediaQuery.of(context).size.height * 0.01,
          ),
          _buildComposition(context),
          SizedBox(
            height: MediaQuery.of(context).size.height * 0.02,
          ),
          widget.product?.Type == ProductType.FOOD
              ? _buildNutritionalValue(context)
              : Container(),
        ],
      ),
    );
  }

  Widget _buildImage() {
    return Stack(
      children: [
        Image.network(widget.product?.ImageUrl ?? "Null"),
        Positioned.fill(
          top: 0,
          right: 0,
          left: 0,
          child: Container(
            decoration: GetGradientImageItemForImageOneProduct(),
          ),
        ),
      ],
    );
  }

  Widget _buildNameProduct(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(left: 10, right: 10),
      child: Align(
        alignment: Alignment.topLeft,
        child: Text(
          widget.product?.Name ?? "Продукт",
          textAlign: TextAlign.start,
          style: TextStyle(
              color: Colors.white,
              fontWeight: FontWeight.bold,
              fontSize: MediaQuery.of(context).size.width * 0.05),
          maxLines: 3,
        ),
      ),
    );
  }

  Widget _buildDescription(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(left: 10, right: 10),
      child: Align(
        alignment: Alignment.topLeft,
        child: Text(
          widget.product?.Description ?? "Описание",
          textAlign: TextAlign.left,
          style: TextStyle(
              color: Colors.white,
              fontSize: MediaQuery.of(context).size.width * 0.035),
        ),
      ),
    );
  }

  Widget _buildComposition(BuildContext context) {
    return Column(
      children: [
        Padding(
          padding: EdgeInsets.only(right: 10, left: 10),
          child: Align(
            alignment: Alignment.topLeft,
            child: Text(
              "Состав",
              textAlign: TextAlign.left,
              style: TextStyle(
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                  fontSize: MediaQuery.of(context).size.width * 0.047),
            ),
          ),
        ),
        SizedBox(
          height: MediaQuery.of(context).size.height * 0.02,
        ),
        Padding(
          padding: EdgeInsets.only(right: 10, left: 10),
          child: Align(
            alignment: Alignment.topLeft,
            child: Text(
              widget.product?.Composition ?? "Состав",
              textAlign: TextAlign.left,
              style: TextStyle(
                  color: Colors.white,
                  fontSize: MediaQuery.of(context).size.width * 0.035),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildNutritionalValue(BuildContext context) {
    return Column(
      children: [
        Padding(
          padding: EdgeInsets.only(right: 10, left: 10),
          child: Align(
            alignment: Alignment.topLeft,
            child: Text(
              "Пищевая ценность на 100 г",
              textAlign: TextAlign.left,
              style: TextStyle(
                fontSize: MediaQuery.of(context).size.width * 0.035,
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
            ),
          ),
        ),
        SizedBox(
          height: MediaQuery.of(context).size.height * 0.015,
        ),
        Row(
          children: [
            Padding(
              padding: EdgeInsets.only(left: 10, right: 10),
              child: Align(
                alignment: Alignment.topLeft,
                child: Text(
                  "${widget.product?.Proteins.toInt().toString() ?? "15"} г",
                  textAlign: TextAlign.left,
                  style: TextStyle(
                    fontSize: MediaQuery.of(context).size.width * 0.035,
                    fontWeight: FontWeight.w500,
                    color: Colors.white,
                  ),
                ),
              ),
            ),
            Padding(
              padding: EdgeInsets.only(
                  left: MediaQuery.of(context).size.width * 0.079),
              child: Align(
                alignment: Alignment.topLeft,
                child: Text(
                  "${widget.product?.Carbohydrates ?? "15"} г",
                  textAlign: TextAlign.left,
                  style: TextStyle(
                    fontSize: MediaQuery.of(context).size.width * 0.035,
                    fontWeight: FontWeight.w500,
                    color: Colors.white,
                  ),
                ),
              ),
            ),
            Padding(
              padding: EdgeInsets.only(
                  left: MediaQuery.of(context).size.width * 0.115),
              child: Align(
                alignment: Alignment.topLeft,
                child: Text(
                  "${widget.product?.Fats ?? "15"} г",
                  textAlign: TextAlign.left,
                  style: TextStyle(
                    fontSize: MediaQuery.of(context).size.width * 0.035,
                    fontWeight: FontWeight.w500,
                    color: Colors.white,
                  ),
                ),
              ),
            ),
            Padding(
              padding: EdgeInsets.only(
                  left: MediaQuery.of(context).size.width * 0.055),
              child: Align(
                alignment: Alignment.topLeft,
                child: Text(
                  "${widget.product?.Calories.toInt() ?? "15"} ккал",
                  textAlign: TextAlign.left,
                  style: TextStyle(
                    fontSize: MediaQuery.of(context).size.width * 0.035,
                    fontWeight: FontWeight.w500,
                    color: Colors.white,
                  ),
                ),
              ),
            ),
          ],
        ),
        SizedBox(
          height: MediaQuery.of(context).size.height * 0.005,
        ),
        Row(
          children: [
            Padding(
              padding: EdgeInsets.only(left: 10, right: 10),
              child: Align(
                alignment: Alignment.topLeft,
                child: Text(
                  "Белки",
                  textAlign: TextAlign.left,
                  style: TextStyle(
                    fontSize: MediaQuery.of(context).size.width * 0.035,
                    fontWeight: FontWeight.normal,
                    color: Colors.white,
                  ),
                ),
              ),
            ),
            Padding(
              padding: EdgeInsets.only(left: 10, right: 10),
              child: Align(
                alignment: Alignment.topLeft,
                child: Text(
                  "Углеводы",
                  textAlign: TextAlign.left,
                  style: TextStyle(
                    fontSize: MediaQuery.of(context).size.width * 0.035,
                    fontWeight: FontWeight.normal,
                    color: Colors.white,
                  ),
                ),
              ),
            ),
            Padding(
              padding: EdgeInsets.only(left: 10, right: 10),
              child: Align(
                alignment: Alignment.topLeft,
                child: Text(
                  "Жиры",
                  textAlign: TextAlign.left,
                  style: TextStyle(
                    fontSize: MediaQuery.of(context).size.width * 0.035,
                    fontWeight: FontWeight.normal,
                    color: Colors.white,
                  ),
                ),
              ),
            ),
            Padding(
              padding: EdgeInsets.only(left: 10, right: 10),
              child: Align(
                alignment: Alignment.topLeft,
                child: Text(
                  "Калории",
                  textAlign: TextAlign.left,
                  style: TextStyle(
                    fontSize: MediaQuery.of(context).size.width * 0.035,
                    fontWeight: FontWeight.normal,
                    color: Colors.white,
                  ),
                ),
              ),
            ),
          ],
        ),
      ],
    );
  }
}
