const express = require('express');
const router = express.Router();

const User = require('../../models/User');

const authenticateToken = require('../../middleware/authenticateToken');



//Getting current user info
router.get('/me', authenticateToken, async (req, res) => {

  const wallet = req.header('x-auth-wallet');

  try {
    const user = await User.findOne({ wallet }).sort({ date: -1 });
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Not authorized');
  }
});



//Creating a user
router.post(
  '/',
  async (req, res) => {

    const { wallet, firstname, lastname, teller, tellerfund, location } = req.body;

    try {
      let user = await User.findOne({ wallet });

      if (user) {
        return res
          .json({ wallet: user.wallet });
      }


      user = new User({
        wallet,
        firstname,
        lastname,
        teller,
        tellerfund,
        location
      });

      await user.save();
      res.json(user);

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
