import GroceryItemQuery from '@testco/graphql/GroceryItem/query';
import GroceryItemMutation from '@testco/graphql/GroceryItem/mutation';

import { GraphQLSchema } from 'graphql';

export default new GraphQLSchema({
  query: GroceryItemQuery,
  mutation: GroceryItemMutation,
});
