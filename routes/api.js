/*
*
*
*       Complete the API routing below
*       
*       
*/
'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('../model.js').BookModel;
const ObjectID = require('mongodb').ObjectID;


module.exports = function (app) {

  mongoose.connect(process.env.DB,{ useNewUrlParser: true, useUnifiedTopology: true }, function(error){
    if (error) {
      console.log(error);
    } else {
      console.log("connection successful");
    }
  });
  mongoose.set('useFindAndModify', false);


  app.route('/api/books')
    .get(function (req, res){
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      Book.find({}, (err, data)=> {
        res.json(data);
      })
    })
    
    .post(function (req, res){
      let title = req.body.title;
      //response will contain new book object including atleast _id and title
      if (!title) {
        res.json('missing required field title');
      } else {
        let newBook = new Book( {title: title} );
        newBook.save((err, data)=>{
          if (err) {
            console.log(err);
          } else {
            res.json(data);
          }
        })
      }
    })
    
    .delete(function(req, res){
      //if successful, response will be 'complete delete successful'
      Book.deleteMany({}, (err, data)=>{
        if (err) {
          console.log(err);
        } else {
          res.json('complete delete successful');
        }
      })
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      let id = ((bookid) ? ObjectID(bookid) : null);
      Book.findById(id, (err, data)=> {
        if (err) {
          console.log(err);
        } else if(data == null) {
          res.json('no book exists');
        } else {
          res.json(data);
        }
      })
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get

      if (!comment) {
        res.json('missing required field comment');
      } else {
        let id = ((ObjectID.isValid(bookid)) ? ObjectID(bookid) : null);
        Book.findByIdAndUpdate(id,
          {$inc: {commentcount: 1}, $push: {comments: comment}},
          {new: true},
          (err, data)=>{
            if (err) {
              console.log(err);
            } else if(data == null) {
              res.json('no book exists');
            } else {
              res.json(data);
            }
          })
      }    
    })

    .delete(function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
      Book.deleteOne({_id:new ObjectID(bookid)}, (err, data)=>{
        if (err) {
          console.log(err);
        } else if (data.n == 0) {
          res.json('no book exists');
        } else {
          res.json('delete successful');
        }
      })
    });
  
};
