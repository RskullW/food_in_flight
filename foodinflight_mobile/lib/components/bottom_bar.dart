import 'package:flutter/material.dart';
import 'package:mobile/components/colors.dart';

class MyBottomAppBar extends StatefulWidget {
  final String _text;

  MyBottomAppBar(this._text, {Key? key}) : super(key: key);

  @override
  _MyBottomAppBarState createState() => _MyBottomAppBarState(text: _text);
}

class _MyBottomAppBarState extends State<MyBottomAppBar> {
  bool _isSelectHome = false;
  bool _isSelectOffer = false;
  bool _isSelectMore = false;
  bool _isSelectMenu = false;
  bool _isSelectCart = false;

  _MyBottomAppBarState({String text = 'Home'}) {
    _defaultFunction();

    switch (text) {
      case 'Offer':
        _isSelectOffer = true;
        break;
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

  void _defaultSelectIcon() {
    _isSelectCart =
        _isSelectHome = _isSelectMenu = _isSelectMore = _isSelectOffer = false;
  }

  void SetSelectIcon({String text = 'Home'}) {
    _defaultSelectIcon();

    switch (text) {
      case 'Offer':
        _isSelectOffer = true;
        break;
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

  void _defaultFunction([String? text]) {
    final message = text ?? 'Default pressed';
    print('Pressed $message');
  }

  Widget _getIcon(Icon icon, MainAxisSize mainAxisSize, Color color, Text text,
      Function()? onPressed) {
    return Column(
      mainAxisSize: mainAxisSize,
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: <Widget>[
        IconButton(
          icon: icon,
          splashColor: Colors.transparent,
          highlightColor: color.withOpacity(0.1),
          onPressed: onPressed as void Function(),
          color: color,
        ),
        Text(
          text.data!,
          style: TextStyle(color: color),
        ),
      ],
    );
  }

  Widget _buildBottomAppBar() {
    return BottomAppBar(
      color: colorBackgroundScreen,
      child: Row(
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
                  ? () => _defaultFunction('Home')
                  : () {
                      Navigator.pop(context);
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
              () => _defaultFunction('Menu'),
            ),
          ),
          Expanded(
            child: _getIcon(
              Icon(Icons.shopping_cart),
              MainAxisSize.min,
              _isSelectCart ? colorSelectIcon : colorIcon,
              Text('Корзина',
                  style: TextStyle(
                      color: _isSelectCart ? colorSelectIcon : colorIcon)),
              () => _defaultFunction('Cart'),
            ),
          ),
          Expanded(
            child: _getIcon(
              Icon(Icons.local_offer),
              MainAxisSize.min,
              _isSelectOffer ? colorSelectIcon : colorIcon,
              Text('Акции',
                  style: TextStyle(
                      color: _isSelectOffer ? colorSelectIcon : colorIcon)),
              () => _defaultFunction('Offers'),
            ),
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
                  ? () => _defaultFunction()
                  : () {
                      Navigator.pushNamed(context, '/more');
                    },
            ),
          ),
        ],
      ),
    );
  }
}
