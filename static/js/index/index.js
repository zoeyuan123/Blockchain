/**
 * Created by Echonessy on 2018/12/18.
 */
$(function () {
    // 初始化
    init()
    function init() {
        isLogin();
    }
    //校验是否登录过
    function isLogin() {
        var Url = '/isLogin';
        echo.ajax.post(Url,null,function (res) {
            echo.ajax.callback(res,function () {
                var isLogin = res.data.isLogin;

            })
            console.log(res)
        })
    }
})