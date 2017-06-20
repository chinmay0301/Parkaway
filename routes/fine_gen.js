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
	var car_num = req.params.test;
    var id_lock;
    var obj = {};
    var fine = 0;
    var paid; 
    connection.query('SELECT * from parkaway where car_num =' + connection.escape(car_num), function(err,row,fields){
     
     console.log(row[0]);
     id_lock = row[0].lock_id;
     paid = row[0].paid;
     var timestamp2 = new Date();
     console.log(timestamp2.getHours());
     console.log(timestamp2.getMinutes());
     if (row[0].paid==false)
     {

     fine = (timestamp2.getHours()- row[0].hours)*60 + (timestamp2.getMinutes()-row[0].minutes); 
     connection.query('UPDATE parkaway SET fine =' + connection.escape(fine) +' ' + 'WHERE car_num =' +connection.escape(car_num),function(errr,rowss,fieldss){
      if(!errr) {
      console.log(rowss + " updated fine");
      }
      
     });
     console.log('paid = false wala fine' + fine);
     }
     
     connection.query('SELECT * from parkaway where car_num =' + connection.escape(car_num), function(err,row,fields){
      
     console.log('fine is ' + fine);
     obj = {
        car_num: car_num,
        fine: row[0].fine,    
        id_lock: id_lock,
        paid: paid
        }
    res.json(obj);
    console.log(obj);
    });  
	
});

  });
module.exports = router;