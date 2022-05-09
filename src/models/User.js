const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  inventory: [
    {
      item: {
        type: Schema.Types.ObjectId,
        ref: 'item',
      },
    },
  ],
})

module.exports = User = mongoose.model('user', UserSchema)
