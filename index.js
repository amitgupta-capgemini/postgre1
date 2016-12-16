var express = require('express');
var app = express();
var cool = require('cool-ascii-faces');
var pg = require('pg');

app.set('port', (process.env.PORT || 5000));

app.get('/', function(request, response) {
  response.send(cool());
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})

pg.connect(process.env.DATABASE_URL, function(err, client) {
  var query = client.query('SELECT * FROM your_table');

  query.on('row', function(row) {
    console.log(JSON.stringify(row));
  });
});