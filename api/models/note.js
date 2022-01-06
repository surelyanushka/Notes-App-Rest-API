const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      unique:true
    },

    description: {
      type: String,
      required: true,
    },

    username:{
      type: String,
      required: true,
    },
  }, 
  {timestamps: true}
);

const model = mongoose.model('Note', NoteSchema)
module.exports = model