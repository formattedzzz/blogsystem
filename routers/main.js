/**
 * Created by Administrator on 2017/10/24.
 */
var express = require("express");
//var swig = require("swig");
var router= express.Router();
var Category = require("../models/category");
var Content = require("../models/content");

var data;

//处理通用的数据,首页，分类页，每篇文章详情页均需要的变量
router.use(function (req, res, next) {
    data = {
        userInfo: req.userInfo,
        categories: []
    };

    Category.find().then(function(categories) {
        data.categories = categories;
        next();
    });
});

//渲染首页
router.get("/", function(req, res) {

    data.category = req.query.category ||"";
    data.count = 0;
    data.page = Number(req.query.page || 1);
    data.limit = 2;
    data.pages = 0;

    var where = {};
    if (data.category) {
        where.category = data.category
    }

    Content.where(where).count().then(function(count) {

        data.count = count;
        //计算总页数
        data.pages = Math.ceil(data.count / data.limit);
        //取值不能超过pages
        data.page = Math.min( data.page, data.pages );
        //取值不能小于1
        data.page = Math.max( data.page, 1 );

        var skip = (data.page - 1) * data.limit;

        return Content.where(where).find().limit(data.limit).skip(skip).populate(['category', 'user']).sort({
            addtime:-1
        });

    }).then(function(contents) {
        data.contents = contents;
        //console.log(data);
        res.render('main/index', data);
    })
});
//进入详细阅读部分

router.get("/view",function(req,res){
    var id = req.query.contentid||"";
    Content.findOne({_id:id}).populate(["category","user"]).then(function(content){
        data.contents = content;
        content.num++;
        content.save();
        //console.log(data);
        res.render("main/view",data);
    });
});


module.exports = router;