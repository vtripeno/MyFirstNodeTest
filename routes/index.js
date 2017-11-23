var express = require('express');
var router = express.Router();

var db = require("../db");
var Users = db.Mongoose.model("usercollection", db.UserSchema, "usercollection");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/userlist", function(req, res) {
  Users.find({}).lean().exec(
    function(error, docs) {
      res.render("userlist", {"userlist": docs})
    }
  )
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
  res.render('newuser', { title: 'Add New User' });
});


router.post("/adduser", function(req, res) {
  var userName = req.body.username;
  var userEmail = req.body.email;

  var user = new Users({"username" : userName, "email" : userEmail});
  user.save(function(err) {
     if(err) {
       console.log("Error " + err.message);
       return err;
     } else {
       console.log("Post saved");
       res.redirect("userlist");
     }
  });
});

module.exports = router;
