const express = require('express')
const models = require('./models')
const expressGraphQL = require('express-graphql')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const schema = require('./schema/schema')

const app = express()

// Replace with your MongoDB URI
const MONGO_URI = 'mongodb://localhost:27017/lyricaldb'
if (!MONGO_URI) {
  throw new Error('You must provide a MongoDB URI')
}

mongoose.Promise = global.Promise
mongoose.connect(MONGO_URI, { useMongoClient: true })
mongoose.connection
    .once('open', () => console.log('Connected to MongoDB instance.'))
    .on('error', error => console.log('Error connecting to MongoDB:', error))

app.use(bodyParser.json())
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}))

const webpackMiddleware = require('webpack-dev-middleware')
const webpack = require('webpack')
const webpackConfig = require('../webpack.config.js')
app.use(webpackMiddleware(webpack(webpackConfig)))

module.exports = app
