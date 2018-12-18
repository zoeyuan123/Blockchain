/**
 * Created by Echonessy on 2018/12/18.
 */
var path = require('path');
var common = require("./common");

//获取登陆短信验证码
module.exports.loginVerifyCode = function (data) {
    var url = config.javaServerUrl;
    var reqUrl=url+'/member/loginVerifyCode';
    return common.postMethod(reqUrl,data);
};
//登陆
module.exports.login = function (data) {
    var url = config.javaServerUrl;
    var reqUrl=url+'/member/login';
    return common.postMethod(reqUrl,data);
};
//获取注册短信验证码
module.exports.registeredVerifyCode = function (data) {
    var url = config.javaServerUrl;
    var reqUrl=url+'/member/registeredVerifyCode';
    return common.postMethod(reqUrl,data);
};
//注册
module.exports.registered = function (data) {
    var url = config.javaServerUrl;
    var reqUrl=url+'/member/registered';
    return common.postMethod(reqUrl,data);
};
//校验手机号是否存在
module.exports.checkPhoneExist = function (data) {
    var url = config.javaServerUrl;
    var reqUrl=url+'/member/checkPhoneExist';
    return common.postMethod(reqUrl,data);
};
//校验用户是否已登陆
module.exports.isLogin = function (data) {
    var url = config.javaServerUrl;
    var reqUrl=url+'/member/isLogin';
    return common.postMethod(reqUrl,data);
};
