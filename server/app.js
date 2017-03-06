var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var treats = require('./routes/treats');
var pg = require('pg');



/*** Build out a module to manage our treats requests. ***/
app.use('/treats', treats);



// Get static files
app.use(express.static('./server/public'));

// Get index.html
app.get('/', function(req, res) {
  res.sendFile(path.resolve('./server/public/views/index.html'));
});


app.listen(port, function() {
  console.log('Server running on port: ', port);
});
