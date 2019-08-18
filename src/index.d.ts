interface GroceryItem {
  name: string;
  price: number;
  currency: string;
  categories: Tag[];
  stock: number;
  _id?: string;
}

interface Tag {
  _id?: string;
  name: string;
}