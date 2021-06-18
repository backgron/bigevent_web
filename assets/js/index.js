$(function () {
    var layer = layui.layer;
    getUserAjax();

    //点击退出
    $('#btn_logout').on('click', function () {
        //弹出提示框
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //删除token
            localStorage.removeItem('token');
            //跳转页面
            location.href = 'login.html';

            layer.close(index);
        });
    });
});

function getUserAjax() {
    //获取用户信息
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                layer.msg('获取用户信息失败');
            } else {
                // 渲染用户头像
                readerAvatar(res.data);
            }
        },
    });
}

//渲染用户头像的方法
function readerAvatar(user) {
    let name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    //渲染头像  $('.layui-nav-img');
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', res.user_pic).show();
        $('.text-avater').hide();
    } else {
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avater').html(first).show();
    }
}