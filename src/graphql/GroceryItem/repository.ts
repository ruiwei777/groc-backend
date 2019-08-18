import db from '@testco/db';
import initialData from './initial-data';


const addGroceryItem = (name: string, categories: { name: string }[]) => new Promise<GroceryItem>((resolve, reject) => {
  const newItem = {
    name,
    categories,
    price: 5,
    currency: 'AUD',
    stock: 10,
  }
  db.insert(newItem, (err, doc) => {
    if (err) reject(err);
    resolve(doc);
  });
});

const deleteGroceryItem = (_id: string) => new Promise<{ _id: string }>((resolve, reject) => {
  db.remove({ _id }, {}, (err: Error) => {
    if (err) reject(err);
    resolve({ _id });
  });
});

const updateGroceryItemName = (_id: string, name: string) => new Promise<GroceryItem>((resolve, reject) => {
  db.update({ _id }, { $set: { name } }, {}, (err, numUpdated) => {
    if (err) reject(err);
    db.findOne({ _id }, (err, doc: GroceryItem) => {
      if (err) reject(err);
      resolve(doc);
    });
  });
});

const initDB = () => new Promise<GroceryItem[]>((resolve, reject) => {
  db.remove({}, { multi: true }, function (err, numRemoved) {
    if (err) reject(err);
    console.log('DB Cleared to be empty. Begin inserting data...');
    db.insert<GroceryItem[]>(initialData, (err: Error, newDocs) => {
      if (err) reject(err);
      resolve(newDocs);
    });
  });
});

const tagGroceryItem = (_id: string, tag: string) => new Promise<GroceryItem>((resolve, reject) => {
  db.update({ _id }, {
    $addToSet: {
      categories: {
        name: tag
      },
    }
  }, {}, (err: Error) => {
    if (err) reject(err);
    db.findOne({ _id }, (err, doc: GroceryItem) => {
      if (err) reject(err);
      resolve(doc);
    });
  });
});

const unTagGroceryItem = (_id: string, tag: string) => new Promise<GroceryItem>((resolve, reject) => {
  db.update({ _id }, {
    $pull: {
      categories: {
        name: tag,
      },
    }
  }, { multi: true }, (err: Error) => {
    if (err) reject(err);
    db.findOne({ _id }, (err, doc: GroceryItem) => {
      if (err) reject(err);
      resolve(doc);
    })
  });
});

const searchGroceryItemsByTag = (tag: string) => new Promise<GroceryItem[]>((resolve, reject) => {
  db.find({
    categories: {
      $elemMatch: {
        name: tag
      }
    }
  }, (err: Error, docs: GroceryItem[]) => {
    if (err) reject(err);
    resolve(docs);
  })
});

const getAllGroceryItems = () => new Promise<GroceryItem[]>((resolve, reject) => {
  db.find({}, (err: Error, docs: GroceryItem[]) => {
    if (err) reject(err);
    resolve(docs);
  });
});


export default {
  addGroceryItem,
  deleteGroceryItem,
  initDB,
  tagGroceryItem,
  unTagGroceryItem,
  searchGroceryItemsByTag,
  getAllGroceryItems,
  updateGroceryItemName,
}