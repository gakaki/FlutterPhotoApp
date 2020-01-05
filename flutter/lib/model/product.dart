import 'package:flutter/material.dart';
import 'package:studio515/model/product_image.dart';

class Product {
//  String _id;
  int    id;
  String name;
  String created_at;
  int sort_id;
  String about;
  int cat1;
  int category_id;

  List<ProductImage> images;
  
  Product.fromJson(Map data) {
//    _id            = data['_id'];
    id             = data['id'];
    name           = data['name'];
    created_at     = data['created_at'];
    sort_id        = data['sort_id'];
    about          = data['about'];
    cat1           = data['cat1'];
    category_id    = data['category_id'];
    images         = new List<ProductImage>();
    if (data['images'] != null) {
      data['images'].forEach((data) {
        var im = ProductImage.fromJson(data);
        if(im != null){
          images.add(im);
        }
      });
    }
  }
}
