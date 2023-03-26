import 'package:flutter/material.dart';
import 'package:mobile/components/colors.dart';

BoxDecoration GetGradientBackgroundScreen() {
  return BoxDecoration(
    gradient: LinearGradient(
      begin: Alignment.bottomCenter,
      end: Alignment.topLeft,
      colors: [
        colorBottomPanelProduct.withOpacity(0.12),
        colorAppBar.withOpacity(0.7),
      ],
    ),
  );
}

BoxDecoration GetGradientBackgroundScreenOnMenu() {
  return BoxDecoration(
    gradient: LinearGradient(
      begin: Alignment.bottomCenter,
      end: Alignment.topRight,
      colors: [
        colorBottomPanelProduct.withOpacity(0.33),
        colorAppBar.withOpacity(0.7),
      ],
    ),
  );
}

BoxDecoration GetGradientBackgroundItem() {
  return BoxDecoration(
    gradient: LinearGradient(
      begin: Alignment.topCenter,
      end: Alignment.bottomCenter,
      colors: [
        colorAppBar.withOpacity(0.7),
        colorBottomPanelProduct.withOpacity(0.5),
      ],
    ),
    borderRadius: BorderRadius.vertical(
      bottom: Radius.circular(20),
      top: Radius.circular(20),
    ),
  );
}

BoxDecoration GetGradientImageItemForProducts() {
  return BoxDecoration(
    gradient: LinearGradient(
      begin: Alignment.topCenter,
      end: Alignment.bottomCenter,
      colors: [
        colorBottomPanelProduct.withOpacity(0.42),
        Colors.transparent,
        colorBottomPanelProduct.withOpacity(0.42),
      ],
    ),
    borderRadius: BorderRadius.vertical(
      top: Radius.circular(20),
      bottom: Radius.circular(20),
    ),
  );
}

BoxDecoration GetGradientImageItemForCategories() {
  return BoxDecoration(
    gradient: LinearGradient(
      begin: Alignment.topCenter,
      end: Alignment.bottomCenter,
      colors: [
        Colors.transparent,
        colorBottomPanelProduct.withOpacity(0.3),
      ],
    ),
    borderRadius: BorderRadius.vertical(
      top: Radius.circular(20),
      bottom: Radius.circular(20),
    ),
  );
}
