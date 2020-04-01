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
  listUsers: {
    type: [Schema.Types.ObjectId],
    ref: 'users',
  },
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
        type: Boolean,
        default: false,
        optionalNote: {
          type: String,
        },
        //Say which user got the product
      },
      fail: {
        type: Boolean,
        default: false,
        reason: {
          type: String,
        },
        optionalNote: {
          type: String,
        },
        //Reason dropdown, e.g none left in shop etc
      },
    },
  ],
});

module.exports = List = mongoose.model('List', ListSchema);
