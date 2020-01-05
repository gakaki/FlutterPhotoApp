import 'package:flutter/material.dart';

import 'package:studio515/public.dart';

//import 'home_model.dart';
//import 'home_banner.dart';
//import 'home_menu.dart';
//import 'novel_normal_card.dart';
//import 'novel_four_grid_view.dart';
//import 'novel_first_hybird_card.dart';
//import 'novel_second_hybird_card.dart';

enum AlbumListType {
  image, //图片列表
  video  //视频列表
}

class AlbumListView extends StatefulWidget {
  final AlbumListType type;

  AlbumListView(this.type);

  @override
  State<StatefulWidget> createState() {
    return AlbumListViewState();
  }
}

class AlbumListViewState extends State<AlbumListView> with AutomaticKeepAliveClientMixin {
//  List<CarouselInfo> carouselInfos = [];
  int pageIndex = 1;
  List<Product> data_products = [];

  @override
  void initState() {
    super.initState();
    fetchData();
  }

  @override
  bool get wantKeepAlive => true;

  Future<void> fetchData() async {
    try {
      var resp        = await Request.get(action: '/product/listproducts');
      var moduleData  = resp.data;
      List<Product> products = [];
      moduleData.forEach((data) {
        products.add(Product.fromJson(data));
      });
      setState(() {
        this.data_products = products;
      });
//      print(products);
      return  products;
    } catch (e) {
      print(e.toString());
      Toast.show(e.toString());
    }
  }

//  Future<void> fetchData() async {
//    try {
//      var product_type = "image";
//      switch (this.widget.type) {
//        case AlbumListType.image:
//          product_type = 'image';
//          break;
//        case AlbumListType.video:
//          product_type = 'album_video';
//          break;
//        default:
//          break;
//      }
//
//
//      var responseJson = await Request.get(action: action);
//      List moduleData = responseJson['module'];
//      List<HomeModule> modules = [];
//      moduleData.forEach((data) {
//        modules.add(HomeModule.fromJson(data));
//      });
//
//      setState(() {
//        this.modules = modules;
//        this.carouselInfos = carouselInfos;
//      });
//    } catch (e) {
//      Toast.show(e.toString());
//    }
//  }

//  Widget bookCardWithInfo(HomeModule module) {
//    Widget card;
//    switch (module.style) {
//      case 1:
//        card = NovelFourGridView(module);
//        break;
//      case 2:
//        card = NovelSecondHybirdCard(module);
//        break;
//      case 3:
//        card = NovelFirstHybirdCard(module);
//        break;
//      case 4:
//        card = NovelNormalCard(module);
//        break;
//    }
//    return card;
//  }

//  Widget buildModule(BuildContext context, Product product) {
//    if (module.carousels != null) {
//      return HomeBanner(module.carousels);
//    } else if (module.menus != null) {
//      return HomeMenu(module.menus);
//    } else if (module.books != null) {
//      return bookCardWithInfo(module);
//    }
//
//    return Container();
//  }

  Widget buildModule(BuildContext context, Product product) {
    return Center(
      child: AlbumCard(product: product),
    );
  }
  
  @override
  Widget build(BuildContext context) {
    return Container(
      child: RefreshIndicator(
        onRefresh: fetchData,
        child: ListView.builder(
          itemCount: this.data_products.length,
          itemBuilder: (BuildContext context, int index) {
            return buildModule(context, this.data_products[index]);
          },
        ),
      ),
    );
  }
}


class AlbumCard extends StatelessWidget {
  final selected;
  final Product product ;
  final onTap;

  AlbumCard(
      {Key key, this.product , this.onTap, this.selected: false}
    ) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    TextStyle textStyle = Theme.of(context).textTheme.display1;
    if (selected)
      textStyle = textStyle.copyWith(color: Colors.lightGreenAccent[400]);
        return Card(
          color: Colors.white,
          child: Column(
              children: <Widget>[
                new Container( 
                  padding: const EdgeInsets.all(0.0),
                  child: 
                  Image.network(
                      product.images[0].src
                  )),
                  new Container( 
                  padding: const EdgeInsets.all(10.0),
                  child:                    
                    Column(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: <Widget>[
                        Text(product.name, style: Theme.of(context).textTheme.title),
                        Text(product.about, style: TextStyle(color: Colors.black.withOpacity(0.5))),
                        Text(product.created_at),
                      ],
                    ),
                    
                  )
            ],
           crossAxisAlignment: CrossAxisAlignment.start,
          )
    );
  }
}