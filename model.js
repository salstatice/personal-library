const mongoose = require("mongoose");
const {Schema} = mongoose;


const bookSchema = new Schema({
  comments: [String],
  title: String,
  commentcount: {type: Number, default: 0},
})

let Book = mongoose.model("Book", bookSchema);

exports.BookModel = Book;