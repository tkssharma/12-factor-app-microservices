import { Module, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app/controllers/app.controller';
import { DomainModule } from './app/module/entity.module';
import { ConfigModule } from './config/config.module';
@Module({
  imports: [ConfigModule, DomainModule],
  controllers: [AppController],
})
export class AppModule { }
