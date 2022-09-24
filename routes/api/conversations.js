const router = require("express").Router();
const Conversation = require("../../models/Conversation");

const authenticateToken = require('../../middleware/authenticateToken');

//new conversation

router.post("/", authenticateToken, async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
    status: req.body.status,
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});


//Updating conversation
router.put(
  '/',
  async (req, res) => {

    const id = req.header('x-auth-id');
    const updatedData = req.body;
    const options = { new: true };

    try {
      
    const result = await Conversation.findByIdAndUpdate(
        id, updatedData, options
    )

     
      res.json(result);

    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  }
);

//get conversastion of a user

router.get("/:userId", authenticateToken, async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});



//get conversastion information by conversation ID

router.get("/id/:conversationId", authenticateToken, async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.conversationId);
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});



// get conv includes two userId

router.get("/find/:firstUserId/:secondUserId", authenticateToken, async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation)
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;