var mongoose = require("mongoose"),
passportLocalMongoose = require("passport-local-mongoose");

var userSchema = mongoose.Schema({
    username: String,
    password : String,
    courses  : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }]
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);