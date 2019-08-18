// 3rd party libraries
import 'module-alias/register';  // Must be the first line to alias module
import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './schema';
import cors from 'cors';

// Test Co
import grocRepo from './graphql/GroceryItem/repository';

const app = express();

app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);

const PORT = process.env.PORT || 5000;

grocRepo.initDB().then((initialData) => {
  console.log(initialData, 'In-memory initial data inserted.' );

  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});
