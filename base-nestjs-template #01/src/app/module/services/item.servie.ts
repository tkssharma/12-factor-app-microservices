import { Injectable } from '@nestjs/common';
import { Item } from '../interface/item.interface';

@Injectable()
export default class ItemsService {
  private readonly items: Item[] = [];

  findAll(): Item[] {
    return this.items;
  }

  create(item: Item) {
    this.items.push(item);
  }
}
