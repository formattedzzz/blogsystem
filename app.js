/**
 * Created by Administrator on 2017/10/24.
 */
    //加载express模块
var express = require("express");
//加载swig模块
var swig = require("swig");
var User = require("./models/user");
//加载mongoose数据库，这个中间件是nodejs与mongoDB数据库的桥梁
var mongoose = require("mongoose");
var Cookies = require('cookies');
//创建一个新的服务器，相当于httpcreateServer
var app = express();

//静态文件资源托管的，js css img等
app.use("/public",express.static( __dirname+"/public"));

//定义应用使用的模板引擎，第一个参数：所要渲染模板文件的后缀，也是模板引擎的名称，第二个参数：渲染的方法
app.engine("html",swig.renderFile);
//定义模板文件存放的路径，第一个参数必须是views，这是模块内指定的解析字段，第二个参数为路径：./表示根目录
app.set("views","./views");
//注册使用模板引擎；第一个参数不能变，第二个参数和上面的html一致
app.set("view engine","html");
//设置完就可以直接在res中渲染html文件了：res.render("index.html",{要渲染的变量})第一个参数是相对于views文件夹

//在开发过程中要取消模板缓存，便于调试
swig.setDefaults({cache : false});

//var User = require("./models/user");

//加载bodyparser模块，用来解析前端提交过来的数据
var bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({extended:true}));



app.use( function(req, res, next) {
    req.cookies = new Cookies(req, res);

    req.userInfo = {};
    if(req.cookies.get('userInfo')){
        var str1 = req.cookies.get('userInfo');
        req.userInfo=JSON.parse(str1);
        User.findById(req.userInfo._id).then(function(userInfodata){
            req.userInfo.isadmin = Boolean(userInfodata.isadmin);
        });
    }
    next();

} );


//分模块开发，便于管理，分为前台展示模块，后台管理模块及逻辑接口模块
app.use("/admin" ,require("./routers/admin"));
app.use("/" ,require("./routers/main"));
app.use("/api" ,require("./routers/api"));






//mongoose.connect("mongodb://localhost:27017/myBlog",function(err){
//    if (err){
//        console.log("数据库链接失败！");
//    }else {
//        console.log("数据库链接成功！");
//        app.listen(8888);
//    }
//});

mongoose.connect("mongodb://localhost:27017/myBlog");
var db = mongoose.connection;
db.once("open", function () {
    console.log("Mongo Connected");
    app.listen(8888);
});
db.on("error", console.error.bind(console, "Mongoose Connection Error"));
