var form = layui.form;
var layer = layui.layer;
$(function () {
    form.verify({
        nikename: function (value) {
            if (value.length > 6) {
                return '昵称长度不能超过6位数';
            }
        }
    });
    //初始化表单
    getUserInfo();

    //重置表单
    $('#btn_reset').on('click', function (e) {
        e.preventDefault();
        getUserInfo();
    });

    //提交信息
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.post('/my/userinfo', $(this).serialize(), function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            } else {
                layer.msg(res.message);
                window.parent.getUserAjax();
            }
        });
    });

});


//获取用户信息
function getUserInfo() {
    $.get('/my/userinfo', function (res) {
        if (res.status !== 0) {
            return layer.msg('获取用户信息失败');
        } else {
            form.val('form_setUserInfo', res.data);
        }
    });
}

