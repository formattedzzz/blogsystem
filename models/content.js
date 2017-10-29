/**
 * Created by Administrator on 2017/10/27.
 */
var mongoose = require("mongoose");

var contentschama = require("../schemas/contents");

module.exports = mongoose.model("Content",contentschama);