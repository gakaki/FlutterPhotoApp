import { parse } from 'papaparse';
import { readFileSync } from 'fs';

/*  ES6
    const papa = require('papaparse');
    const fs = require('fs');
    const file = fs.readFileSync('sample.csv', 'utf8');
    papa.parse(file, {
        complete: (result) => console.dir(result.data)
    });
*/

function parseCSV(fileName:string) {
    const file = readFileSync(fileName, 'utf8');
    const results = parse(file, { header: true });
    return results.data
}
let products = parseCSV( 'Product.csv' )

// console.dir(products);
// console.dir(products);

// parse(file, {complete: (result) => console.dir(result.data)});

// Advertising广告	1
// Celebrites 明星	2
// Fashion 时装	3
// // Beauty 妆容	4
// clothes 服装	5
// Portrait 肖像	6

import { prop, arrayProp ,getModelForClass,Ref } from '@typegoose/typegoose';
// import * as mongoose from 'mongoose';
import mongoose = require("mongoose");
import * as cheerio from 'cheerio';
import { NOTIMP } from 'dns';


class Image {
    @prop()
    width?: string;
    @prop()
    height?: string;
    @prop()
    src?: string;
}
class Product {
    @prop()
    id: string;
    @prop()
    name?: string;
    @prop()
    prod_info?: string;
    @arrayProp ({ items: Image })
    images?: Ref<Image>[];
    @prop()
    video?: string;
    @prop()
    video_image?: string;
    @prop()
    about?: string;
    @prop()
    cat1?: number; //一级页面分类
    @prop()
    category_id?: number; //图片分类
    @prop()
    created_at?: Date;
    @prop()
    sort_id?: number;
}

const ModelProduct = getModelForClass(Product);

(async () => {
    await mongoose.connect('mongodb://localhost:27017/', { useNewUrlParser: true, useUnifiedTopology: true, dbName: "studio" });
    await ModelProduct.collection.drop()

    for await  (let p of products) {
        // console.log(p); // 1, "string", false
        let product_info    = p["ProInfo"]
        let np              = new Product();
        np.id               = p["ID"];
        np.name             = p["ProName"];
        np.created_at       = p["AddDate"];
        np.sort_id          = p["orderid"];
        np.about            = p["About"];
        np.cat1             = p["class1"];
        np.category_id      = p["class2"];
        // console.log(product_info)

        if(product_info){
            var re = /mp4/gi; 
           
            if (product_info.search(re) == -1 ) { 
                // console.log("Does not contain Apples" ); 

                const $ = cheerio.load(product_info);
                let images: Image[] = [];
                $('img').each((index: any, element: any) => { 
                    let src = $(element).attr('src')
                    if (src){
                        let width:string = $(element).attr('width')
                        let height:string = $(element).attr('height')
                        // console.log(src,width,height)
                        src = src.replace("/A_UpLoad/","studio515/")
                        src = src.replace("/A_UpLoad//","studio515/")
                        src = src.replace("A_UpLoad","studio515")

                        let img = new Image()
                        img.src = src
                        img.width = width
                        img.height = height
                        images.push(img); 
                    }
                })
                if(images.length > 0){
                    np.images = images
                }
            } else { 
                // console.log(product_info)
                const r_mp4 = new RegExp("http://[^\":<>]*\\.mp4")
                const m_p   = r_mp4.exec(product_info)
         
                if (m_p) {
                    // const groups = m.groups
                    // console.log(m_p[0])
                    const r_jpg = new RegExp("/A_UpLoad/[^\":<>]*\\.(jpg|png|jpeg)")
                    const m_jpg = r_jpg.exec(product_info)
                    if( m_jpg ){
                        np.video        = m_p[0]
                        np.video_image  = m_jpg[0]
                        np.video        = np.video.replace("http://img.studio515.cn/","studio515/")
                        np.video_image  = np.video_image.replace("/A_UpLoad/","studio515/")
                    }
                }
            } 
            if(np.id){
                console.log(np)
                await ModelProduct.create(np)
            }
            // let images: string[] = [];
            // $('img').each((index, element) => { 
            //     // let image_src:string = $(element).attr('src').trim()
            //     // let width:string = $(element).attr('width').trim()
            //     // let height:string = $(element).attr('height').trim()
            //     // // images.push(); 

               
                
            // })
            // console.log(images);
        }


        // const $ = cheerio.load(p["ProInfo"]);
        // $('.img').map( (img: any) => console.log(img) );
        // const { _id: id } = await ModelProduct.create({ 
        //     id:   p["ID"],
        //     name: p["ProName"],
        //     prod_info: p["ProInfo"],
        //     created_at: p["AddDate"],
        //     sort_id: p["orderid"]
        // }); // an "as" assertion, to have types for all properties
    
    }
    

    
    // const user = await ModelProduct.findById(id).exec();
  
    // console.log(user); // prints { _id: 59218f686409d670a97e53e0, name: 'JohnDoe', __v: 0 }
  })();










// const UserModel = getModelForClass(User); // UserModel is a regular Mongoose Model with correct types

// (async () => {
//   await mongoose.connect('mongodb://localhost:27017/', { useNewUrlParser: true, useUnifiedTopology: true, dbName: "test" });

//   const { _id: id } = await UserModel.create({ name: 'JohnDoe' } as User); // an "as" assertion, to have types for all properties
//   const user = await UserModel.findById(id).exec();

//   console.log(user); // prints { _id: 59218f686409d670a97e53e0, name: 'JohnDoe', __v: 0 }
// })();