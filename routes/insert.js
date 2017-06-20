var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var http = require('http');
var multer  = require('multer');
var path = require('path');

var storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, new Date().toString().substr(0,24))
  }
})

var upload = multer({ storage: storage })

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'cat@03$01$98',
  database : 'DR_list'
	});




router.get('/:car_num/:id_lock/:latitude/:longitude/:id_locker', function(req, res) {
	var car_num = req.params.car_num;
	var id_lock = req.params.id_lock;
	var latitude = req.params.latitude;
	var longitude = req.params.longitude; 
	var id_locker = req.params.id_locker; 
	 var timestamp = new Date(); 
	 var hours =  timestamp.getHours();
	 var minutes = timestamp.getMinutes();
	// var seconds = timestam.getSeconds();
	 console.log('entering into insert route');
     console.log(hours);
     console.log(minutes);
 //    console.log(seconds);
	connection.query('INSERT INTO parkaway VALUES(' + connection.escape(car_num) + ',' + connection.escape(id_lock) + ',' + connection.escape(latitude)+ ',' + connection.escape(longitude)+ ',' + connection.escape(hours) + ',' + connection.escape(minutes)  + ','+ connection.escape(false) + ','+ connection.escape(0) + ')', function(err,row,columns){
     if(!err) {
       console.log('entered succesfully');     		
	}
	else throw(err);
	});
    
    connection.query('SELECT * from lock_admin where lock_id=' +connection.escape(id_lock), function(err1,row1,column1){
    	if(!err1){
    		if(row1[0].lock_open==1)
    			availability = 'AVAILABLE';
    		else 
    			availability = 'NOT AVAILABLE';
    	}
    
    if ( availability =='AVAILABLE') {
    connection.query('UPDATE lock_admin set lock_open=false where lock_id = ' +connection.escape(id_lock), function(err_1,row_1,column_1){
    	if(!err_1){
    		console.log('lock status changed');
    	}
    
     

    });   	 
  
    connection.query('UPDATE user_id set locker = true, unlocker = false, locks_handled = locks_handled + 1, lock_id = ' + connection.escape(id_lock) + ' where id = ' +connection.escape(id_locker), function(err, rows, columns){
   
    if(!err){
    	console.log('updated user id table successfully');
    }   
     else throw(err);
    });

  }
    });   	
     connection.query('SELECT * FROM parkaway where car_num=' + connection.escape(car_num),function(err,row,fields){
      //var time = row[0].Hours;
      //console.log('timestamp is' + time); 
	 var obj = {
		car_num : car_num,
		id_lock: id_lock,
		id_locker: id_locker,
		available: availability
 //        //time: time
	 }
	// console.log(time);
  console.log(obj);
  res.json(obj);
     });
});

router.post('/', upload.single('file'), function(req,res,next){
    console.log('Uploade Successful ', req.file, req.body);
});


module.exports = router;