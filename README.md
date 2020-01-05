# 515Studio网站 App Flutter 和 后台

## 又一个普通的图片浏览站APP 后端+Flutter

## Screenshots

![CSV解析写入MongoDB](https://github.com/gakaki/FlutterPhotoApp/blob/master/images/backend_csv.png?1212)
![Nest.js Rest](https://github.com/gakaki/FlutterPhotoApp/blob/master/images/backend_rest.png?1212)
![Nest.js TypeGraphQL](https://github.com/gakaki/FlutterPhotoApp/blob/master/images/backend_graphql.png)
![Flutter](https://github.com/gakaki/FlutterPhotoApp/blob/master/images/flutter.png)

## 后端： backend/studio515
    
    TypeScript
    Nest.js 
    TypeGraphQL
    typegoose
    MongoDB


## 分析CSV写入MongoDB： backend/csv_parse
    
    TypeScript
    Papa Parse
    cheerio

###  运行方法：
    0 启动 docker-compose 启动 mongodb
        cd csv_parse;
        docker-compose up -d 
        启动的mongodb 是 127.0.0.1:27107/studio
    1 CSV写入数据库mongodb
        cd csv_parse;
        npm install;
        ts-node index.ts;

## 移动端: flutter 继续
    

## 小程序: Taro 未开始