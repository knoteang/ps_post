import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var PostSchema = new Schema({
      title: {
            type: String,
            required: true,
            trim: true
      },
      content: {
            type: String
      },
      author: {
            type: String,
            required: true,
            trim: true
      },
      time: {
            type: Date,
            default: Date.now
      },
      like: Number,
      id: Number
});

mongoose.model('Post', PostSchema);