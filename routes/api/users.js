const express = require('express');
const gravatar = require('gravatar');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const config = require('config');
const auth = require('../../middleware/auth');

const User = require('../../models/User');

//@route POST api/users

//@dec Test route

//@access Public

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters',
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    //See if user exists

    try {
      let user = await User.findOne({ email });
      if (user) {
        res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }
      //Get users gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        m: 'pg',
        d: 'mm',
      });

      user = new User({
        profile: {
          name: name,
        },
        email,
        avatar,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        },
      );

      //Encrypt password using bcrypt
      // Return JSON webtoken
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  },
);

// @route GET
// @desc Get current user's profile
// @access Private

router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    if (!user.profile) {
      return res.status(400).json({ msg: 'No profile for this user' });
    }
    res.json(user.profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error in profile');
  }
});

//Get all users profiles

router.get('/profiles', async (req, res) => {
  try {
    const profiles = await User.find().select('profile');

    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//Update user profile

router.post(
  '/profile',
  [auth, [check('location', 'Location is required').not().isEmpty()]],
  [auth, [check('name', 'Name is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, location, image } = req.body;
    // @todo integrate image

    const profileFields = {};
    if (location) profileFields.location = location;
    if (name) profileFields.name = name;
    if (image) profileFields.image = image;

    try {
      let profile = await User.findOneAndUpdate(
        { _id: req.user.id },
        {
          $set: { profile: profileFields },
        },
        { new: true },
      );
      res.send(profile);
    } catch (err) {
      console.error(err.message);
    }
  },
);

module.exports = router;
