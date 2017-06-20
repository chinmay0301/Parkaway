var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'cat@03$01$98',
  database : 'DR_list'
	});




router.get('/:car_num/:phone_num', function(req, res) {
	var car_num = req.params.car_num;
	var phone_num = req.params.phone_num;
	 var timestamp = new Date(); 
	 var hours =  timestamp.getHours();
	 var minutes = timestamp.getMinutes();
	// var seconds = timestam.getSeconds();
	 console.log('entering into insert route');
     console.log(hours);
     console.log(minutes);
 //    console.log(seconds);
	connection.query('INSERT INTO user_req VALUES(' + connection.escape(car_num) + ',' + connection.escape(phone_num) +  ',' + connection.escape(hours) + ',' + connection.escape(minutes)  + ','+ connection.escape(false) + ','+ connection.escape(0) + ')', function(err,row,columns){
     if(!err) {
       console.log('entered succesfully');     		
	}
	else throw(err);
	});
    
    
});

router.get('/', function(req,res) {

 connection.query('SELECT * FROM user_req where assigned=false' ,function(err,row,fields){
     var obj = {};
     for (i =0; i<row.length; i++)
     {
     	obj[i]=row[i];
     }
  res.json(obj);
  console.log(obj);
     });

}); 

router.get('/locker_status', function(req,res){

	connection.query('SELECT * FROM user_id', function(err,row,fields){
		var obj = {};
		for( i=0; i<row.length; i++)
		{
			obj[i]=row[i];
		}
     res.json(obj);  	
	});
});
module.exports = router;