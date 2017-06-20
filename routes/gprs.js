var express = require('express');
var router = express.Router();
var client = require('twilio')('AC0570f33a02132525cac87aef55bbaa32','d5c1f50d4ad27b4cb19e9116f872bc8f');

var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'cat@03$01$98',
  database : 'DR_list'
	});


router.get('/:test', function(req,res){
  var lock_num = req.params.test; 
  client.messages.create({
    to: "+91"+req.params.test,
    from: "+13344686874",
    body: "Fine has been paid, hence setting the lock free"
  }, function(err, data) {
    if(err) 
      console.log(err);
    console.log(data);
  });
 console.log('it works be');

connection.query('UPDATE lock_admin set lock_open=1 where lock_id=' + connection.escape(lock_num), function(err,row,columns){
     if(!err) {
       console.log('updated lock status');     		
	}
	else throw(err);
	});

connection.query('UPDATE parkaway set paid=true where lock_id=' + connection.escape(lock_num), function(err,row,columns){
     if(!err) {
       console.log('updated lock status');     		
	}
	else throw(err);
	});

});
//var unlocker_global_phone;
router.get('/:unlocker_id/:phone_num', function(req,res){
  var unlocker_id = req.params.unlocker_id; 
  var phone_num = req.params.phone_num; 
  var unlocker_phone_num;
connection.query('select * from user_id where id = ' + connection.escape(unlocker_id), function(err,row,fields){
 unlocker_phone_num = row[0].phone;
 //unlocker_global_phone = row[0].phone; 
 console.log(unlocker_phone_num + 'unlocker_phone');
 console.log(phone_num + 'phone_num');

 client.messages.create({
    to: "+91"+unlocker_phone_num,
    from: "+13344686874",
    body: "Hi, call this number,"+ phone_num + " and collect fine from this person within 15 mins"
  }, function(err, data) {
    if(err) 
      console.log(err);
    console.log('sms sent to unlocker' + unlocker_phone_num);
  });
});
  client.messages.create({
    to: "+91"+phone_num,
    from: "+13344686874",
    body: "Hi, call this number,"+ unlocker_phone_num + " this person is coming to collect the fine."
  }, function(err, data) {
    if(err) 
      console.log(err);
    console.log('sms sent to phone num' + phone_num);
  });
   
  connection.query('UPDATE user_req set assigned = true, unlocker_id = ' + connection.escape(unlocker_id) + ' where phone_num = '+connection.escape(phone_num), function(err,row,columns){
    if(!err){
      console.log('sent sms to requesting user');
    }
else throw(err);
  });


});

module.exports = router;