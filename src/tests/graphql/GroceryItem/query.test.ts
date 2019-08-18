import axios from 'axios';

const PORT = process.env.PORT || 5000;

/**
 * Integraton tests require server running.
 */

describe('Query getAllGroceryItems', () => {
  test('should retrieve all grocery items', async () => {
    const results = await axios({
      url: `http://localhost:${PORT}/graphql`,
      method: 'post',
      data: {
        query: `
          query {
            groceryItems {
              name
              price
              currency
              categories {
                name
              }
            }
          }
        `
      }
    });
    const { data: { data: { groceryItems } } } = results;

    expect(groceryItems.length).toBeTruthy();
  });
});

describe('Query getAllGroceryItems', () => {
  test('should return items having the search tag in categories', async () => {
    const tag = 'Small';
    const results = await axios({
      url: `http://localhost:${PORT}/graphql`,
      method: 'post',
      data: {
        query: `
          query {
            searchGroceryItemsByTag(tag: "${tag}") {
              name
              price
              currency
              categories {
                name
              }
            }
          }
        `
      }
    });
    const { data: { data: { searchGroceryItemsByTag } } } = results;
    const contains = searchGroceryItemsByTag.every(d => d.categories.some(c => c.name === tag));
    expect(contains).toBeTruthy();
  });
});
