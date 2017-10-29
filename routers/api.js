/**
 * Created by Administrator on 2017/10/24.
 */

var express = require("express");
var User = require("../models/user");
var Content = require("../models/content");
var router= express.Router();

//统一返回给前端的数据格式
var resdata;
router.use(function(req,res,next){
    resdata = {
        code:0,
        message:""
    };
    next();
});


router.post("/user/register",function(req ,res ){
    var username = req.body.username;
    var password = req.body.password;
    var repassword = req.body.repassword;


    if(username == ""){
        resdata.code=1;
        resdata.message="用户名不能为空！";
        res.json(resdata);
        return;
    }
    if(password == ""){
        resdata.code=2;
        resdata.message="密码不能为空！";
        res.json(resdata);
        return;
    }
    if(password != repassword){
        resdata.code=3;
        resdata.message="两次输入的密码不一致！";
        res.json(resdata);
        return;
    }
    User.findOne({
        username:username
    },function(err,userinfo){
        if(err){
            console.log(err);
        }
        if(userinfo){
            resdata.code = 4;
            resdata.message = "该用户已被注册！";
            res.json(resdata);
            return false;
        }else{
            var newuser = new User({
                username: username,
                password: password
            });
            newuser.save();
            resdata.message = "注册成功！";
            res.json(resdata);
        }
    });

});

router.post("/user/login",function(req ,res ){
    var username = req.body.username;
    var password = req.body.password;

    if(username == ""||password==""){
        resdata.code=1;
        resdata.message="用户名和密码不能为空！";
        res.json(resdata);
        return;
    }

    User.findOne({
        username:username,
        password:password
    },function(err,userinfo){
        if(err){
            console.log(err);
        }
        if(!userinfo){
            resdata.code = 2;
            resdata.message = "用户名或密码错误！";
            res.json(resdata);
            return false;
        }
        resdata.message = "登录成功！";
        resdata.userinfo={
            id:userinfo._id ,
            username:userinfo.username
        };

        req.cookies.set('userInfo', JSON.stringify({
            "_id": userinfo._id,
            "username": userinfo.username
        }));

        res.json(resdata);

    })

});

router.get("/user/logout",function(req ,res ){
    req.cookies.set('userInfo', null);
    res.message="退出成功！";
    res.json(resdata);
});


router.get('/pinglun', function(req, res) {
    var contentid = req.query.contentid || '';
    Content.findOne({
        _id: contentid
    }).then(function(content) {
        //content.comment.reverse();
        resdata.postdata = content;
        //resdata.data.comments.reverse();
        res.json(resdata);
    })
});

router.post("/comment",function(req,res){
    var id = req.body.contentid;
    var commentdata={
        comment:req.body.comment||"",
        user:req.userInfo.username,
        time: new Date()
    };

    Content.findOne({_id:id}).then(function(thiscon){
        if(commentdata.comment!=""){
            thiscon.comment.push(commentdata);
        }
        //thiscon.comment.reverse();
        thiscon.save().then(function(newcon){
            resdata.postdata = newcon;
            resdata.message="评论成功！";
            res.json(resdata);
            //console.log(newcon);
        });

    });

});



module.exports=router;