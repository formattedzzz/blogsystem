/**
 * Created by Administrator on 2017/10/26.
 */
var mongoose = require("mongoose");

var categoryschama = require("../schemas/categories");

module.exports = mongoose.model("Category",categoryschama);