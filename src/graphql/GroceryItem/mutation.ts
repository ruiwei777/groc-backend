import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
} from 'graphql';

import {
  GroceryItemType,
  GroceryCategoryInput,
  GroceryRemovedItemType
} from './type';
import grocRepo from './repository';

const addGroceryItem = {
  type: GroceryItemType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    categories: { type: new GraphQLList(GroceryCategoryInput) },
  },
  resolve: async (root: any, args: any) => {
    const { name, categories } = args;
    return grocRepo.addGroceryItem(name, categories);
  }
}

const deleteGroceryItem = {
  type: GroceryRemovedItemType,
  args: {
    _id: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (root: any, args: any) => {
    const { _id } = args;
    return grocRepo.deleteGroceryItem(_id);
  }
}

const updateGroceryItemName = {
  type: GroceryItemType,
  args: {
    _id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (root: any, args: any) => {
    const { _id, name } = args;
    return grocRepo.updateGroceryItemName(_id, name);
  },
}

const tagGroceryItem = {
  type: GroceryItemType,
  args: {
    _id: { type: new GraphQLNonNull(GraphQLString) },
    tag: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (root: any, args: any) => {
    const { _id, tag } = args;
    return grocRepo.tagGroceryItem(_id, tag);
  }
}

const unTagGroceryItem = {
  type: GroceryItemType,
  args: {
    _id: { type: new GraphQLNonNull(GraphQLString) },
    tag: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (root: any, args: any) => {
    const { _id, tag } = args;
    return grocRepo.unTagGroceryItem(_id, tag);
  }
}

const GroceryItemMutation = new GraphQLObjectType({
  name: 'GroceryItemMutation',
  fields: {
    addGroceryItem,
    deleteGroceryItem,
    updateGroceryItemName,
    tagGroceryItem,
    unTagGroceryItem,
  },
})

export default GroceryItemMutation;
