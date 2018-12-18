/**
 * Created by Echonessy on 2018/10/19.
 */
const common = require("./common");
const login = require('../proxy/login');
const responseHelper = require('../common/response_helper');


//获取登陆短信验证码
exports.loginVerifyCode = function (req, res) {
    let reqData = req.body;
    login.loginVerifyCode(reqData).then(function (data) {
        console.log(data)
        var result = data.result;
        if(result == 'success') {
            return res.json(data);
        }
        return responseHelper.serverExceptionTip(res, data.ErrMsg||'');
    }).catch(function (e) {
        return responseHelper.serverExceptionTip(res, e.message);
    });
};

//登陆
exports.login = function (req, res) {
    let reqData = req.body;
    login.login(reqData).then(function (data) {
        console.log(data)
        var result = data.result;
        if(result == 'success') {
            return res.json(data);
        }
        return responseHelper.serverExceptionTip(res, data.ErrMsg||'');
    }).catch(function (e) {
        return responseHelper.serverExceptionTip(res, e.message);
    });
};

//获取注册短信验证码
exports.registeredVerifyCode = function (req, res) {
    let reqData = req.body;
    login.registeredVerifyCode(reqData).then(function (data) {
        console.log(data)
        var result = data.result;
        if(result == 'success') {
            return res.json(data);
        }
        return responseHelper.serverExceptionTip(res, data.ErrMsg||'');
    }).catch(function (e) {
        return responseHelper.serverExceptionTip(res, e.message);
    });
};

//注册
exports.registered = function (req, res) {
    let reqData = req.body;
    login.registered(reqData).then(function (data) {
        console.log(data)
        var result = data.result;
        if(result == 'success') {
            return res.json(data);
        }
        return responseHelper.serverExceptionTip(res, data.ErrMsg||'');
    }).catch(function (e) {
        return responseHelper.serverExceptionTip(res, e.message);
    });
};

//校验手机号是否存在
exports.checkPhoneExist = function (req, res) {
    let reqData = req.body;
    login.checkPhoneExist(reqData).then(function (data) {
        console.log(data)
        var result = data.result;
        if(result == 'success') {
            return res.json(data);
        }
        return responseHelper.serverExceptionTip(res, data.ErrMsg||'');
    }).catch(function (e) {
        return responseHelper.serverExceptionTip(res, e.message);
    });
};

//校验用户是否已登陆
exports.isLogin = function (req, res) {
    let reqData = req.body;
    login.isLogin(reqData).then(function (data) {
        console.log(data)
        var result = data.result;
        if(result == 'success') {
            return res.json(data);
        }
        return responseHelper.serverExceptionTip(res, data.ErrMsg||'');
    }).catch(function (e) {
        return responseHelper.serverExceptionTip(res, e.message);
    });
};


