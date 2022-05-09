const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ItemSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  name: {
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
  tags: [
    {
      tagId: {
        type: Schema.Types.ObjectId,
        ref: 'tag',
      },
      content: {
        type: String,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = Item = mongoose.model('item', ItemSchema)
