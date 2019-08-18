
import {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
  GraphQLString,
  GraphQLInputObjectType
} from 'graphql';

export const GroceryCategoryType = new GraphQLObjectType({
  name: 'GroceryCategoryType',
  fields: () => ({
    name: { type: GraphQLString },
  }),
})

export const GroceryCategoryInput = new GraphQLInputObjectType({
  name: 'GroceryCategoryInput',
  fields: () => ({
    name: { type: GraphQLString },
  }),
})

export const GroceryItemType = new GraphQLObjectType({
  name: 'GroceryItem',
  fields: () => ({
    _id: { type: GraphQLString },
    name: { type: GraphQLString },
    price: { type: GraphQLInt },
    currency: { type: GraphQLString },
    categories: { type: new GraphQLList(GroceryCategoryType) },
    stock: { type: GraphQLInt },
  })
});

export const GroceryRemovedItemType = new GraphQLObjectType({
  name: 'GroceryRemovedItem',
  fields: () => ({
    _id: { type: GraphQLString },
  }),
});
