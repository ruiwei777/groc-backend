import axios from 'axios';

import grocRepo from '@testco/graphql/GroceryItem/repository';

const PORT = process.env.PORT || 5000;

/**
 * Integraton tests require server running.
 */

describe('Mutation addGroceryItem', () => {
  test('should return the added item', async () => {
    const newName = 'Pencil';
    const newCategories = 'Stationary';
    const results = await axios({
      url: `http://localhost:${PORT}/graphql`,
      method: 'post',
      data: {
        query: `
          mutation {
            addGroceryItem(name: "${newName}", categories: [{name: "${newCategories}"}]) {
              name
              categories {
                name
              }
            }
          }
        `
      }
    });
    const { data: { data: { addGroceryItem } } } = results;

    expect(addGroceryItem).toBeTruthy();
  });
});

describe('Mutation deleteGroceryItem', () => {
  test('should return the removed _id', async () => {
    const _idToRemove = 'randomId';
    const results = await axios({
      url: `http://localhost:${PORT}/graphql`,
      method: 'post',
      data: {
        query: `
          mutation {
            deleteGroceryItem(_id: "${_idToRemove}") {
              _id
            }
          }
        `
      }
    });
    const { data: { data: { deleteGroceryItem } } } = results;
    const { _id } = deleteGroceryItem;
    expect(_id).toBe(_idToRemove);
  });
});

describe('Mutation updateGroceryItemName', () => {
  test('should return the updated Item', async () => {
    const newName = 'Updated Name';
    const item = await findOneItem();
    const updateId = item._id;

    const results = await axios({
      url: `http://localhost:${PORT}/graphql`,
      method: 'post',
      data: {
        query: `
          mutation {
            updateGroceryItemName(_id: "${updateId}", name: "${newName}") {
              _id,
              name
            }
          }
        `
      }
    });

    const { data: { data: { updateGroceryItemName } } } = results;
    const { _id, name } = updateGroceryItemName;
    expect(_id).toBe(updateId);
    expect(name).toBe(newName);
  });
});

describe('Mutation tagGroceryItem', () => {
  test('should return the tagged Item', async () => {
    const newTag = 'Paper';
    const item = await findOneItem();
    const updateId = item._id;

    const results = await axios({
      url: `http://localhost:${PORT}/graphql`,
      method: 'post',
      data: {
        query: `
          mutation {
            tagGroceryItem(_id: "${updateId}", tag: "${newTag}") {
              _id,
              categories {
                name
              }
            }
          }
        `
      }
    });

    const { data: { data: { tagGroceryItem } } } = results;
    const { _id, categories } = tagGroceryItem;
    const contains = categories.some(c => c.name === newTag);
    expect(_id).toBe(updateId);
    expect(contains).toBeTruthy();
  });
});


describe('Mutation unTagGroceryItem', () => {
  test('should return the untagged Item', async () => {
    const newTag = 'Removed';
    const item = await findOneItem();
    const updateId = item._id;

    const results = await axios({
      url: `http://localhost:${PORT}/graphql`,
      method: 'post',
      data: {
        query: `
          mutation {
            unTagGroceryItem(_id: "${updateId}", tag: "${newTag}") {
              _id,
              categories {
                name
              }
            }
          }
        `
      }
    });

    const { data: { data: { unTagGroceryItem } } } = results;
    const { _id, categories } = unTagGroceryItem;
    const contains = categories.some(c => c.name === newTag);
    expect(_id).toBe(updateId);
    expect(contains).toBeFalsy();
  });
});





/**
 * Helper function to get one item from DB.
 */
const findOneItem = async () => {
  const res = await axios({
    url: `http://localhost:${PORT}/graphql`,
    method: 'post',
    data: {
      query: `
      query {
        groceryItems {
          _id
        }
      }
      `
    }
  });
  const { data: { data: { groceryItems } } } = res;
  return groceryItems[0];
}