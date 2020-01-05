import 'package:flutter/material.dart';
import 'package:studio515/app/album/album_list_view.dart';
import 'package:studio515/public.dart';

// import 'home_list_view.dart';

class AlbumScene extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => AlbumSceneState();
}

class AlbumSceneState extends State<AlbumScene> {
  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 12,
      child: Scaffold(
        appBar: AppBar(
          brightness: Brightness.light,
          title: Container(
            padding: EdgeInsets.symmetric(horizontal: 5),
            child: TabBar(
              labelColor: AppColor.darkGray,
              labelStyle: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
              unselectedLabelColor: AppColor.gray,
              indicatorColor: AppColor.secondary,
              indicatorSize: TabBarIndicatorSize.label,
              indicatorWeight: 3,
              indicatorPadding: EdgeInsets.fromLTRB(8, 0, 8, 5),
              tabs: [
                Tab(text: '潮流运动'),
                Tab(text: '专业运动'),
                Tab(text: '女装'),
                Tab(text: '男装'),
                Tab(text: '童装'),
                Tab(text: '内衣'),
                Tab(text: '休闲装'),
                Tab(text: '少淑'),
                Tab(text: '箱包'),
                Tab(text: '静物'),
                Tab(text: '婚纱礼服'),
                Tab(text: '广告'),
              ],
            ),
          ),
          backgroundColor: AppColor.white,
          elevation: 0,
        ),
        body: TabBarView(children: [
          AlbumListView(AlbumListType.image),
          AlbumListView(AlbumListType.video),
          AlbumListView(AlbumListType.image),
          AlbumListView(AlbumListType.image),
          AlbumListView(AlbumListType.image),
          AlbumListView(AlbumListType.image),
          AlbumListView(AlbumListType.image),
          AlbumListView(AlbumListType.image),
          AlbumListView(AlbumListType.image),
          AlbumListView(AlbumListType.image),
          AlbumListView(AlbumListType.image),
          AlbumListView(AlbumListType.image),
        ]),
      ),
    );
  }
}
