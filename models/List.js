const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new Schema({
  // List creator
  creator: {
    id: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    name: {
      type: String,
    },
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
        required: true,
      },
      quantity: {
        type: String,
      },
      dateAdded: {
        type: Date,
        required: true,
        default: Date.now,
      },
      addedBy: {
        id: {
          type: Schema.Types.ObjectId,
          ref: 'users',
          required: true,
        },
        name: {
          type: String,
        },
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
  complete: {
    complete: {
      type: Boolean,
      required: true,
      default: false,
    },
    completionDate: {
      type: Date,
    },
  },
});

module.exports = List = mongoose.model('List', ListSchema);
