import {Body, Controller, Get, Post} from '@nestjs/common';
import {ProductService} from './product.service';
import {Product} from '../domain/product';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get('listproducts')
    async listProducts(): Promise<Product[] | null> {
        return await this.productService.listProducts();
    }


    @Post('createproduct')
    async createProduct(@Body() product: Product): Promise<Product> {
        return await this.productService.createCustomProduct(product);
    }
}