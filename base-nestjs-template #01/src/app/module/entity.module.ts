import { Module, Type } from '@nestjs/common';
import ItemsService from './services/item.servie';
import { TypeOrmModule } from '@nestjs/typeorm';
import ContactEntity from './entity/contact.entity';
import { DbModule } from '../../db/db.module';
import * as fs from 'fs';
import * as path from 'path';
import { ItemsController } from './controllers/contact.controller';
import Note from './entity/note.entity';

export const ALL_ENTITIES = fs.readdirSync(path.join(path.dirname(__filename), 'entity'))
  .map((file) => require(`./entity/${file}`).default as Type<any>);

export const ALL_SERVICES = fs.readdirSync(path.join(path.dirname(__filename), 'services'))
  .filter((file) => (path.extname(file) === '.js' || path.extname(file) === '.ts') && !file.endsWith('.d.ts'))
  .filter((file) => file.indexOf('.spec') === -1)
  .map((file) => require(`./services/${file}`).default as Type<any>);


@Module({
  imports: [
    DbModule.forRoot({ entities: ALL_ENTITIES }),
    TypeOrmModule.forFeature([ContactEntity]),
    TypeOrmModule.forFeature([Note]),
  ],
  providers: [...ALL_SERVICES],
  exports: [...ALL_SERVICES],
  controllers: [ItemsController]
})
export class DomainModule { }
