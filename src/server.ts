import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { schema } from './schema'
import { context } from './context'

const app = express()

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    context: context,
    graphiql: true,
  }),
)
app.listen(4000)

app.set('port', (process.env.PORT || 5000));

//For avoidong Heroku $PORT error
app.get('/', function(request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});

console.log(`\

🚀 Server ready at: http://localhost:4000/graphql
⭐️ See sample queries: http://pris.ly/e/ts/graphql#using-the-graphql-api
`)
