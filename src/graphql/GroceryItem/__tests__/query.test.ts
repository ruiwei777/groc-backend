// 3rd party
import { graphql } from 'graphql';

// Test Co
import schema from '@testco/schema';

jest.mock('@testco/graphql/GroceryItem/repository')


test('should return initial data', async () => {
  //language=GraphQL
  const query = `
    query {
      groceryItems {
        _id
        name
        categories {
          name
        }
      }
    }
  `;

  const result = await graphql(schema, query);
  const { data } = result;
  expect(data.groceryItems.length).toBeTruthy();
});

test('should return items whose tags match the input tag, among initial data', async () => {
  //language=GraphQL
  const tag = 'Small';
  const query = `
  query {
    searchGroceryItemsByTag(tag: "${tag}") {
      _id
      name
      categories {
        name
      }
    }
  }
`;

  const result = await graphql(schema, query);
  const { data: { searchGroceryItemsByTag } } = result;
  expect(searchGroceryItemsByTag.length).toBeTruthy();
  expect(searchGroceryItemsByTag.every(item => {
    const { categories } = item;
    return categories.some(c => c.name === tag);
  })).toBeTruthy();
});