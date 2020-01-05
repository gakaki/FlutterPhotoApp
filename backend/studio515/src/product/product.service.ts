import { Injectable } from '@nestjs/common';
import {Product} from '../domain/product';
import {InjectModel} from 'nestjs-typegoose';
import {ReturnModelType} from '@typegoose/typegoose';
import {NewProductInput} from './dto/new-product.input';
import {ProductsArgs} from './dto/products.args';

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product) private readonly productModel: ReturnModelType<typeof Product>) {
    }

    async createCustomProduct(product: Product) {
        const createdProduct = new this.productModel(product);
        return await createdProduct.save();
    }

    async listProducts(): Promise<Product[] | null> {
        return await this.productModel.find().exec();
    }

    async create(data: NewProductInput): Promise<Product> {
        return {} as any;
    }

    async findOneById(id: string): Promise<Product> {
        return {} as any;
    }

    async findAll(productsArgs: ProductsArgs): Promise<Product[]> {
        // return [] as Product[];
        // console.log(productsArgs.take,productsArgs.skip)
        let page_size = productsArgs.take
        let page_skip = productsArgs.skip
        return await this.productModel.find()
        .skip(page_size).limit(page_size)
        .exec();

        return await this.productModel.find().exec();
    }

    async remove(id: string): Promise<boolean> {
        return true;
    }
}