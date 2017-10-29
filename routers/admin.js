/**
 * Created by Administrator on 2017/10/24.
 */
var express = require("express");

var router = express.Router();
var User = require("../models/user");
var Category = require("../models/category");
var Content = require("../models/content");

router.get("/",function(req,res){

    res.render("admin/index",{userInfo:req.userInfo});

});

router.get("/user",function(req,res){

    var page = Number(req.query.page||1);
    var limit = 8;
    var skip = (page-1)*limit;
    var total;
    var counts;
    User.count().then(function(count){
        total = Math.ceil(count/limit);
        page = Math.max(1,page);
        page = Math.min(page,total);
        counts = count;
    });
    User.find().limit(limit).skip(skip).then(function(users){

        res.render("admin/userindex",{
            userInfo:req.userInfo,
            users:users,
            page:page,
            total:total,
            counts:counts
        })
    });

});

router.get("/category",function(req,res){
    Category.find().sort({_id:-1}).then(function(categories){
        res.render("admin/category",{
            userInfo:req.userInfo,
            categories:categories
        });
    });


});
router.get("/category/add",function(req,res){

    res.render("admin/addcategory",{userInfo:req.userInfo});

});
router.post("/category/add",function(req,res){

    var name =req.body.name||"";
    //console.log(name);
    if(name==""){
        res.render("admin/error",{userInfo:req.userInfo});
    }
    else{
        Category.findOne({name:name},function(err,info){
            if(err){
                console.log(err);
            }
            if(info){

                res.render("admin/error",{userInfo:req.userInfo});
                return false;
            }
            var newcate = new Category({
                name:name
            });
            newcate.save();
            res.render("admin/success",{userInfo:req.userInfo});

        });
    }
});

router.get("/category/edit",function(req,res){
    var cateid = req.query.id||"";
    Category.find({id:cateid}).then(function(cateinfo){
        res.render("admin/categoryedit",{
            userInfo:req.userInfo ,
            name:cateinfo.name
        });
    });

});

router.post("/category/edit",function(req,res){
    var name =req.body.name||"";
    var id = req.query.id||"";

    if(name==""){
        res.render("admin/error",{userInfo:req.userInfo});
        return false;
    }else{
        Category.findOne({_id:id},function(err,info){
            if(err){
                console.log(err);
            }
            if(info){
                console.log(info);
                info.name = name;
                info.save();
                res.render("admin/success",{userInfo:req.userInfo});
            }

        });
    }
});

router.get("/category/delete",function(req,res){
        var id = req.query.id||"";
        //console.log(id);
        res.render("admin/confirm",{
            userInfo:req.userInfo,
            id:id
        });
});
router.post("/category/delete",function(req,res){
    var id = req.query.id||"";
    //console.log(id);
    Category.remove({_id:id}).then(function(){
        res.render("admin/success",{
            userInfo:req.userInfo
        });
    });

});

router.get("/content",function(req,res){
    Content.find().populate(["category","user"]).sort({_id:-1}).then(function(contents){
        //console.log(contents);
        res.render("admin/content",{
            userInfo:req.userInfo,
            contents:contents
        });
    });

});

router.get("/content/add",function(req,res){
    var cate=null;
    Category.find().then(function(categories){
        cate = categories;
        res.render("admin/addcontent",{
            userInfo:req.userInfo,
            categories :cate
        });
    });

});
router.post("/content/add",function(req,res){

    var title = req.body.name||"";
    var category = req.body.category||"";
    var description = req.body.description||"";
    var content = req.body.content||"";
    if(title==""||category==""||description==""||content==""){
        res.render("admin/addok",{
            userInfo:req.userInfo,
            message:"这都填不好，你发个锤子啊！"
        });
        return false;
    }else {
        var newcontent = new Content({
            title:title,
            category:category,
            description:description,
            composition:content,
            addtime:new Date(),
            num:0,
            user :req.userInfo._id.toString()
        });
        newcontent.save();
        res.render("admin/addok",{
            userInfo:req.userInfo,
            message : "ok!更博成功"
        });
    }

});

router.get("/content/edit",function(req,res){
    var cate=null;
    var id = req.query.id||"";
    Category.find().then(function(categories){
        cate = categories;
    });

    Content.findOne({_id:id}).populate("category").then(function(info){
        //console.log(info);
        res.render("admin/editcontent",{
            userInfo:req.userInfo,
            info :info,
            categories:cate
        });
    });

});
router.post("/content/edit",function(req,res){
    var id = req.query.id||"";
    var title = req.body.name||"";
    var category = req.body.category||"";
    var description = req.body.description||"";
    var content = req.body.content||"";
    if(title==""||category==""||description==""||content==""){
        res.render("admin/addok",{
            userInfo:req.userInfo,
            message:"你这样改还不如直接删了！"
        });
        return false;
    }else {
        Content.update({_id:id},{
            title : title,
            category: category,
            description : description,
            content : content,
            addtime:new Date(),
            num:0,
            user :req.userInfo._id.toString()
        }).then(function(){
            res.render("admin/addok",{
                userInfo:req.userInfo,
                message : "ok!修改成功"
            });
        });

    }

});

router.get("/content/delete",function(req,res){
    var id = req.query.id||"";
    //console.log(id);
    res.render("admin/confirm2",{
        userInfo:req.userInfo,
        id:id
    });
});
router.post("/content/delete",function(req,res){
    var id = req.query.id||"";
    //console.log(id);
    Content.remove({_id:id}).then(function(){
        res.render("admin/addok",{
            userInfo:req.userInfo,
            message : "ok！删除成功"
        });
    });

});


module.exports = router;