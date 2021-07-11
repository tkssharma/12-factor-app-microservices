import {
  Get,
  Post,
  Body,
  Controller,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { CreateItemDto } from '../dto/item.dto';
import ItemsService from '../services/item.servie';
import { Item } from '../interface/item.interface';

@Controller('/api/v1/items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) { }

  @Get()
  async findAll(): Promise<Item[]> {
    return this.itemsService.findAll();
  }

  @Post()
  async create(@Body() createItemDto: CreateItemDto) {
    this.itemsService.create(createItemDto);
  }
}
