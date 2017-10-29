/**
 * Created by Administrator on 2017/10/25.
 */
$(function(){
    var loginbox = $("#login");
    var registerbox = $("#register");
    var userinfobox = $("#userinfo");
    loginbox.find("a").on("click",function(){
        loginbox.hide();
        registerbox.show();
    });
    registerbox.find("a").on("click",function(){
        loginbox.show();
        registerbox.hide();
    });
    registerbox.find("input[name='submit']").on("click",function(){
        $.ajax({
            type: "post",
            url: "/api/user/register",
            dataType: "json",
            data: {
                username: registerbox.find('input[name="username"]').val(),
                password: registerbox.find('input[name="password"]').val(),
                repassword: registerbox.find('input[name="repassword"]').val()},
            success :function(result){
                console.log(result);
                registerbox.find(".warning").html(result.message);
                setTimeout(function(){
                    registerbox.find(".warning").html("");
                },1500);
                if(!result.code){
                    setTimeout(function(){
                        loginbox.show();
                        registerbox.hide();
                        registerbox.find('input[name="username"]').val("");
                        registerbox.find('input[name="password"]').val("");
                        registerbox.find('input[name="repassword"]').val("");
                    },1500);
                }
            }

        });

    });

    loginbox.find("input[name='submit']").on("click",function(){
        $.ajax({
            type: "post",
            url: "/api/user/login",
            dataType: "json",
            data: {
                username: loginbox.find('input[name="username"]').val(),
                password: loginbox.find('input[name="password"]').val()
                },
            success :function(result){
                console.log(result);
                loginbox.find(".warning").html(result.message);
                setTimeout(function(){
                    loginbox.find(".warning").html("");
                },1500);
                if(!result.code){
                    setTimeout(function(){
                        window.location.reload();
                    },1500);
                }
            }

        });

    });
    userinfobox.find(".logout").on("click",function(){

        $.ajax({
            url:"/api/user/logout",
            success:function(result){
                console.log(result);
                if(!result.code){
                    window.location.reload();
                }
            }
        })

    });


//在页面加载时获取评论
    $.ajax({
        url: '/api/pinglun',
        type:"get",
        dataType:"json",
        data: {
            contentid: $('#contentid').val()
        },
        success: function(result) {
            //console.log(111111);
            render(result.postdata);
            quanju=result.postdata;
        }
    });

//提交评论
    $("#addcomment").on("click",function(){

        $.ajax({
            type:"post",
            url:"/api/comment",
            dataType:"json",
            data:{
                comment: $("#comment").find("textarea").val(),
                contentid: $("#contentid").val()
            },
            success:function(result){
                //console.log(result);
                $("#commentarea").val("");
                render(result.postdata);
                quanju=result.postdata;
            }
        })
    });
    var quanju=null;
    var page=1;
    var limit=3;
    var pagecount=0;

    $("#prevpage").on("click",function(){
       page--;
        render(quanju);
    });
    $("#nextpage").on("click",function(){
        page++;
        render(quanju);
    });

    function render(data) {
        var str = "";
        var start=(page-1)*limit;
        var end = start+limit;
        var comments=data.comment.reverse();
        var showcomments=comments.slice(start,end);
        pagecount = Math.ceil(data.comment.length/limit);
        page = Math.min(pagecount,page);
        page = Math.max(1,page);

        $("#totalpage").html(pagecount);
        $("#currentpage").html(page);

        $("#commentCount").html(comments.length);
        for (var i = 0; i < showcomments.length; i++) {
            str += `<div>
                <span class="commenter">${showcomments[i].user}</span>
                <span class="commenttime">${formatDate(showcomments[i].time)}</span>
                </div>
                <p class="contents">${showcomments[i].comment}</p>`;
        }
        $("#commentlist").html(str);
    }

    function formatDate(d) {
        var date1 = new Date(d);
        return date1.getFullYear() + '-' + (date1.getMonth()+1) + '-' + date1.getDate() + '- ' + date1.getHours() + ':' + date1.getMinutes() + ':' + date1.getSeconds();
    }


});