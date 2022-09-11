const express = require('express');
const router = express.Router();

const User = require('../../models/User');

router.post(
  '/',
  async (req, res) => {

    const { wallet, firstname, lastname, location } = req.body;

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
