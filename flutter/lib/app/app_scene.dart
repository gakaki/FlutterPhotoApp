import 'package:flutter/material.dart';
import 'package:studio515/public.dart';
import 'package:studio515/app/root_scene.dart';

final RouteObserver<PageRoute> routeObserver = RouteObserver<PageRoute>();

class AppScene extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Studio515',
      navigatorObservers: [routeObserver],
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primaryColor: Colors.white,
        dividerColor: Color(0xffeeeeee),
        scaffoldBackgroundColor: AppColor.paper,
        textTheme: TextTheme(body1: TextStyle(color: AppColor.darkGray)),
      ),
      home: RootScene(),
    );
  }
}
