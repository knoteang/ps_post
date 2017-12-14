import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var PostSchema = new Schema({
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
      type: String,
      reference: String

});

mongoose.model('Post', PostSchema);