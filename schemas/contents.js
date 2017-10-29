/**
 * Created by Administrator on 2017/10/27.
 */
var mongoose = require("mongoose");

module.exports = new mongoose.Schema({
    title: String,
    category : {
        type:mongoose.Schema.Types.ObjectId,
        ref : "Category"
    },
    composition:{
        type: String,
        default : ""
    },
    description :{
        type: String,
        default : ""
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    num:{
        type:Number,
        dafault:0
    },
    addtime:{
        type:Date,
        default: new Date()
    },
    comment:{
        type:Array,
        default:[]
    }
});