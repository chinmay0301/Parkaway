var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'cat@03$01$98',
  database : 'DR_list'
	});




router.get('/:id/:battery/:latitude/:longitude/:open', function(req, res) {
	var id = req.params.id;
	var battery = req.params.battery;
	var latitude = req.params.latitude;
	var longitude = req.params.longitude; 
	var open = req.params.open;  
	 var timestamp = new Date(); 
	 var hours =  timestamp.getHours();
	 var minutes = timestamp.getMinutes();
	// var seconds = timestam.getSeconds();
	 console.log('updating into lock_admin table');
     console.log(hours);
     console.log(minutes);
 //    console.log(seconds);
	connection.query('UPDATE lock_admin set lock_battery=' + connection.escape(battery) + ', ' + 'lock_latitude=' + connection.escape(latitude) + ', ' + 'lock_longitude=' + connection.escape(longitude)+ ', ' + 'lock_open=' + connection.escape(open)+ ' where lock_id=' + connection.escape(id), function(err,row,columns){
     if(!err) {
       console.log('updated lock details successfully');     		
	}
	else throw(err);
	});
    
   
});

router.get('/', function(req,res) {
	  connection.query('SELECT * FROM lock_admin',function(err,row,fields){
          //console.log('timestamp is' + time); 
     //console.log(row);
    var obj ={};
    console.log(row.length); 
    console.log(row[2]);
    for (i =0; i<row.length; i++)
    {
    	var x = parseInt(i);
    	console.log(x);
    	obj[x] = {
    		battery: row[i].lock_battery,
    		id: row[i].lock_id,
    		latitude: row[i].lock_latitude,
    		longitude: row[i].lock_longitude,
    		open: row[i].lock_open 
    	}
    } 

    //console.log(obj);
	//  var obj = {
	// 	car_num : car_num,
	// 	id_lock: id_lock, 
 // //        //time: time()
	//  }
	// // console.log(time);
   res.json(obj);
    });
})
module.exports = router;