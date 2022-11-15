import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static'; // <- INSERT LINE
import { join } from 'path'; // <- INSERT LINE
import { environment } from '../environments/environment';
import { AuthModule } from './auth/auth.module';
import { ApiModule } from './api.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    MongooseModule.forRoot(environment.mongodb_uri),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'game-critics'),
      exclude: ['/api*'],
    }),
    AuthModule,
    ApiModule,
    RouterModule.register([
      {
        path: 'auth',
        module: AuthModule
      },
      {
        path: 'api',
        module: ApiModule
      }
    ])
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
