// ignore_for_file: prefer_const_constructors

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:mobile/components/colors.dart';
import 'package:mobile/components/delivery_type.dart';
import 'package:mobile/components/notifications.dart';
import 'package:mobile/components/state_orders.dart';
import 'package:mobile/maps/map_screen.dart';
import 'package:mobile/users/auth_provider.dart';
import 'package:provider/provider.dart';
import '../components/cart.dart';
import '../components/display_message.dart';
import '../components/gradient_color.dart';

class CartScreen extends StatefulWidget {
  @override
  _CartScreenState createState() => _CartScreenState();
}

class _CartScreenState extends State<CartScreen> {
  static String _userName = "";
  static String _phoneNumber = "";
  static String _numberApartment = "";
  static TextEditingController _nameController = TextEditingController();
  static TextEditingController _phoneController = TextEditingController();
  static final ValueNotifier<int> _numberStatusCreationOrder =
      ValueNotifier<int>(1);
  static OrderState _orderState = OrderState();
  List<ProductInCart> _productsInCart = [];

  @override
  void initState() {
    super.initState();
    NotificationHelper.initialize();
  }

  PreferredSizeWidget _buildAppBar() {
    return PreferredSize(
      preferredSize: Size.fromHeight(kToolbarHeight),
      child: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        title: Text(
          "Корзина",
          style: TextStyle(
            color: Colors.white,
            fontWeight: FontWeight.bold,
            fontSize: MediaQuery.of(context).size.width * 0.05,
          ),
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
    List<Widget> secondPage = [
      _buildStatusOrder(),
      _buildAdress(),
      _buildPersonalInformation(),
    ];
    List<Widget> thirdPage = [
      _buildUnderLine(),
    ];

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

  void _buildPaymentSystem() {
    NotificationHelper.showNotification(
        title: "Заказ успешно оплачен!",
        body: "Следите за заказом в Вашей \"Истории\"!");
  }

  Widget _buildText(String message,
      {double fontSize = 0,
      FontWeight fontWeight = FontWeight.bold,
      TextAlign textAling = TextAlign.center}) {
    return Row(
      children: [
        Padding(
          padding: EdgeInsets.symmetric(
              horizontal: MediaQuery.of(context).size.width * 0.04),
          child: Text(
            message,
            textAlign: textAling,
            style: TextStyle(
              fontSize: fontSize,
              color: Colors.white.withAlpha(200),
              fontWeight: fontWeight,
            ),
            maxLines: 3,
          ),
        ),
      ],
    );
  }

  Widget _buildAdress() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisAlignment: MainAxisAlignment.start,
      children: [
        Row(
          children: [
            SizedBox(
              width: MediaQuery.of(context).size.width * 0.05,
            ),
            _getThemeText("Адрес доставки",
                fontSize: MediaQuery.of(context).size.width * 0.05),
          ],
        ),
        SizedBox(
          height: MediaQuery.of(context).size.height * 0.03,
        ),
        Row(
          children: [
            SizedBox(
              width: MediaQuery.of(context).size.height * 0.03,
            ),
            _getWidgetMap(),
          ],
        ),
        SizedBox(
          height: MediaQuery.of(context).size.height * 0.03,
        ),
        Row(children: [
          SizedBox(
            width: MediaQuery.of(context).size.height * 0.03,
          ),
          _getThemeText("Номер квартиры",
              fontSize: MediaQuery.of(context).size.width * 0.035,
              fontWeight: FontWeight.normal),
        ]),
        Row(
          children: [
            SizedBox(
              width: MediaQuery.of(context).size.height * 0.03,
            ),
            Expanded(
              child: TextFormField(
                inputFormatters: [
                  FilteringTextInputFormatter.allow(
                      RegExp(r"^\+?[0123456789]{1,13}$")),
                  LengthLimitingTextInputFormatter(4),
                ],
                style: TextStyle(
                    color: Colors.grey,
                    fontSize: MediaQuery.of(context).size.width * 0.035),
                decoration: InputDecoration(
                  hintMaxLines: 2,
                  hintText:
                      'Если вы проживаете в частном доме, то оставьте поле пустым',
                  hintStyle: TextStyle(
                      color: Colors.grey,
                      fontSize: MediaQuery.of(context).size.width * 0.035),
                  border: InputBorder.none,
                ),
                onChanged: (numberApartment) {
                  setState(() {
                    _numberApartment = numberApartment;
                  });
                },
              ),
            ),
          ],
        ),
        _buildUnderLine(),
        Row(
          children: [
            SizedBox(
              width: MediaQuery.of(context).size.height * 0.03,
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildPersonalInformation() {
    final RegExp nameRegExp = RegExp(r'^[a-zA-ZА-Яа-я ]+$');
    final RegExp phoneNumberRegExp = RegExp(r"^\+?[+0123456789]{1,13}$");

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SizedBox(
          height: MediaQuery.of(context).size.height * 0.015,
        ),
        Row(children: [
          SizedBox(
            width: MediaQuery.of(context).size.height * 0.03,
          ),
          _getThemeText("Контакты",
              fontSize: MediaQuery.of(context).size.width * 0.05),
        ]),
        SizedBox(
          height: MediaQuery.of(context).size.height * 0.01,
        ),
        Row(children: [
          SizedBox(
            width: MediaQuery.of(context).size.height * 0.03,
          ),
          _getThemeText("Получатель",
              fontSize: MediaQuery.of(context).size.width * 0.035,
              fontWeight: FontWeight.normal),
        ]),
        Row(
          children: [
            SizedBox(
              width: MediaQuery.of(context).size.height * 0.03,
            ),
            Expanded(
              child: TextFormField(
                controller: _nameController,
                inputFormatters: [
                  FilteringTextInputFormatter.allow(nameRegExp),
                  LengthLimitingTextInputFormatter(16),
                ],
                style: TextStyle(
                    color: Colors.grey,
                    fontSize: MediaQuery.of(context).size.width * 0.035),
                decoration: InputDecoration(
                  hintText: 'Как вас зовут?',
                  hintStyle: TextStyle(
                      color: Colors.grey,
                      fontSize: MediaQuery.of(context).size.width * 0.035),
                  border: InputBorder.none,
                ),
                onChanged: (userName) {
                  setState(() {
                    if (nameRegExp.hasMatch(userName)) {
                      _userName = userName;
                    }
                  });
                },
              ),
            ),
            _buildUnderLine(),
          ],
        ),
        SizedBox(
          height: MediaQuery.of(context).size.height * 0.015,
        ),
        Row(children: [
          SizedBox(
            width: MediaQuery.of(context).size.height * 0.03,
          ),
          _getThemeText("Телефон",
              fontSize: MediaQuery.of(context).size.width * 0.035,
              fontWeight: FontWeight.normal),
        ]),
        Row(
          children: [
            SizedBox(
              width: MediaQuery.of(context).size.height * 0.03,
            ),
            Expanded(
              child: TextFormField(
                initialValue: "+7",
                inputFormatters: [
                  FilteringTextInputFormatter.allow(phoneNumberRegExp),
                  LengthLimitingTextInputFormatter(12),
                ],
                style: TextStyle(
                  color: Colors.grey,
                  fontSize: MediaQuery.of(context).size.width * 0.035,
                ),
                onChanged: (numberPhone) {
                  setState(() {
                    if (numberPhone == "") {
                      numberPhone = "+7";
                    }
                    _phoneNumber = numberPhone;
                  });
                },
              ),
            ),
          ],
        ),
        _buildUnderLine(),
      ],
    );
  }

  Widget _getThemeText(String message,
      {double fontSize = 0, FontWeight fontWeight = FontWeight.bold}) {
    return Text(
      message,
      style: TextStyle(
          fontWeight: fontWeight,
          color: Colors.white.withAlpha(200),
          fontSize: fontSize),
    );
  }

  Widget _getWidgetMap() {
    return ValueListenableBuilder(
        valueListenable: MapScreen.STREET,
        builder: (BuildContext context, String value, Widget? child) {
          return InkWell(
            borderRadius: BorderRadius.circular(20),
            onTap: () => setState(() {
              Navigator.pushNamed(context, '/map_screen');
            }),
            child: Row(
              children: [
                Container(
                  height: MediaQuery.of(context).size.height * 0.15,
                  width: MediaQuery.of(context).size.width * 0.3,
                  decoration: GetGradientBackgroundItem(),
                  child: Icon(
                    MapScreen.STREET.value.length > 1
                        ? Icons.mode_edit
                        : Icons.add,
                    size: MediaQuery.of(context).size.width * 0.15,
                    color: Colors.white70,
                  ),
                ),
                SizedBox(
                  width: MediaQuery.of(context).size.width * 0.02,
                ),
                Container(
                  height: MediaQuery.of(context).size.height * 0.15,
                  width: MediaQuery.of(context).size.width * 0.6,
                  decoration: GetGradientBackgroundItem(),
                  child: Column(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(
                          MapScreen.STREET.value.length > 1
                              ? MapScreen.STREET.value
                              : "Добавьте адрес",
                          textAlign: TextAlign.center,
                          style: TextStyle(
                            fontSize: MediaQuery.of(context).size.width * 0.035,
                            color: Colors.white70,
                            fontWeight: FontWeight.bold,
                          ),
                          maxLines: 3,
                        ),
                      ]),
                ),
              ],
            ),
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
                  GestureDetector(
                    onTap: () => _numberStatusCreationOrder.value = 1,
                    child: Container(
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
                  ),
                  SizedBox(
                    width: MediaQuery.of(context).size.width * 0.3,
                  ),
                  GestureDetector(
                    onTap: () => _numberStatusCreationOrder.value =
                        _numberStatusCreationOrder.value >= 3
                            ? 2
                            : _numberStatusCreationOrder.value,
                    child: Container(
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
      child: ValueListenableBuilder(
          valueListenable: _numberStatusCreationOrder,
          builder: (BuildContext context, int value, Widget? child) {
            return Row(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                InkWell(
                  onTap: () {
                    if (Cart.NumProducts > 0 || value > 3) {
                      print("$value");

                      if (value >= 2 && value <= 5) {
                        if ((_phoneNumber.length != 12 ||
                                _phoneNumber[0] != '+') ||
                            _userName.length <= 1) {
                          ShowMessage(context,
                              "Некорректный ввод имени или номера телефона");
                        } else if (MapScreen.STREET.value.length <= 1) {
                          ShowMessage(context, "Укажите адрес доставки");
                        } else {
                          if (_numberApartment.isNotEmpty && value == 2) {
                            String street = MapScreen.STREET.value;
                            if (street.length > 1) {
                              List<String> parts = street.split(',');
                              if (parts.length > 1) {
                                String firstPart = parts[0].trim();
                                int firstChar =
                                    int.tryParse(firstPart[0]) ?? -1;
                                if (firstChar != -1 &&
                                    firstChar >= 0 &&
                                    firstChar <= 9) {
                                  parts[0] = firstPart.substring(1);
                                  street = parts.join(',').trim();
                                }
                              }
                            }

                            MapScreen.STREET.value =
                                '$_numberApartment, $street';
                          }

                          switch (value) {
                            case 2:
                              _buildPaymentSystem();

                              String street = MapScreen.STREET.value;
                              if (street.length > 1) {
                                List<String> parts = street.split(',');
                                if (parts.length > 1) {
                                  String secondPart = parts[1].trim();
                                  if (secondPart.length > 1) {
                                    int? firstChar =
                                        int.tryParse(secondPart[0]);
                                    int? secondChar =
                                        int.tryParse(secondPart[1]);
                                    if (firstChar != null &&
                                        firstChar >= 0 &&
                                        firstChar <= 9 &&
                                        secondChar != null &&
                                        secondChar >= 0 &&
                                        secondChar <= 9) {
                                      parts.removeAt(0);
                                      parts[0] = secondPart.substring(1) +
                                          ", " +
                                          parts[0].trim();
                                      street = parts.join(',').trim();
                                    }
                                  }
                                }
                              }

                              MapScreen.STREET.value = street;
                              Provider.of<AuthProvider>(context, listen: false)
                                  .saveStateUser(
                                      street, _phoneNumber, _userName);
                              _orderState.CreateOrder(
                                  context,
                                  _userName,
                                  _phoneNumber,
                                  DeliveryType.PAID,
                                  MapScreen.STREET.value,
                                  Cart.GetProducts());

                              Cart.removeAllProducts();
                              _numberStatusCreationOrder.value = 0;
                              _phoneNumber = "";
                              Navigator.pushNamedAndRemoveUntil(
                                  context, '/home', (route) => false);
                              break;
                            case 3:
                              break;
                            default:
                              break;
                          }

                          _numberStatusCreationOrder.value++;
                        }
                      } else if (value == 1) {
                        value = 2;
                        _numberStatusCreationOrder.value = 2;
                      }
                    } else {
                      ShowMessage(context,
                          "Корзина пуста, необходимо добавить какой-либо товар");
                    }
                  },
                  splashColor: Colors.transparent,
                  highlightColor: Colors.transparent,
                  child: Padding(
                    padding: EdgeInsets.symmetric(
                        horizontal: MediaQuery.of(context).size.width * 0.05,
                        vertical: MediaQuery.of(context).size.height * 0.03),
                    child: Container(
                      height: 56.0,
                      width: MediaQuery.of(context).size.width * 0.7,
                      decoration: GetGradientImageItemForCategories(),
                      alignment: Alignment.center,
                      child: Text(
                        value == 1
                            ? "Далее • ${Cart.GetPrices().toInt()} ₽"
                            : "Оплатить • ${Cart.GetPrices().toInt()} ₽",
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
              ],
            );
          }),
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
                    if (productInCart.numbersOfCount < 99) {
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
