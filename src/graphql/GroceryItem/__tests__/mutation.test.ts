// 3rd party
import { graphql } from 'graphql';

// Test Co
import schema from '@testco/schema';

jest.mock('@testco/graphql/GroceryItem/repository')

describe('tagGroceryItem', () => {
  test('should return the tagged item', async () => {
    const _id = '1a2bcx';
    const tag = 'large';
    //language=GraphQL
    const query = `
      mutation {
        tagGroceryItem(_id: "${_id}", tag:"${tag}") {
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
    expect(data.tagGroceryItem._id).toBe(_id);
  });
});


describe('unTagGroceryItem', () => {
  test('should return the untagged item', async () => {
    const _id = '1a2bcx';
    const tag = 'large';
    //language=GraphQL
    const query = `
      mutation {
        unTagGroceryItem(_id: "${_id}", tag:"${tag}") {
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
    expect(data.unTagGroceryItem._id).toBe(_id);
  });
});

describe('deleteGroceryItem', () => {
  test('should return deleted item _id', async () => {
    const _id = '1a2bcx';
    //language=GraphQL
    const query = `
      mutation {
        deleteGroceryItem(_id: "${_id}") {
          _id
        }
      }
    `;

    const result = await graphql(schema, query);
    const { data } = result;
    expect(data.deleteGroceryItem._id).toBe(_id);
  });
});

describe('addGroceryItem', () => {
  test('should return the added item', async () => {
    const name = 'New Item';
    //language=GraphQL
    const query = `
      mutation {
        addGroceryItem(categories: [{name: "Small"}, {name:"Machine"}], name:"${name}") {
          _id,
          name
        }
      }
    `;

    const result = await graphql(schema, query);
    const { data: { addGroceryItem } } = result;

    expect(addGroceryItem.name).toBe(name);
  });
});

describe('updateGroceryItemName', () => {
  test('should return the updated item', async () => {
    const name = 'Updated Item';
    const _id = '1c349cfjd';
    //language=GraphQL
    const query = `
      mutation {
        updateGroceryItemName(_id:"${_id}", name:"${name}") {
          _id,
          name
        }
      }
    `;

    const result = await graphql(schema, query);
    const { data: { updateGroceryItemName } } = result;
    expect(updateGroceryItemName.name).toBe(name);
  });
});