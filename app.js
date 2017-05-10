var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var Course = require("./models/course");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var User = require("./models/user");

var gradeMapping = {
    'A+': 4.0,
    'A' : 4.0,
    'A-': 3.7,
    'B+': 3.3,
    'B' : 3.0,
    'B-': 2.7,
    'C+': 2.3,
    'C' : 2.0,
    'C-': 1.7,
    'D+': 1.3,
    'D' : 1.0,
    'D-': .7,
    'F' : 0.0
};

// connect to the DB
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/gpa");
// Course.remove({}, function(err) {
//     if (err) {
//         console.log(err);
//     }
// });

// mounts middleware 
app.use(bodyParser.urlencoded({extended: "true"}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
//app.use(methodOverride("_method"));

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once upon a midnight dreary, while I wondered, weak and weary.",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});


// GUEST ROUTES
app.get("/calculate/guest",function(req, res) {
    res.render("guest");
});




// CALCULATE ROUTES
app.get("/", function(req, res) {
   res.render("main"); //render main.ejs in views. 
});

app.get("/calculate", isLoggedIn, function(req, res) {
    // find the user by the user id that is logged in, then render the page
    // with that user's information.
     User.findById(req.user.id).populate("courses").exec(function(err, foundUser) {
      if (err) {
            console.log(err);
        } else {
            //console.log(foundUser)
            res.render("calc", {user: foundUser, grades: gradeMapping});
        }
    });
});

app.post("/calculate", isLoggedIn, function(req, res) {
    //console.log(req.body.course);
    var newCourse = new Course(req.body.course);
    //console.log(newCourse);
    if (req.body.course['name'] === '') {
        res.redirect('/calculate');
    } else{
        
        /// TODO: associate users with an array of courses, push each created course into the 
        // user's array, then save it to the db.
        User.findById(req.user.id, function(err, foundUser) {
            if (err) {
                console.log(err);
            } else {
                Course.create(newCourse, function(err, createdCourse) {
                    
                    // now take the created course, and push it into the user's array
                    // save this course to the db.
                    // console.log(req.body.course)
                    // createdCourse.save();
                    // push this to the current user's array of courses.
                    if (err) console.log(err);
                    else {
                        createdCourse.save();
                        foundUser.courses.push(createdCourse);
                        foundUser.save();
                        res.redirect("/calculate");
                    }
                })
               
            }
        });
    }
});

// AUTH ROUTES
app.get("/login", function(req, res) {
    res.render("login");
});

app.post("/login", passport.authenticate("local", {
        successRedirect: "/calculate",
        failureRedirect: "/login",
        
    }), function(req, res){
    }
);

// REGISTER
app.get("/register", function(req, res) {
    res.render("register");
});

//handle sign up 
app.post("/register", function(req, res) {
    var newuser = new User({username: req.body.username});
    User.register(newuser, req.body.password, function(err, createdUser){
        if(err) {
            console.log(err);
            res.render("register");
        } else {
            passport.authenticate("local")(req, res, function(){
                res.redirect("/calculate");
            });
        }
    });
    
});

app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        //console.log("no errors")
        return next();
        // render "comment" form
    }
    
    res.redirect("/login");
}

function guestUser(req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect("/calculate");
    }
    return next;
}

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("server started");
});