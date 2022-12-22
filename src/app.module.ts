import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { DogsModule } from './dogs/dogs.module';
import { CowsModule } from './cows/cows.module';

@Module({
  imports: [ConfigModule.forRoot(), CatsModule, DogsModule, CowsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
