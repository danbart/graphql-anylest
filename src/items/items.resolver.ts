import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateItemInput, UpdateItemInput } from './dto/input';
import { Item } from './entities/item.entity';
import { ItemsService } from './items.service';

@Resolver(() => Item)
export class ItemsResolver {
  constructor(private readonly itemsService: ItemsService) { }

  @Mutation(() => Item)
  createItem(@Args('createItemInput') createItemInput: CreateItemInput): Promise<Item> {
    return this.itemsService.create(createItemInput);
  }

  @Query(() => [Item], { name: 'items' })
  async findAll(): Promise<Item[]> {
    return await this.itemsService.findAll();
  }

  @Query(() => Item, { name: 'item' })
  async findOne(@Args('id', { type: () => ID }) id: string): Promise<Item> {
    return await this.itemsService.findOne(id);
  }

  @Mutation(() => Item)
  updateItem(@Args('updateItemInput') updateItemInput: UpdateItemInput): Promise<Item> {
    return this.itemsService.update(updateItemInput.id, updateItemInput);
  }

  @Mutation(() => Item)
  removeItem(@Args('id', { type: () => ID }) id: string): Promise<Item> {
    return this.itemsService.remove(id);
  }
}
