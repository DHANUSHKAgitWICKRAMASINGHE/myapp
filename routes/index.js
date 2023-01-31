var express = require('express');
var router = express.Router();
var connection = require('../config/connection');

/* GET home page. */
router.get('/', function(req, res, next) {
  connection.query('SELECT * FROM users',function (err,rows) {
    if(err) throw err;
    // console.log(rows);
    // res.render('index', { title: 'Welcome' });
    res.render('index', { title: 'Welcome' , users: rows });
    
  });

  
});

router.post('/addUser',function (req,res) {
  
  const userdata = {
    fname:req.body.fname,
    lname:req.body.lname,
    email:req.body.email,
    prof:req.body.prof
  };
  // console.log(userdata);
  connection.query('INSERT INTO users SET ?',userdata,function (err,result) {
    if (err) throw err;
    res.redirect('/');
    
  });
  // res.send("data inserted.");
});



router.get('/deleteUser/:Id',function (req,res) {

  var userid = req.params.Id;
  console.log(userid);
  connection.query('DELETE FROM users WHERE Id = ?',userid,function (err,rows) {

    if (err) throw err;
    res.redirect('/');
    
  });

  
});


router.get('/editUser/:Id',function (req,res) {
  
  var userid = req.params.Id;
  connection.query('SELECT * FROM users WHERE Id = ?',userid,function (err,rows) {
    if (err) throw err;

    res.render('edit',{userdata:rows});
  });
  
});

router.post('/updateUser/:Id',function (req,res) {
  var fname=req.body.fname;
  var lname=req.body.lname;
  var email=req.body.email;
  var prof=req.body.prof;

  var updateid = req.params.Id;

   connection.query('UPDATE users SET fname=?,lname=?,email=?,prof=? WHERE Id=?',[fname,lname,email,prof,updateid],function (err,respond) {
    if (err) throw err;
    res.redirect('../../');
    
  });
})



module.exports = router;
