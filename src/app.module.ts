import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { DogsModule } from './dogs/dogs.module';

@Module({
  imports: [ConfigModule.forRoot(), CatsModule, DogsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
