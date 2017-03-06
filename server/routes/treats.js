
var express = require("express");
var bodyParser = require('body-parser');
var router = express.Router();
var pg = require('pg');
var config = {
  database: 'phi', // the name of the database
  host: 'localhost', // where is your database
  port: 5432, // the port number for your database
  max: 10, // how many connections at one time
  idleTimeoutMillis: 30000 // 30 seconds to try to connect
};

var pool = new pg.Pool(config);

router.get('/', function(req, res){
  pool.connect(function(err, client, done){
    if(err) {
      console.log('Error connecting to database: ', err);
      res.sendStatus(500);
    } else {
      client.query('SELECT * FROM treats', function(err, result){
        done();
        if(err) {
          console.log('Error making the database query: ', err);
          res.sendStatus(500);
        } else {
          res.send(result.rows);
          console.log(result.rows);
        }
      });
    }
  });
});
router.post('/', function(req, res){
var newTreat = req.body;

pool.connect(function(err, client, done){
  if(err) {
    console.log('Error connecting to database: ', err);
    res.sendStatus(500);
  } else {
    client.query('INSERT INTO treats (name, description, pic) VALUES ($1, $2, $3);',[newTreat.name, newTreat.description, newTreat.url],
    function(err, result){
      done();
      if(err) {
        console.log('Error making the database query: ', err);
        res.sendStatus(500);
      } else {
        res.sendStatus(201);
      } // end else
    }); // end query
  } // end else
}); // end pool function
}); // end app.post




module.exports = router;
