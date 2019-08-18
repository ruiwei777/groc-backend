import grocRepo from '@testco/graphql/GroceryItem/repository';

jest.mock('@testco/graphql/GroceryItem/repository');

describe('addGroceryItem', () => {
  test('should add item with corresponding name', async () => {
    const newName = 'Note Book';
    const item = await grocRepo.addGroceryItem(newName, [{ name: 'Stationery' }]);
    const { name } = item;
    expect(name).toBe(newName);
  });
});

describe('deleteGroceryItem', () => {
  test('should delete the item and return {_id: removedId}', async () => {
    const _idRemoved = 'randmoId';
    const { _id } = await grocRepo.deleteGroceryItem(_idRemoved);
    expect(_idRemoved).toBe(_id);
  });
});

describe('updateGroceryItemName', () => {
  test('should return the updated doc having the input name', async () => {
    const _idToUpdate = 'randomId';
    const newName = 'Updated Item';
    const doc = await grocRepo.updateGroceryItemName(_idToUpdate, newName);
    const { _id, name } = doc;
    expect(_idToUpdate).toBe(_id);
    expect(name).toBe(name);
  });
});

describe('tagGroceryItem', () => {
  test('should update the item to have the tag in its categories', async () => {
    const _idToUpdate = 'randomId';
    const newTag = 'Digital';
    const doc = await grocRepo.tagGroceryItem(_idToUpdate, newTag);
    const { _id, categories } = doc;
    const contains = categories.some(c => c.name === newTag);

    expect(_idToUpdate).toBe(_id);
    expect(contains).toBeTruthy();
  });
});

describe('unTagGroceryItem', () => {
  test('should update the item to not have the tag in its categories', async () => {
    const _idToUpdate = 'randomId';
    const removedTag = 'Digital';
    const doc = await grocRepo.unTagGroceryItem(_idToUpdate, removedTag);
    const { _id, categories } = doc;
    const contains = categories.some(c => c.name === removedTag);

    expect(_idToUpdate).toBe(_id);
    expect(contains).toBeFalsy();
  });
});

describe('searchGroceryItemsByTag', () => {
  test('should return items having the query tag', async () => {
    const searchTag = 'Toy';

    const docs = await grocRepo.searchGroceryItemsByTag(searchTag);
    const contains = docs.every(d => d.categories.some(c => c.name === searchTag));

    expect(contains).toBeTruthy();
  });
});

describe('getAllGroceryItems', () => {
  test('should get all items from DB', async () => {
    const docs = await grocRepo.getAllGroceryItems();
    expect(docs.length).toBeTruthy();
  });
});

describe('initDB', () => {
  test('should insert initial data into DB and returns inserted data', async () => {
    const docs = await grocRepo.initDB();
    expect(docs.length).toBeTruthy();
  });
});