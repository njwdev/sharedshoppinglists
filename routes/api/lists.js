const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const List = require('../../models/List');

const User = require('../../models/User');

// Route: POST api/lists
// Desc: Create a list
// Access: Private

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
        creator: { id: req.user.id, name: req.user.name },
        title: req.body.title,
        avatar: user.avatar,
        user: req.user.id,
      });

      const { sharedWith } = req.body;

      //Checks if List is shared

      if (sharedWith[0].userId.length) {
        await newList.listUsers.unshift(
          { userId: req.user.id, name: user.profile.name },
          ...sharedWith
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
  }
);

// Route: GET /api/lists
// Desc: Gets all of the lists that are associated with a user
// Access: Private

router.get('/', auth, async (req, res) => {
  try {
    const user = req.user.id;

    //Gets all lists by logged in number
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

//Route: GET api/lists/:id
//Desc: Get an individual list by id
//Access: Private

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

//Route: DELETE api/lists
//Desc: delete list by id
//Access: Private

router.delete('/:id', auth, async (req, res) => {
  try {
    const list = await List.findById(req.params.id);
    if (!list) {
      res.status(404).json({ msg: 'List not found' });
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

//Route: PUT api/lists/:id
//Desc: Add a list item to list
//Access: Private

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
      const newListItem = new Object({
        itemName: req.body.itemName,
        quantity: req.body.quantity,
        addedBy: { id: req.user.id, name: req.body.userName },
        extraInfo: req.body.extraInfo,
      });

      await list.listItems.unshift(newListItem);

      await list.save();
      res.json(list.listItems);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

//Route: PUT api/lists/:id/edit-title
//Desc: Edit the list title
//Access: Private

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
        { new: true }
      );
      res.send(list);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

//Route: PUT /api/lists/:id/complete-list
//Desc: Marks list as complete
//Access: Private

router.put('/:id/complete-list', auth, async (req, res) => {
  try {
    const list = await List.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: { complete: { ...req.body, completionDate: Date.now() } },
      },
      { new: true }
    );
    res.send(list);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//Route: PUT /api/lists/:id/reactivate-list
//Desc: Reactivates a list (marks as not complete)
//Access: Private

router.put('/:id/reactivate-list', auth, async (req, res) => {
  try {
    const list = await List.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: { complete: { ...req.body } },
      },
      { new: true }
    );
    res.send(list);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//Route: PUT api/lists/:id/:itemId/success
//Desc: sets a list item as success
//Access: Private

router.put('/:id/:itemId/success', auth, async (req, res) => {
  try {
    const list = await List.findById(req.params.id);

    const updatedListItem = await list.listItems.filter(
      (el) => el.id === req.params.itemId
    );

    const listItemAlreadyEdited = updatedListItem[0].success.success;

    if (!req.body.undo && listItemAlreadyEdited) {
      res.status(400).json({
        errors: [
          {
            msg:
              'Item has already been changed by another user. Refresh your list.',
          },
        ],
      });
    }

    // if (updatedListItem[0].success.success)
    //   throw new Error(
    //     'Item has already been changed by another user. Refresh your list.'
    //   );
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
    console.log(error.message);
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//Route: PUT /api/lists/:id/:itemId/list-item-problem
//Desc: Sets a problem with a list item
//Access: Private

router.put('/:id/:itemId/list-item-problem', auth, async (req, res) => {
  try {
    const list = await List.findById(req.params.id);
    const updatedListItem = await list.listItems.filter(
      (el) => el.id === req.params.itemId
    );
    updatedListItem[0].fail = req.body;
    updatedListItem[0].fail.failDate = Date.now();
    await list.save();
    res.send(list);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//Route: PUT api/lists/:id/:itemId/delete
//Desc: Removes a list item from the listItems array
//Access: Private

router.put('/:id/:itemId/delete', auth, async (req, res) => {
  try {
    const list = await List.findById(req.params.id);
    const updatedItems = await list.listItems.filter(
      (el) => el.id !== req.params.itemId
    );
    list.listItems = updatedItems;
    await list.save();
    res.send(list);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
