const mongoose = require('mongoose')
const Schema = mongoose.Schema

const WarehouseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: '',
  },
  inventory: [
    {
      item: {
        type: Schema.Types.ObjectId,
        ref: 'item',
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = Warehouse = mongoose.model('warehouse', WarehouseSchema)
