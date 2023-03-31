import UIKit
import Flutter
import YandexMapsMobile

@UIApplicationMain
@objc class AppDelegate: FlutterAppDelegate {
  override func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
  ) -> Bool {
    GeneratedPluginRegistrant.register(with: self)
    YMKMapKit.setApiKey("7fc4b437-0d36-4e45-9925-12e30328ec0c")
    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }
}
