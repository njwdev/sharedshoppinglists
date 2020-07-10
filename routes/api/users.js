const express = require('express');
const gravatar = require('gravatar');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');

const User = require('../../models/User');

//Route: POST /api/users/
//Desc: Signs up and creates new user
//Access: Public

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, darkMode } = req.body;

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
          darkMode: darkMode,
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
        process.env.JWT_SECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );

      //Encrypt password using bcrypt
      // Return JSON webtoken
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  }
);

// Route: GET /me
// Desc: Get current user's profile
// Access: Private

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

//Route: POST /profile
//Desc: Update profile
//Access: Private

router.post(
  '/profile',
  [auth, [check('location', 'Location is required').not().isEmpty()]],
  [auth, [check('name', 'Name is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      location,
      darkMode,
      image,
      initialProfileComplete,
    } = req.body;

    const profileFields = {};
    if (initialProfileComplete)
      profileFields.initialProfileComplete = initialProfileComplete;
    if (location) profileFields.location = location;
    if (name) profileFields.name = name;
    if (image) profileFields.image = image;
    if (darkMode) profileFields.darkMode = darkMode;

    try {
      let profile = await User.findOneAndUpdate(
        { _id: req.user.id },
        {
          $set: { profile: profileFields },
        },
        { new: true }
      );
      res.send(profile);
    } catch (err) {
      console.error(err.message);
    }
  }
);

module.exports = router;
