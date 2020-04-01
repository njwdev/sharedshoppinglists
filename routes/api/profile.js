const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route GET <api/>
// @desc Get current users profile
// @access Private

router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar', 'date', 'lastLogin']);
    if (!profile) {
      return res.status(400).json({ msg: 'No profile for this user' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error in profile');
  }
});

// @route POST api/profile
// @desc Create / update current users profile
// @access Private

router.post(
  '/',
  [
    auth,
    [
      check('location', 'location is required')
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { location, twitter, instagram } = req.body;

    const profileFields = {};
    profileFields.user = req.user.id;
    profileFields.socials = {};

    if (location) profileFields.location = location;
    if (twitter) profileFields.socials.twitter = twitter;
    if (instagram) profileFields.socials.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      //Update
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true },
        );
        return res.json(profile);
      }

      //Create
      profile = new Profile(profileFields);
      await profile.save();
      return res.json(profile);
    } catch (err) {
      console.error(err.message);
    }
  },
);

// @route Get api/profile
// @desc Get all profiles - this will be needed to invite to share list
// @access Public

router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route Get api/profile/user/:user_id
// @desc Get a profile by user id
// @access Public

router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);
    if (!profile) return res.status(400).json('Profile not found');
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    if (error.kind == 'ObjectId')
      return res.status(400).json('Profile not found');
    res.status(500).send('Server Error');
  }
});

// @route Delete api/profile/user/:user_id
// @desc Delete profile, user & posts
// @access Public

router.delete('/', auth, async (req, res) => {
  try {
    //@todo remove user posts
    Profile.findOneAndRemove({
      user: req.user.id,
    });
    await User.findOneAndRemove({
      _id: req.user.id,
    });
    res.json({ msg: 'User deleted' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
