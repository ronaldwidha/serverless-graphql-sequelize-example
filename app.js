const koa = require('koa');
const app = koa();
const mount = require('koa-mount')
const graphqlHTTP = require('koa-graphql')
import Schema  from './lib/items/schema'

// app.use(function *(){
//   this.body = 'Hello World';
// });

app.use(mount('/api', graphqlHTTP({
  schema: Schema,
  pretty: true,
  graphiql: true
})))

app.listen(4000, function() {
  console.log('listening ...')
});