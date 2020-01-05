import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import {TypegooseModule} from 'nestjs-typegoose';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  // imports: [ProductModule],
  imports: [
    TypegooseModule.forRoot('mongodb://localhost:27017/studio'),
    ProductModule,
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
