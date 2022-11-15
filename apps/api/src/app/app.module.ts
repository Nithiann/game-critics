import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static'; // <- INSERT LINE
import { join } from 'path'; // <- INSERT LINE
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { environment } from '../environments/environment';

//`mongodb+srv://${process.env.MONGO_USR}:${process.env.MONGO_PWD}@${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`

@Module({
  imports: [
    MongooseModule.forRoot(
      environment.mongodb_uri
    ),
    // BEGIN INSERT
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'game-critics'),
      exclude: ['/api*'],
    }),
    // END INSERT
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
