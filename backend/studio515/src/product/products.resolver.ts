import { Product } from './../domain/product';
import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { NewProductInput } from './dto/new-product.input';
import { ProductsArgs } from './dto/products.args';
import { ProductService } from './product.service';

const pubSub = new PubSub();

@Resolver(of => Product)
export class ProductsResolver {
  constructor(private readonly ProductsService: ProductService) {}

  @Query(returns => Product)
  async Product(@Args('id') id: string): Promise<Product> {
    const Product = await this.ProductsService.findOneById(id);
    if (!Product) {
      throw new NotFoundException(id);
    }
    return Product;
  }

  @Query(returns => [Product])
  Products(@Args() ProductsArgs: ProductsArgs): Promise<Product[]> {
    // return this.ProductsService.findAll(ProductsArgs);
    return this.ProductsService.findAll(ProductsArgs);
  }

  @Mutation(returns => Product)
  async addProduct(
    @Args('newProductData') newProductData: NewProductInput,
  ): Promise<Product> {
    const Product = await this.ProductsService.create(newProductData);
    pubSub.publish('ProductAdded', { ProductAdded: Product });
    return Product;
  }

  @Mutation(returns => Boolean)
  async removeProduct(@Args('id') id: string) {
    return this.ProductsService.remove(id);
  }

  @Subscription(returns => Product)
  ProductAdded() {
    return pubSub.asyncIterator('ProductAdded');
  }
}
