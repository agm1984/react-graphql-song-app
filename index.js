const app = require('./server/server');

app.listen(4000, () => {
  console.log('GraphQL started and listening on port 4000.');
});
