import 'package:flutter/material.dart';

class ProductImage {
  String _id;
  String src;
  int width;
  int height;

  ProductImage.fromJson(Map data) {
    _id     = data['_id'];
    src     = "https://midu.studio515.cn/" + data['src'];
    width   = data['width'];
    height  = data['height'];
  }
}
