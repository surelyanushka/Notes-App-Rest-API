const router = require("express").Router();
const User = require("../models/user");
const Note = require("../models/note")

//Create Note
router.post("/:id", async (req,res)=>{
  const newNote = new Note(req.body);
  try{
    const saveNote = await newNote.save();
    res.status(200).json(saveNote)

  }catch(err){
    res.status(500).json(err);
  }
})


//Update NOte
router.put("/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if(note.username === req.body.username){
      try{
       const updatedNote = await Note.findByIdAndUpdate(req.params.id, 
        {
          $set:req.body
        },
       {new:true}
       );
      res.status(200).json(updatedNote);
      }catch(err){
        res.status(500).json(err);
      }
    }else{
      res.status(401).json("You can update only your note");
    }
    
    
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});



//delete -> Note id
router.delete("/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if(note.username === req.body.username){
      try{
       await note.delete();
      res.status(200).json("Your Note has been deleted")

      }catch(err){
        res.status(500).json(err);
      }
    }else{
      res.status(401).json("You can delete only your note");
    }
    
    
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});


//GET NOTE
router.get("/:id", async(req,res)=>{
  try{
    const note = await Note.findById(req.params.id);
    res.status(200).json(note)
  }catch(err){
    res.status(500).json(err)
  }
})

//GET all notes of user
router.get("/", async(req,res)=>{
  const username = req.query.user;
  try{
    let notes;
    if(username) {
      notes = await Note.find({ username })
    }
    else{
      notes = await Note.find()
    }
    res.status(200).json(notes)
    
  }catch(err){
    res.status(500).json(err)
  }
})

//notes?user=[enterusername]

//exporting
module.exports = router;
