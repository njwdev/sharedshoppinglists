const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new Schema({
  //@Todo List image
  // List creator
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  // List users, an array of people with access
  listUsers: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
      name: {
        type: String,
      },
    },
  ],
  // type: [Schema.Types.ObjectId],
  // ref: 'users',

  title: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
    required: true,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
    required: true,
  },
  listItems: [
    {
      itemName: {
        type: String,
        // required: true,
      },
      quantity: {
        type: String,
        // required: true,
      },
      dateAdded: {
        type: Date,
        required: true,
        default: Date.now,
      },
      addedBy: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
      },
      extraInfo: {
        type: String,
      },
      success: {
        success: {
          type: Boolean,
          default: false,
        },
        name: {
          type: String,
        },
        dateGot: {
          type: Date,
        },
        optionalNote: {
          type: String,
        },
        //Say which user got the product
      },
      fail: {
        fail: {
          type: Boolean,
          default: false,
        },
        name: {
          type: String,
        },
        reason: {
          type: String,
        },
        optionalNote: {
          type: String,
        },
        failDate: {
          type: Date,
        },
      },
    },
  ],
});

module.exports = List = mongoose.model('List', ListSchema);
