var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'cat@03$01$98',
  database : 'DR_list'
	});

router.get('/:test', function(req,res) {
	var roll_num = req.params.test;
    var rank;
    var size;
    var cpi;
    var obj = {};
    connection.query('SELECT * from dr_table where roll_no =' + connection.escape(roll_num), function(err,row,fields){
     cpi = row[0].cpi;
     console.log('cpi of the entered roll num is ' + cpi);
  
	connection.query('SELECT * FROM dr_table', function(err,rows,fields){
        size = rows.length;
        console.log(size);
	});
    connection.query('SELECT * FROM dr_table where cpi >= ' +connection.escape(cpi) , function(err,rowss,columns){
    	if(!err)
    	{
          rank = rowss.length;
          console.log(rowss);
    	}
    
    obj = {
		roll_num : roll_num,
	    rank: rank,	   
	    size: size 
	}
    res.json(obj);
    console.log(obj);
  });
   

});

  });
module.exports = router;