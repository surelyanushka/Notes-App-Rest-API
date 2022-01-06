const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const Note = require("../models/note")


//Update user
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.userId) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You can't update this!");
  }
});

//Delete
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Note.deleteMany({username:user.username})
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(404).json("User not found")
    }
  } else {
    res.status(401).json("You can't delete this!");
  }
});

//GET User
router.get("/:id", async(req,res)=>{
  try{
    const user = await User.findById(req.params.id);
    const {password, ...others} = user._doc
    res.status(200).json(others)
  }catch(err){
    res.status(500).json(err)
  }
})


//GET ALL USERS
router.get("/", async(req,res)=>{
  const username = req.query.user;
  try{
    let users;
    users = await User.find()
    
    res.status(200).json(users)
    
  }catch(err){
    res.status(500).json(err)
  }
})

//exporting
module.exports = router;
