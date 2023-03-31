// ignore_for_file: non_constant_identifier_names

import 'dart:async';
import 'package:flutter/material.dart';
import 'package:yandex_geocoder/yandex_geocoder.dart';
import 'package:yandex_mapkit/yandex_mapkit.dart' as YandexMapKit;
import 'dart:convert';
import 'package:http/http.dart' as http;
import '../components/colors.dart';
import '../components/gradient_color.dart';
import 'app_location.dart';

class MapScreen extends StatefulWidget {
  const MapScreen({Key? key}) : super(key: key);
  static AppLatLong Location = AppLatLong();
  static ValueNotifier<String> STREET = ValueNotifier<String>("");
  @override
  State<MapScreen> createState() => _MapScreenState();
}

class _MapScreenState extends State<MapScreen> {
  final mapControllerCompleter = Completer<YandexMapKit.YandexMapController>();
  final _defaultLocation = AppLatLong();
  @override
  void initState() {
    super.initState();
    _initPermission().ignore();
  }

  @override
  Widget build(BuildContext context) {
    var yandexMap = Stack(
      children: [
        YandexMapKit.YandexMap(
          onMapCreated: (controller) {
            mapControllerCompleter.complete(controller);
          },
        ),
        Positioned.fill(
          child: Icon(
            Icons.location_on,
            size: MediaQuery.of(context).size.width * 0.15,
            color: Colors.purple,
          ),
          top: 0,
          bottom: 0,
        ),
        Column(
          children: [
            Spacer(),
            InkWell(
              onTap: () {
                _updateLocation();
                Navigator.pop(context);
              },
              splashColor: Colors.transparent,
              highlightColor: Colors.transparent,
              child: Padding(
                padding: EdgeInsets.symmetric(
                  vertical: MediaQuery.of(context).size.height * 0.03,
                  horizontal: MediaQuery.of(context).size.width * 0.4,
                ),
                child: Container(
                  height: MediaQuery.of(context).size.height * 0.1,
                  width: MediaQuery.of(context).size.width * 0.4,
                  decoration: GetGradientImageItemForCategories(),
                  alignment: Alignment.center,
                  child: Icon(
                    Icons.check_outlined,
                    color: Colors.white,
                    size: MediaQuery.of(context).size.width * 0.15,
                  ),
                ),
              ),
            ),
          ],
        ),
      ],
    );

    return Scaffold(
      appBar: AppBar(
        elevation: 0,
        backgroundColor: colorAppBar,
        title: const Text(
          'Укажите адрес доставки',
          textAlign: TextAlign.center,
        ),
      ),
      body: yandexMap,
    );
  }

  Future<void> _updateLocation() async {
    YandexMapKit.YandexMapController controller =
        await mapControllerCompleter.future;
    var cameraPosition = await controller.getCameraPosition();
    var point = cameraPosition.target;
    MapScreen.Location.lat = point.latitude;
    MapScreen.Location.long = point.longitude;

    await getAddress();
  }

  Future<void> getAddress() async {
    final url =
        'https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${MapScreen.Location.lat}&lon=${MapScreen.Location.long}';

    final response = await http.get(Uri.parse(url));

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      MapScreen.STREET.value = data['display_name'];
    } else {
      throw Exception('Failed to get address');
    }
  }

  Future<void> _initPermission() async {
    if (!await LocationService().checkPermission()) {
      await LocationService().requestPermission();
    }
    await _fetchCurrentLocation();
  }

  Future<void> _fetchCurrentLocation() async {
    AppLatLong defLocation = AppLatLong(lat: 59.916365, long: 30.315760);

    try {
      MapScreen.Location = await LocationService().getCurrentLocation();
    } catch (_) {
      MapScreen.Location = defLocation;
    }

    _moveToCurrentLocation();
  }

  Future<void> _moveToCurrentLocation() async {
    (await mapControllerCompleter.future).moveCamera(
      animation: const YandexMapKit.MapAnimation(
          type: YandexMapKit.MapAnimationType.linear, duration: 1),
      YandexMapKit.CameraUpdate.newCameraPosition(
        YandexMapKit.CameraPosition(
          target: YandexMapKit.Point(
            latitude: MapScreen.Location.lat,
            longitude: MapScreen.Location.long,
          ),
          zoom: 18,
        ),
      ),
    );
  }
}
