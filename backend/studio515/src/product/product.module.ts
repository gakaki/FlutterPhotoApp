import { Product } from './../domain/product';
import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { DateScalar } from '../common/scalars/date.scalar';
import { ProductsResolver } from './products.resolver';

@Module({
  imports: [TypegooseModule.forFeature([Product])],
  providers: [
    ProductService,
    ProductsResolver, DateScalar,
  ],
  controllers: [ProductController],
})
export class ProductModule {}
