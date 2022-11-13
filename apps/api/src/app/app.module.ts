import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static'; // <- INSERT LINE
import { join } from 'path'; // <- INSERT LINE

@Module({
  imports: [
     // BEGIN INSERT
     ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'game-critics'),
      exclude: ['/api*']
    })
    // END INSERT
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
