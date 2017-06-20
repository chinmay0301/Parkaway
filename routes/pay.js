var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'cat@03$01$98',
  database : 'DR_list'
	});

router.get('/:test/:id_unlocker', function(req,res) {
	var car_num = req.params.test;
  var id_unlocker = req.params.id_unlocker; 
  var lock_id;   
    connection.query('SELECT * from parkaway where car_num =' + connection.escape(car_num), function(err,row,column){
     lock_id = row[0].lock_id; 
    });


    connection.query('UPDATE parkaway set paid = true where car_num =' + connection.escape(car_num), function(err,row,fields){
     
     console.log(row[0]);
     //id_lock = row[0].lock_id;

     //var timestamp2 = new Date();
     //var fine = (timestamp2.getHours()- row[0].hours)*60 + (timestamp2.getMinutes()-row[0].minutes); 
     //console.log('fine is ' + fine);
    connection.query('UPDATE user_id set locker = false, unlocker = true, locks_handled = locks_handled + 1, lock_id = ' + connection.escape(lock_id) + ' where id = ' +connection.escape(id_unlocker), function(err, rows, columns){
   
    if(!err){
      console.log('updated user id table successfully');
    }   
     else throw(err);
    });
  
	 connection.query('SELECT * FROM parkaway where car_num =' + connection.escape(car_num), function(err,rows,fields){
        var lock_id = rows[0].lock_id;
        obj = {
        car_num: car_num,   
        status: "fine paid",
        id_lock: lock_id,
        unlocker: id_unlocker, 
        time: rows[0].hours + ':' + rows[0].minutes 
        }
    res.json(obj);
    console.log(obj);
	});
   

});

  });
module.exports = router;