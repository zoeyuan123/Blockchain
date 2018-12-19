/**
 * Created by Echonessy on 2018/12/18.
 */
$(function () {
    //检测手机号是否存在
    function checkPhoneExist(phone,callback) {
        var Url = '/checkPhoneExist';
        var SubData = {}
        SubData.phone = phone;
        echo.ajax.post(Url,SubData,function (res) {
            echo.ajax.callback(res,function () {
                var isExist = res.data.isExist;
                //存在
                if(isExist) {
                    layer.msg('用户已存在');
                    return
                } else {
                    callback();
                    return
                }
            })
        })
    }
    //获取注册验证码Ajax
    function registeredVerifyCode(phone) {
        var Url = '/registeredVerifyCode';
        var SubData = {}
        SubData.phone = phone;
        echo.ajax.post(Url,SubData,function (res) {
            echo.ajax.callback(res,function () {
                console.log(res)
                layer.msg('短信已发送');
            })
        })
    }
})

