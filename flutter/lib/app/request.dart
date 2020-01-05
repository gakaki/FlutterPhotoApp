import 'dart:io';
import 'package:dio/dio.dart';

import 'dart:async';
import 'package:flutter/services.dart' show rootBundle;
import 'dart:convert';

class Request {
  static const String baseUrl = 'http://127.0.0.1:3000';

  static Future<dynamic> get({String action, Map params}) async {
    // return Request.mock(action: action, params: params);
    try {
      var dio       = Request.createDio();
      var response  = await dio.get(action, data: params);
      return response;
    } catch (e) {
      print(e);
    }

  }

  static Future<dynamic> post({String action, Map params}) async {
    return Request.mock(action: action, params: params);

    // var dio = Request.createDio();
    // Response<Map> response = await dio.post(action, data: params);
    // var data = response.data['data'];
    // print(data);

    // return data;
  }

  static Future<dynamic> mock({String action, Map params}) async {
    var responseStr = await rootBundle.loadString('mock/$action.json');
    var responseJson = json.decode(responseStr);
    return responseJson['data'];
  }

  static Dio createDio() {
    var options = Options(
      baseUrl: baseUrl,
      connectTimeout: 5000,
      receiveTimeout: 3000,
      contentType: ContentType.json,
    );
//    options.headers = {
//      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
//      "Accept-Encoding": "gzip, deflate, br",
//      "Accept-Language": "zh-CN,zh;q=0.9",
//      "Cache-Control": "no-cache",
//      "Connection": "keep-alive",
//      "Cookie": "_ga=GA1.1.974985858.1574603783; SL_G_WPT_TO=zh; SL_GWPT_Show_Hide_tmp=1; SL_wptGlobTipTmp=1",
//      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4000.3 Safari/537.36",
//    };
    return Dio(options);
  }
}
