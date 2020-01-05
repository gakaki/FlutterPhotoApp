
import { prop, arrayProp , Ref, Typegoose } from '@typegoose/typegoose';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class ProductImage extends Typegoose {

    @Field({ nullable: true })
    @prop()
    width?: number;

    @Field({ nullable: true })
    @prop()
    height?: number;

    @Field({ nullable: true })
    @prop()
    src?: string;
}
