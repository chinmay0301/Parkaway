var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'cat@03$01$98',
  database : 'DR_list'
	});



router.get('/:cpi/:roll_num', function(req, res) {
	var cpi = req.params.cpi;
	var roll_num = req.params.roll_num;
	console.log('entering into insert route');

	connection.query('INSERT INTO dr_table VALUES(' + connection.escape(cpi) + ',' + connection.escape(roll_num)+')', function(err,row,columns){
     if(!err)
       console.log('entered succesfully');     		
	});

	var obj = {
		roll_num : roll_num,
		cpi: cpi
	}
  res.json(obj);

});

module.exports = router;