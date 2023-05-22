import 'package:mobile/products/product.dart';

class ProductInCart {
  late Product product;
  int numbersOfCount = 1;

  ProductInCart({required Product Product, int numbersOfCount = 1}) {
    this.product = Product;
    this.numbersOfCount = numbersOfCount;
  }
}

class Cart {
  static List<ProductInCart> _productsInCart = [];
  static List<Function> _listeners = [];
  static int get NumProducts => _productsInCart.length;

  static double GetPrices() {
    return _productsInCart.fold<double>(
        0.0,
        (total, product) =>
            total + (product.product.Price * product.numbersOfCount));
  }

  static void removeAllProducts() {
    _productsInCart.clear();
    _notifyListeners();
  }

  static bool _addProduct(Product product) {
    _productsInCart.add(ProductInCart(Product: product));
    _notifyListeners();
    return true;
  }

  static bool _removeProduct(Product product) {
    final index =
        _productsInCart.indexWhere((p) => p.product.Name == product.Name);
    if (index != -1) {
      _productsInCart.removeAt(index);
      _notifyListeners();
    }
    return false;
  }

  static bool toggleProduct(Product product) {
    if (Cart.checkThisProduct(product)) {
      Cart._removeProduct(product);
      return false;
    } else {
      Cart._addProduct(product);
      return true;
    }
  }

  static bool checkThisProduct(Product product) {
    return _productsInCart.any((p) => p.product.Name == product.Name);
  }

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

  static void updateCart() {
    _notifyListeners();
  }

  static List<ProductInCart> GetProducts() {
    return _productsInCart;
  }
}
