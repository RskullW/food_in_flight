// ignore_for_file: prefer_const_constructors

import 'package:flutter/material.dart';
import 'package:mobile/components/colors.dart';
import '../components/cart.dart';
import '../components/gradient_color.dart';
import '../products/product.dart';

// return StatefulBuilder(builder: (context, setState) { });

class CartScreen extends StatefulWidget {
  @override
  _CartScreenState createState() => _CartScreenState();
}

class _CartScreenState extends State<CartScreen> {
  ValueNotifier<int> _numberStatusCreationOrder = ValueNotifier<int>(1);
  List<ProductInCart> _productsInCart = [];

  PreferredSizeWidget _buildAppBar() {
    return PreferredSize(
      preferredSize: Size.fromHeight(kToolbarHeight),
      child: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        title: Text(
          "Корзина",
          style: TextStyle(
              color: colorNameApp,
              fontWeight: FontWeight.bold,
              fontFamily: 'Roboto-Black'),
        ),
        centerTitle: true,
        automaticallyImplyLeading: false,
        leading: GestureDetector(
          child: Icon(Icons.arrow_back_ios),
          onTap: () => Navigator.pushReplacementNamed(context, '/menu_screen'),
        ),
      ),
    );
  }

  Widget _buildBody() {
    List<Widget> firstPage = [
      _buildStatusOrder(),
      _buildTitleOrders(),
      _buildOrders()
    ];
    List<Widget> secondPage = [_buildStatusOrder(), _buildOrders()];
    List<Widget> thirdPage = [_buildStatusOrder(), _buildTitleOrders()];

    return ValueListenableBuilder(
        valueListenable: _numberStatusCreationOrder,
        builder: (BuildContext context, int value, Widget? child) {
          return SingleChildScrollView(
            child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: value == 1
                    ? firstPage
                    : value == 2
                        ? secondPage
                        : thirdPage),
          );
        });
  }

  Widget _buildStatusOrder() {
    return ValueListenableBuilder(
        valueListenable: _numberStatusCreationOrder,
        builder: (BuildContext context, int value, Widget? child) {
          return Stack(
            children: [
              Positioned(
                  top: MediaQuery.of(context).size.height * 0.073,
                  bottom: MediaQuery.of(context).size.height * 0.073,
                  left: MediaQuery.of(context).size.width * 0.17,
                  right: MediaQuery.of(context).size.width * 0.17,
                  child: Container(
                    decoration: BoxDecoration(
                        shape: BoxShape.rectangle,
                        color: colorMoreScreenAppBar.withOpacity(0.3)),
                  )),
              Row(
                crossAxisAlignment: CrossAxisAlignment.center,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  SizedBox(
                    height: MediaQuery.of(context).size.height * 0.08,
                    width: MediaQuery.of(context).size.width * 0.052,
                  ),
                  Text(
                    "Мой заказ",
                    style: TextStyle(
                      color: value >= 1
                          ? colorSelectItemInCart
                          : colorSelectItemInCart,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  SizedBox(
                    width: MediaQuery.of(context).size.width * 0.215,
                  ),
                  Text(
                    "Детали",
                    style: TextStyle(
                      color: value >= 2
                          ? colorSelectItemInCart
                          : colorNotSelectItemInCart,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  SizedBox(
                    width: MediaQuery.of(context).size.width * 0.24,
                  ),
                  Text(
                    "Оплата",
                    style: TextStyle(
                      color: value >= 3
                          ? colorSelectItemInCart
                          : colorNotSelectItemInCart,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  Spacer(),
                ],
              ),
              Row(
                crossAxisAlignment: CrossAxisAlignment.center,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  SizedBox(
                    height: MediaQuery.of(context).size.height * 0.15,
                  ),
                  Container(
                    padding: EdgeInsets.all(7),
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: value >= 1
                          ? colorSelectItemInCart
                          : colorNotSelectItemInCart,
                    ),
                    child: Text(
                      "1",
                      style: TextStyle(
                        color: colorMoreScreenAppBar,
                        fontSize: MediaQuery.of(context).size.width * 0.035,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                  SizedBox(
                    width: MediaQuery.of(context).size.width * 0.3,
                  ),
                  Container(
                    padding: EdgeInsets.all(7),
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: value >= 2
                          ? colorSelectItemInCart
                          : colorNotSelectItemInCart,
                    ),
                    child: Text(
                      "2",
                      style: TextStyle(
                        color: colorMoreScreenAppBar,
                        fontSize: MediaQuery.of(context).size.width * 0.035,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                  SizedBox(
                    width: MediaQuery.of(context).size.width * 0.3,
                  ),
                  Container(
                    padding: EdgeInsets.all(7),
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: value >= 3
                          ? colorSelectItemInCart
                          : colorNotSelectItemInCart,
                    ),
                    child: Text(
                      "3",
                      style: TextStyle(
                        color: colorMoreScreenAppBar,
                        fontSize: MediaQuery.of(context).size.width * 0.035,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                ],
              ),
            ],
          );
        });
  }

  Widget _buildBottomAppBar() {
    return BottomAppBar(
      color: Colors.transparent,
      elevation: 0,
      child: InkWell(
        onTap: () {
          _numberStatusCreationOrder.value++;
        },
        splashColor: Colors.transparent,
        highlightColor: Colors.transparent,
        child: Padding(
          padding: EdgeInsets.symmetric(
              horizontal: MediaQuery.of(context).size.width * 0.05,
              vertical: MediaQuery.of(context).size.height * 0.03),
          child: Container(
            height: 56.0,
            decoration: GetGradientImageItemForCategories(),
            alignment: Alignment.center,
            child: ValueListenableBuilder(
              valueListenable: _numberStatusCreationOrder,
              builder: (BuildContext context, int value, Widget? child) {
                return Text(
                  "${value == 1 ? "Далее" : value == 2 ? "Перейти к оплате" : "Оплатить"}",
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    fontSize: 16.0,
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                  ),
                );
              },
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildTitleOrders() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.start,
      children: [
        SizedBox(
          width: MediaQuery.of(context).size.width * 0.05,
        ),
        Text(
          "Заказ",
          style: TextStyle(
              fontWeight: FontWeight.bold,
              color: Colors.white.withAlpha(200),
              fontSize: MediaQuery.of(context).size.width * 0.05),
        ),
        Spacer(),
        GestureDetector(
          onTap: () => {
            setState(() {
              Cart.removeAllProducts();
            }),
          },
          child: Icon(
            Icons.delete,
            size: MediaQuery.of(context).size.height * 0.045,
            color: colorSelectIcon,
          ),
        ),
        SizedBox(
          width: MediaQuery.of(context).size.width * 0.048,
        ),
      ],
    );
  }

  Widget _buildUnderLine() {
    return Container(
      decoration: BoxDecoration(
        border: Border(
          bottom: BorderSide(
            color: colorSelectItemInCart.withOpacity(0.2),
            width: MediaQuery.of(context).size.width * 0.005,
          ),
        ),
      ),
    );
  }

  Widget _buildImage(ProductInCart productInCart) {
    return Stack(
      children: [
        ClipRRect(
          borderRadius: BorderRadius.vertical(
            top: Radius.circular(20),
            bottom: Radius.circular(20),
          ),
          child: Image.network(
            productInCart.product.ImageUrl,
            width: MediaQuery.of(context).size.width * 0.37,
            fit: BoxFit.cover,
          ),
        ),
        Positioned.fill(
          top: 0,
          right: 0,
          left: 0,
          child: Container(
            decoration: GetGradientImageItemForProducts(),
          ),
        ),
      ],
    );
  }

  Widget _buildDescription(ProductInCart productInCart) {
    return SizedBox(
      height: MediaQuery.of(context).size.height * 0.1,
      width: MediaQuery.of(context).size.width * 0.4,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            child: Text(
              productInCart.product.Name,
              style: TextStyle(
                  color: colorNameProduct,
                  fontSize: MediaQuery.of(context).size.width * 0.035,
                  fontWeight: FontWeight.bold),
              maxLines: 3,
            ),
          ),
          Spacer(),
          Container(
            child: Text(
              "${productInCart.product.Price.toString()}₽",
              style: TextStyle(
                color: colorPriceProduct,
                fontSize: MediaQuery.of(context).size.width * 0.035,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildAddOrRemoveProduct(ProductInCart productInCart) {
    return Container(
      decoration: GetGradientInCartPlusItem(),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          SizedBox(
            height: MediaQuery.of(context).size.height * 0.01,
          ),
          Container(
            height: MediaQuery.of(context).size.height * 0.05,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              border: Border.all(
                color: Colors.grey,
                width: 2,
              ),
            ),
            child: Center(
              child: IconButton(
                icon: Icon(
                  Icons.add,
                  color: Colors.white70,
                  size: MediaQuery.of(context).size.width * 0.04,
                ),
                splashColor: colorBlack.withOpacity(0.1),
                highlightColor: colorBlack.withOpacity(0.1),
                splashRadius: MediaQuery.of(context).size.width * 0.07,
                onPressed: () {
                  setState(() {
                    if (productInCart.numbersOfCount < 9) {
                      productInCart.numbersOfCount++;
                    }
                  });
                },
              ),
            ),
          ),
          SizedBox(
            height: MediaQuery.of(context).size.height * 0.01,
          ),
          Text(
            productInCart.numbersOfCount.toString(),
            style: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
              color: Colors.white70,
            ),
          ),
          SizedBox(
            height: MediaQuery.of(context).size.height * 0.01,
          ),
          Stack(
            children: [
              Container(
                height: MediaQuery.of(context).size.height * 0.05,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  border: Border.all(
                    color: Colors.grey,
                    width: 2,
                  ),
                ),
                child: Center(
                  child: IconButton(
                    icon: Icon(
                      Icons.remove,
                      color: Colors.white70,
                      size: MediaQuery.of(context).size.width * 0.04,
                    ),
                    splashColor: colorBlack.withOpacity(0.1),
                    highlightColor: colorBlack.withOpacity(0.1),
                    splashRadius: MediaQuery.of(context).size.width * 0.07,
                    onPressed: () {
                      setState(() {
                        if (productInCart.numbersOfCount > 0) {
                          productInCart.numbersOfCount--;
                          if (productInCart.numbersOfCount == 0) {
                            Cart.toggleProduct(productInCart.product);
                          }
                        }
                      });
                    },
                  ),
                ),
              ),
            ],
          ),
          SizedBox(
            height: MediaQuery.of(context).size.height * 0.01,
          ),
        ],
      ),
    );
  }

  Widget _buildOrders() {
    Widget ordersContainer = Container();
    List<Widget> productsColumn = [];
    _productsInCart = Cart.GetProducts();

    if (_productsInCart.isEmpty) {
      ordersContainer = Column(
        children: [
          SizedBox(
            height: MediaQuery.of(context).size.height * 0.2,
          ),
          Text(
            "Нет товаров в корзине",
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: MediaQuery.of(context).size.height * 0.05,
              color: Colors.white.withAlpha(200),
              fontWeight: FontWeight.bold,
            ),
            maxLines: 3,
          ),
        ],
      );
    } else {
      productsColumn.addAll(_productsInCart.map((productInCart) => Column(
            children: [
              SizedBox(
                height: MediaQuery.of(context).size.height * 0.01,
              ),
              Row(
                children: [
                  SizedBox(
                    width: MediaQuery.of(context).size.width * 0.05,
                  ),
                  _buildImage(productInCart),
                  SizedBox(
                    width: MediaQuery.of(context).size.width * 0.03,
                  ),
                  _buildDescription(productInCart),
                  _buildAddOrRemoveProduct(productInCart),
                ],
              ),
              SizedBox(
                height: MediaQuery.of(context).size.height * 0.02,
              ),
              _buildUnderLine(),
            ],
          )));

      ordersContainer = Column(
        children: [
          SizedBox(
            height: MediaQuery.of(context).size.height * 0.07,
          ),
          Column(
            children: productsColumn,
          ),
        ],
      );
    }

    return ordersContainer;
  }

  Widget _buildAllBars() {
    return Container(
      decoration: GetGradientBackgroundScreen(),
      child: Scaffold(
        bottomNavigationBar: _buildBottomAppBar(),
        body: _buildBody(),
        appBar: _buildAppBar(),
        backgroundColor: Colors.transparent,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return _buildAllBars();
  }
}
