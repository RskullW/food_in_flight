import 'package:mobile/products/product.dart';

class Cart {
  static List<Product> _products = [];
  static List<Function> _listeners = [];

  static bool addProduct(Product product) {
    _products.add(product);
    _notifyListeners();
    return true;
  }

  static bool removeProduct(Product product) {
    final index = _products.indexWhere((p) => p.Name == product.Name);
    if (index != -1) {
      _products.removeAt(index);
      _notifyListeners();
    }
    return false;
  }

  static bool toggleProduct(Product product) {
    if (Cart.checkThisProduct(product)) {
      Cart.removeProduct(product);
      return false;
    } else {
      Cart.addProduct(product);
      return true;
    }
  }

  static bool checkThisProduct(Product product) {
    return _products.any((p) => p.Name == product.Name);
  }

  static int get NumProducts => _products.length;

  static void addListener(Function callback) {
    _listeners.add(callback);
  }

  static void removeListener(Function callback) {
    _listeners.remove(callback);
  }

  static void _notifyListeners() {
    for (Function callback in _listeners) {
      callback();
    }
  }
}
