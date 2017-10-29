/**
 * Created by Administrator on 2017/10/24.
 */
var mongoose = require("mongoose");

var userschama = require("../schemas/users");

module.exports = mongoose.model("User",userschama);
