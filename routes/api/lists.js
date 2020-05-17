const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const List = require('../../models/List');

const User = require('../../models/User');
const Profile = require('../../models/Profile');

// @route POST api/lists
// @desc Create a list
// @access private

router.post(
  '/',
  [auth, [check('title', 'Title is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const newList = new List({
        creator: req.user.id,
        title: req.body.title,
        avatar: user.avatar,
        user: req.user.id,
      });

      const { sharedWith } = req.body;

      //Checks if List is shared

      if (sharedWith[0].userId.length) {
        await newList.listUsers.unshift(
          { userId: req.user.id, name: user.profile.name },
          ...sharedWith,
        );
      } else {
        await newList.listUsers.unshift({
          userId: req.user.id,
          name: user.profile.name,
        });
      }

      const list = await newList.save();
      res.json(list);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  },
);

router.get('/', auth, async (req, res) => {
  try {
    const user = req.user.id;

    //Gets all lists by logged in number @TODO - will find by listUsers
    const lists = await List.find({
      'listUsers.userId': user,
    }).sort({
      lastUpdated: -1,
    });

    res.json(lists);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @GET api/lists
//@Desc Get list by id
//@Access Private

router.get('/:id', auth, async (req, res) => {
  try {
    const list = await List.findById(req.params.id).sort({ date: -1 });

    if (!list) res.status(404).json({ msg: 'list not found' });
    res.json(list);
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      res.status(404).json({ msg: 'list not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @DELETE api/lists
//@Desc delete list by id
//@Access Private

router.delete('/:id', auth, async (req, res) => {
  try {
    const list = await List.findById(req.params.id);
    //auth check
    if (!list) {
      res.status(404).json({ msg: 'List not found' });
    }

    if (list.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    await list.remove();

    res.json({ msg: `List with title: ${list.title} removed` });
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      res.status(404).json({ msg: 'list not found' });
    }
    res.status(500).send('Server Error');
  }
});

//@PUT api/lists/:id
//@desc Add list item to list
//@access - Private - only listUsers can access

router.put(
  '/:id',
  auth,
  [
    check('itemName', 'Item name is required').not().isEmpty(),
    check('quantity', 'Quantity is required').not().isEmpty(),
  ],
  async (req, res) => {
    try {
      const list = await List.findById(req.params.id);
      //@TODO - Check that user has permission to add listItem
      // if (list.creator.toString() !== req.user.id) {
      //   return res.status(401).json({ msg: 'User not authorized' });
      // }

      const newListItem = new Object({
        itemName: req.body.itemName,
        quantity: req.body.quantity,
        addedBy: req.user.id,
        extraInfo: req.body.extraInfo,
      });

      await list.listItems.unshift(newListItem);

      await list.save();
      res.json(list.listItems);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  },
);

//@PUT api/lists/:id/edit-title
//@desc Edit the list title
//@access - Private - only listUsers can access
//@TODO - refactor this for other fields

router.put(
  '/:id/edit-title',
  auth,
  [auth, [check('title', 'Title is required').not().isEmpty()]],
  async (req, res) => {
    try {
      const list = await List.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: { title: req.body.title },
        },
        { new: true },
      );
      res.send(list);

      //@TODO - Check that user has permission to add listItem
      // if (list.creator.toString() !== req.user.id) {
      //   return res.status(401).json({ msg: 'User not authorized' });
      // }
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  },
);

//@PUT api/lists/:id/:itemId/success
//@desc set list item success
//@access - Private - only listUsers can access

router.put('/:id/:itemId/success', auth, async (req, res) => {
  try {
    const list = await List.findById(req.params.id);

    const updatedListItem = await list.listItems.filter(
      (el) => el.id === req.params.itemId,
    );
    //Removes prev fail info, if applicable
    updatedListItem[0].fail = { fail: false };
    if (req.body.success === true) {
      updatedListItem[0].success = req.body;
      updatedListItem[0].success.dateGot = Date.now();
    } else {
      updatedListItem[0].success.success = false;
    }
    //The else statement handles undo

    await list.save();
    res.send(list);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

router.put('/:id/:itemId/list-item-problem', auth, async (req, res) => {
  console.log(req.body);
  try {
    const list = await List.findById(req.params.id);
    const updatedListItem = await list.listItems.filter(
      (el) => el.id === req.params.itemId,
    );
    updatedListItem[0].fail = req.body;
    updatedListItem[0].fail.failDate = Date.now();
    console.log(updatedListItem);
    await list.save();
    res.send(list);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//@put api/lists  @TODO - could change to delete?
//@desc Remove a list item from the list
//@access - Private - only listUsers can access

router.put('/:id/:itemId', auth, async (req, res) => {
  try {
    const list = await List.findById(req.params.id);

    const newListItems = await list.listItems.filter(
      (el) => el.id !== req.params.itemId,
    );

    const itemToRemove = await list.listItems.filter(
      (el) => el.id === req.params.itemId,
    );

    const itemToRemoveName = await itemToRemove[0].itemName;

    list.listItems = newListItems;

    if (!list) {
      res.status(404).json({ msg: 'List Item Not found' });
    }

    if (list.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    await list.save();

    res.json({
      msg: `List item ${itemToRemoveName} removed from list with title: ${list.title} removed`,
    });
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      res.status(404).json({ msg: 'list not found' });
    }
    res.status(500).send('Server Error');
  }
});

//@POST api/lists/:id
//@desc Edit List settings
//@access - Private - only listUsers can access

//@POST edit list item api/lists/:id/:itemId
//@desc Edit List item - name quantity - extraInfo
//@access - Private - only listUsers can access

//Questions - How to report success / failure of list item

//Find item ID -
//Make success true
//Give option for note
//include who by

module.exports = router;
