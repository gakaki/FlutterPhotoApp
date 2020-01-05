import { prop, arrayProp , Ref, Typegoose } from '@typegoose/typegoose';
import { ProductImage } from './product_image';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Product extends Typegoose {
    @Field(type => ID)
    @prop()
    id: number;

    @Field({ nullable: true })
    @prop()
    name?: string;

    @Field({ nullable: true })
    @prop()
    prod_info?: string;

    @Field(type => [ProductImage])
    @arrayProp ({ items: ProductImage })
    images?: Ref<ProductImage>[];


    @Field({ nullable: true })
    @prop()
    video?: string;

    @Field({ nullable: true })
    @prop()
    video_image?: string;


    @Field({ nullable: true })
    @prop()
    about?: string;

    @Field({ nullable: true })
    @prop()
    cat1?: number; //一级页面分类

    @Field({ nullable: true })
    @prop()
    category_id?: number; //图片分类

    @Field({ nullable: true })
    @prop()
    created_at?: Date;

    @Field({ nullable: true })
    @prop()
    sort_id?: number;
}