/**
 * Created by Echonessy on 2018/12/18.
 */
$(function () {
    // 初始化
    init()
    function init() {
        isLogin();
        clickEvt();
    }

    //校验是否登录过
    function isLogin() {
        var Url = '/isLogin';
        echo.ajax.post(Url,null,function (res) {
            echo.ajax.callback(res,function () {
                var isLogin = res.data.isLogin;
                if(!isLogin) {
                    $('#loginMain').css('display','block');
                } else {
                    $('#loginMain').css('display','none');
                }
            })
        })
    }
    //事件集合
    function clickEvt() {
    //     获取登录验证码
        $("#getVerifyCode").on('click',function () {
            var phone = $("#phone").val();
            if(!phone) {
                layer.msg('请输入手机号');
                return
            }
            if(!echo.fun.checkPhone(phone)) {
                layer.msg('手机号码格式错误，请重新输入');
                return
            }
            echo.fun.countDown(this); //倒计时
            loginVerifyCode(phone); // 获取登录验证码Ajax
        })
    //    登录
        $("#login").on('click',function () {
            var phone = $("#phone").val();
            var verifyCode = $("#verifyCode").val();
            if(!phone) {
                layer.msg('请输入手机号');
                return
            }
            if(!echo.fun.checkPhone(phone)) {
                layer.msg('手机号码格式错误，请重新输入');
                return
            }
            if(!verifyCode) {
                layer.msg('请输入验证码');
                return
            }
            loginAjax(phone,verifyCode);
        });
    }
    //获取登录验证码Ajax
    function loginVerifyCode(phone) {
        var Url = '/loginVerifyCode';
        var SubData = {}
        SubData.phone = phone;
        echo.ajax.post(Url,SubData,function (res) {
            echo.ajax.callback(res,function () {
                console.log(res)
                layer.msg('短信已发送');
            })
        })
    }
    //登录
    function loginAjax(phone,verifyCode) {
        var Url = '/login';
        var SubData = {}
        SubData.phone = phone;
        SubData.verifyCode = verifyCode;
        echo.ajax.post(Url,SubData,function (res) {
            echo.ajax.callback(res,function () {
                layer.msg('登录成功');
                $('#loginMain').stop(true).fadeOut(200);
            })
        })
    }




})