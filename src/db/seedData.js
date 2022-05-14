const mongoose = require('mongoose')

const Item = require('../models/Item')
const Tag = require('../models/Tag')
const Warehouse = require('../models/Warehouse')

const itemData = require('./seedData/items')
const tagData = require('./seedData/tags')
const warehouseData = require('./seedData/warehouses')

const MONGO_CONNECTION_STRING =
  'mongodb+srv://admin:2t3OrFsy7dDNhdmt@cluster0.q6ir1.mongodb.net/testDatabase?retryWrites=true&w=majority'

mongoose
  .connect(MONGO_CONNECTION_STRING, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(async () => {
    try {
      console.log('Dropping existing database ...')
      await mongoose.connection.db.dropDatabase()

      console.log('Inserting warehouse data...')
      await Warehouse.insertMany(warehouseData)

      console.log('Inserting item data...')
      await Item.insertMany(itemData)

      console.log('Inserting tag data...')
      await Tag.insertMany(tagData)

      await mongoose.connection.close()
    } catch (error) {
      console.error(error)
    }
  })
  .catch(() => {
    console.log('Failed to connect to MongoDB')
  })
