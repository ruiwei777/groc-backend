// Test Co
import grocRepo from '@testco/graphql/GroceryItem/repository';
import { GroceryItemType } from './type';

import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString
} from 'graphql';

const GroceryItemQuery = new GraphQLObjectType({
  name: 'GroceryItemQuery',
  fields: {
    groceryItems: {
      type: new GraphQLList(GroceryItemType),
      async resolve(parent, args) {
        return grocRepo.getAllGroceryItems();
      }
    },
    searchGroceryItemsByTag: {
      type: new GraphQLList(GroceryItemType),
      args: {
        tag: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const { tag } = args;
        return grocRepo.searchGroceryItemsByTag(tag);
      }
    },
  }
});

export default GroceryItemQuery;
