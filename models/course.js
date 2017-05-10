var mongoose = require("mongoose");

var courseSchema = mongoose.Schema({
    name: String,
    units: Number,
    grade: String
});

module.exports = mongoose.model("Course", courseSchema);