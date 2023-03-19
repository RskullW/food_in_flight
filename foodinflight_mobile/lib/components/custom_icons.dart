import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

class CustomIcons {
  static final Map<String, String> _icons = {
    'vkontakte': 'assets/images/myIcons/IconVkontakte.svg',
    'instagram': 'assets/images/myIcons/IconInstagram.svg',
  };

  static final vkontakte = SvgPicture.asset(
    _icons['vkontakte']!,
    width: 24,
    height: 24,
  );

  static final instagram = SvgPicture.asset(
    _icons['instagram']!,
    width: 24,
    height: 24,
  );

  static Widget GetIcon(String key, double width, double height,
      {double? opacity, Color? color, String? path}) {
    final iconPath = _icons[key] ?? path;
    if (iconPath == null) {
      return Container();
    }

    _icons[key] = iconPath;
    return Opacity(
      opacity: opacity ?? 1.0,
      child: SvgPicture.asset(
        iconPath,
        width: width,
        height: height,
        color: color,
      ),
    );
  }
}
