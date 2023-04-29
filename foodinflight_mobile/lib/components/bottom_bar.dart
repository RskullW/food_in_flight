import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:mobile/components/colors.dart';
import 'package:mobile/users/auth_provider.dart';
import 'package:provider/provider.dart';

import 'cart.dart';
import 'display_message.dart';

class MyBottomAppBar extends StatefulWidget {
  final String _text;

  MyBottomAppBar(this._text, {Key? key}) : super(key: key);

  @override
  _MyBottomAppBarState createState() => _MyBottomAppBarState(text: _text);
}

class _MyBottomAppBarState extends State<MyBottomAppBar> {
  bool _isSelectHome = false;
  bool _isSelectMore = false;
  bool _isSelectMenu = false;
  bool _isSelectCart = false;
  static Widget iconCart = Positioned(
    top: 0,
    right: 0,
    child: Container(
      padding: EdgeInsets.all(5),
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        color: Colors.transparent,
      ),
      child: Text(
        Cart.NumProducts.toString(),
        style: TextStyle(
          color: Colors.transparent,
          fontWeight: FontWeight.bold,
        ),
      ),
    ),
  );

  _MyBottomAppBarState({String text = 'Home'}) {
    switch (text) {
      case 'More':
        _isSelectMore = true;
        break;
      case 'Menu':
        _isSelectMenu = true;
        break;
      case 'Cart':
        _isSelectCart = true;
        break;
      default:
        _isSelectHome = true;
        break;
    }
  }
  @override
  Widget build(BuildContext context) {
    return _buildBottomAppBar();
  }

  @override
  void initState() {
    super.initState();
    Cart.addListener(_buildCountProductsInCart);
  }

  @override
  void dispose() {
    Cart.removeListener(_buildCountProductsInCart);
    super.dispose();
  }

  void _defaultSelectIcon() {
    _isSelectCart = _isSelectHome = _isSelectMenu = _isSelectMore = false;
  }

  void SetSelectIcon({String text = 'Home'}) {
    _defaultSelectIcon();

    switch (text) {
      case 'More':
        _isSelectMore = true;
        break;
      case 'Menu':
        _isSelectMenu = true;
        break;
      case 'Cart':
        _isSelectCart = true;
        break;
      default:
        _isSelectHome = true;
        break;
    }
  }

  Widget _getIcon(Icon icon, MainAxisSize mainAxisSize, Color color, Text text,
      Function()? onPressed) {
    return Column(
      mainAxisSize: mainAxisSize,
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: <Widget>[
        Transform.translate(
          offset: Offset(0, 6),
          child: IconButton(
            icon: icon,
            splashColor: Colors.transparent,
            highlightColor: color.withOpacity(0.1),
            splashRadius: Material.defaultSplashRadius * 1.3,
            onPressed: onPressed as void Function(),
            color: color,
          ),
        ),
        Text(
          text.data!,
          style: TextStyle(color: color),
        ),
      ],
    );
  }

  Widget _getIconCart() {
    Color color = _isSelectCart ? colorSelectIcon : colorIcon;
    return StatefulBuilder(builder: (context, setState) {
      return Column(
        mainAxisSize: MainAxisSize.min,
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: <Widget>[
          Transform.translate(
            offset: Offset(0, 6),
            child: Stack(
              children: [
                IconButton(
                  icon: Icon(Icons.shopping_cart),
                  splashColor: Colors.transparent,
                  highlightColor: color.withOpacity(0.1),
                  splashRadius: Material.defaultSplashRadius * 1.3,
                  onPressed: () => Navigator.pushNamed(
                      context,
                      Provider.of<AuthProvider>(context, listen: false)
                              .getAuthenticated()
                          ? '/cart_screen'
                          : '/authorization_screen'),
                  color: color,
                ),
                iconCart,
              ],
            ),
          ),
          Text(
            'Корзина',
            style:
                TextStyle(color: _isSelectCart ? colorSelectIcon : colorIcon),
          ),
        ],
      );
    });
  }

  void _buildCountProductsInCart() {
    if (Cart.NumProducts > 0) {
      setState(() {
        iconCart = Positioned(
          top: 0,
          right: 0,
          child: Container(
            padding: EdgeInsets.all(5),
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: Colors.red,
            ),
            child: Text(
              Cart.NumProducts.toString(),
              style: TextStyle(
                color: Colors.white,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        );
      });
    } else {
      setState(() {
        iconCart = Positioned(
          top: 0,
          right: 0,
          child: Container(
            padding: EdgeInsets.all(5),
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: Colors.transparent,
            ),
            child: Text(
              Cart.NumProducts.toString(),
              style: TextStyle(
                color: Colors.transparent,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        );
      });
    }
  }

  Widget _buildBottomAppBar() {
    return BottomAppBar(
      color: Colors.transparent,
      elevation: 0,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Row(
            children: <Widget>[
              Expanded(
                child: _getIcon(
                  Icon(Icons.home),
                  MainAxisSize.min,
                  _isSelectHome ? colorSelectIcon : colorIcon,
                  Text('Главная',
                      style: TextStyle(
                        color: _isSelectHome ? colorSelectIcon : colorIcon,
                      )),
                  _isSelectHome
                      ? () => ShowMessage(context, "(DebugMode): SELECT_HOME")
                      : () {
                          Navigator.pushReplacementNamed(context, '/home');
                        },
                ),
              ),
              Expanded(
                child: _getIcon(
                  Icon(Icons.menu),
                  MainAxisSize.min,
                  _isSelectMenu ? colorSelectIcon : colorIcon,
                  Text('Меню',
                      style: TextStyle(
                          color: _isSelectMenu ? colorSelectIcon : colorIcon)),
                  _isSelectMenu
                      ? () => ShowMessage(context, "(DebugMode): SELECT_MENU")
                      : () {
                          Navigator.pushNamed(context, '/menu_screen');
                        },
                ),
              ),
              Expanded(
                child: _getIconCart(),
              ),
              Expanded(
                child: _getIcon(
                  Icon(Icons.more_horiz),
                  MainAxisSize.min,
                  _isSelectMore ? colorSelectIcon : colorIcon,
                  Text('Еще',
                      style: TextStyle(
                          color: _isSelectMore ? colorSelectIcon : colorIcon)),
                  _isSelectMore
                      ? () => ShowMessage(context, "(DebugMode): SELECT_MORE")
                      : () {
                          Navigator.pushNamed(context, '/more');
                        },
                ),
              ),
            ],
          ),
          SizedBox(height: 10),
        ],
      ),
    );
  }
}
