module.exports = {
  getRecords: function(req, res) {    
        var pg = require('pg');        
        //You can run command "heroku config" to see what is Database URL from Heroku belt
        var conString = process.env.DATABASE_URL || "postgres://jajloqxmaopqss:48riR4pIiJxzac0VR7LD3A_6ej@ec2-107-22-166-233.compute-1.amazonaws.com:5432/dbtnrakfrv4cj";
        var client = new pg.Client(conString);
        client.connect();
        var query = client.query("select * from account");
        query.on("row", function (row, result) { 
            result.addRow(row); 
        });
        query.on("end", function (result) {          
            client.end();
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write(JSON.stringify(result.rows, null, "    ") + "\n");
            res.end();  
        });
  },
    addRecord : function(req, res){
        var pg = require('pg');          
        var conString = process.env.DATABASE_URL ||  "postgres://jajloqxmaopqss:48riR4pIiJxzac0VR7LD3A_6ej@ec2-107-22-166-233.compute-1.amazonaws.com:5432/dbtnrakfrv4cj";
        var client = new pg.Client(conString);
        client.connect();
        var query = client.query("insert into account (name,fname,lname,email) "+ 
                                "values ('"+req.query.name+"','"+req.query.fName+"','"+req.query.lName+"','"+
                                    req.query.email+"')");    
        query.on("end", function (result) {          
            client.end(); 
            res.write('Success');
            res.end();  
        });
    },    
     delRecord : function(req, res){
        var pg = require('pg');           
        var conString = process.env.DATABASE_URL ||  "postgres://jajloqxmaopqss:48riR4pIiJxzac0VR7LD3A_6ej@ec2-107-22-166-233.compute-1.amazonaws.com:5432/dbtnrakfrv4cj";
        var client = new pg.Client(conString);
        client.connect();         
        var query = client.query( "Delete from account Where id ="+req.query.id);    
        query.on("end", function (result) {          
            client.end(); 
            res.write('Success');
            res.end();  
        });
    },    
    createTable : function(req, res){
        var pg = require('pg');
        var conString = process.env.DATABASE_URL ||  "postgres://jajloqxmaopqss:48riR4pIiJxzac0VR7LD3A_6ej@ec2-107-22-166-233.compute-1.amazonaws.com:5432/dbtnrakfrv4cj";
        var client = new pg.Client(conString);
        client.connect();         
        var query = client.query( "CREATE TABLE account"+
                                    "("+
									  "name character varying(50),"+
                                      "fname character varying(50),"+
                                      "lname character varying(20),"+
                                      "email character varying(30),"+
                                      "id serial NOT NULL"+
                                    ")");    
        query.on("end", function (result) {          
            client.end(); 
            res.write('Table Schema Created');
            res.end();  
        });
    },    
    dropTable : function(req, res){
        var pg = require('pg');           
        var conString = process.env.DATABASE_URL || "postgres://jajloqxmaopqss:48riR4pIiJxzac0VR7LD3A_6ej@ec2-107-22-166-233.compute-1.amazonaws.com:5432/dbtnrakfrv4cj";
        var client = new pg.Client(conString);
        client.connect();         
        var query = client.query( "Drop TABLE account");    
        query.on("end", function (result) {          
            client.end(); 
            res.write('Table Schema Deleted');
            res.end();  
        });
    }    
};