/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

let testID;
let nonExistingID = '602d7da81ddf7906daee8422';

suite('Functional Tests', function() {

  /*
  * ----[EXAMPLE TEST]----
  * Each test should completely test the response of the API end-point including response status code!
  */
  // test('#example Test GET /api/books', function(done){
  //   chai.request(server)
  //     .get('/api/books')
  //     .end(function(err, res){
  //       assert.equal(res.status, 200);
  //       assert.isArray(res.body, 'response should be an array');
  //       assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
  //       assert.property(res.body[0], 'title', 'Books in array should contain title');
  //       assert.property(res.body[0], '_id', 'Books in array should contain _id');
  //       done();
  //   });
  // });
  /*
  * ----[END of EXAMPLE TEST]----
  */

  suite('Routing tests', function() {


    suite('POST /api/books with title => create book object/expect book object', function() {
      
      test('Test POST /api/books with title', function(done) {
        chai.request(server)
          .post('/api/books')
          .send({title: 'Testing Book'})
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'response should be an object');
            assert.property(res.body, 'commentcount', 'Books should contain commentcount');
            assert.property(res.body, 'title', 'Books should contain title');
            assert.property(res.body, '_id', 'Books should contain _id');
            testID = res.body['_id'];
            done();
        });
      });
      
      test('Test POST /api/books with no title given', function(done) {
        chai.request(server)
          .post('/api/books')
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.isString(res.body, 'response should be an string');
            assert.equal(res.body, 'missing required field title', 'response should note the missing required field');
            done();
        });
      });
      
    });


    suite('GET /api/books => array of books', function(){
      
      test('Test GET /api/books',  function(done){
        chai.request(server)
          .get('/api/books')
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.isArray(res.body, 'response should be an array');
            assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
            assert.property(res.body[0], 'title', 'Books in array should contain title');
            assert.property(res.body[0], '_id', 'Books in array should contain _id');
            done();
        });
      });      
      
    });


    suite('GET /api/books/[id] => book object with [id]', function(){
      
      test('Test GET /api/books/[id] with id not in db',  function(done){
        chai.request(server)
          .get('/api/books/'+ nonExistingID )
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.isString(res.body, 'response should be an string');
            assert.equal(res.body, 'no book exists', 'response should note the error');
            done();
        });
      });
      
      test('Test GET /api/books/[id] with valid id in db',  function(done){
        chai.request(server)
          .get('/api/books/'+ testID )
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'response should be an object');
            assert.property(res.body, 'commentcount', 'Books should contain commentcount');
            assert.property(res.body, 'title', 'Books should contain title');
            assert.property(res.body, '_id', 'Books should contain _id');
            done();
        });
      });
      
    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function(){
      
      test('Test POST /api/books/[id] with comment', function(done){
        chai.request(server)
          .post('/api/books/' + testID )
          .send({comment: 'A new comment'})
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'response should be an object');
            assert.property(res.body, 'commentcount', 'Books should contain commentcount');
            assert.property(res.body, 'title', 'Books should contain title');
            assert.property(res.body, '_id', 'Books should contain _id');
            done();
        });
      });

      test('Test POST /api/books/[id] without comment field', function(done){
        chai.request(server)
          .post('/api/books/' + testID )
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.isString(res.body, 'response should be an string');
            assert.equal(res.body, 'missing required field comment', 'response should note the missing field');
            done();
        });
      });

      test('Test POST /api/books/[id] with comment, id not in db', function(done){
        chai.request(server)
          .post('/api/books/' + nonExistingID )
          .send({comment: 'A new comment'})
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.isString(res.body, 'response should be an string');
            assert.equal(res.body, 'no book exists', 'response should note the error');
            done();
        });
      });
      
    });

    suite('DELETE /api/books/[id] => delete book object id', function() {

      test('Test DELETE /api/books/[id] with valid id in db', function(done){
        chai.request(server)
          .delete('/api/books/' + testID )
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.isString(res.body, 'response should be an string');
            assert.equal(res.body, 'delete successful', 'response should note the completion of action');
            done();
        });
      });

      test('Test DELETE /api/books/[id] with  id not in db', function(done){
        chai.request(server)
          .delete('/api/books/' + nonExistingID )
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.isString(res.body, 'response should be an string');
            assert.equal(res.body, 'no book exists', 'response should note the error');
            done();
        });
      });

    });

  });

});
