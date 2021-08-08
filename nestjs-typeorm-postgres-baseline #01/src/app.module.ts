import { Module, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app/controllers/app.controller';
import { DomainModule } from './app/module/entity.module';
import { ConfigModule } from './config/config.module';
import { DbModule } from './db/db.module';
import { AppLoggerModule } from './logger/logger.module';
@Module({
  imports: [ConfigModule, DomainModule, AppLoggerModule],
  controllers: [AppController],
})
export class AppModule {}
