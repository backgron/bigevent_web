$.ajaxPrefilter(function (options) {
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;

    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        };
    }

    options.complete = function (res) {
        if (res.responseJSON.status === 1) {
            //强制清空token
            localStorage.removeItem('token');
            //跳转到登录页面
            location.href = 'login.html';
        }
    };

});