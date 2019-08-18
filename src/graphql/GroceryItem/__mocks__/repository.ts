import db from '@testco/db';
import initialData from '@testco/graphql/GroceryItem/initial-data';


const addGroceryItem = (name: string, categories: { name: string }[]) => Promise.resolve({
  _id: "D8oRYNm0B4FG8AOC",
  name,
  categories,
})

const deleteGroceryItem = (_id: string) => Promise.resolve({
  _id,
});

const updateGroceryItemName = (_id: string, name: string) => Promise.resolve({
  _id,
  name,
})

const initDB = () => Promise.resolve<GroceryItem[]>(initialData);

const tagGroceryItem = (_id: string, tag: string) => Promise.resolve({
  _id,
  categories: [
    { name: tag },
  ],
});

const unTagGroceryItem = (_id: string, tag: string) => Promise.resolve({
  _id,
  categories: [],
});

const searchGroceryItemsByTag = (tag: string) => Promise.resolve(
  initialData.filter(g => g.categories.filter(c => c.name === tag).length)
);


const getAllGroceryItems = () => Promise.resolve(initialData);


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