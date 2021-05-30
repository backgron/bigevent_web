$(function () {
    //点击去注册按钮
    $('#link_reg').on('click', function () {
        $('.login-main').hide();
        $('.reg-main').show();
    });
    //点击去登陆按钮
    $('#link_login').on('click', function () {
        $('.login-main').show();
        $('.reg-main').hide();
    });

    //注册layer 
    var layer = layui.layer;
    //点击注册，发送Ajax请求
    $('#btn_reg').on('click', function (e) {
        e.preventDefault();
        $.post('http://api-breakingnews-web.itheima.net/api/reguser', $('.form_reg').serialize(), function (res) {
            if (res.status !== 0) {
                layer.msg(res.message);
            } else {
                layer.msg('注册成功，请登录');
                $('#link_login').click();
            }
        });
    });
    //点击登录，发送Ajax请求
    $('#btn_login').on('click', function (e) {
        e.preventDefault();
        $.post('http://api-breakingnews-web.itheima.net/api/login', $('.from_login').serialize(), function (res) {
            if (res.status !== 0) {
                layer.msg(res.message);
            } else {
                layer.msg(res.message);
                localStorage.setItem("token", res.token);
                window.location.href = "../index.html";
            }
        });
    });
});

//从layui中提取form对象
var form = layui.form;
form.verify({
    pwd: [
        /^[\S]{6,12}$/,
        '密码必须6-12位且不能出现空格！'
    ],
    repwd: function (value) {
        var pwd = $('.reg-main [name=password]').val();
        if (value !== pwd) {
            return '两次密码输入不一致';
        }
    }

});
