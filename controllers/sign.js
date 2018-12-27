/**
 * Created by Echonessy on 2018/10/19.
 */
const common = require("./common");
const sign = require('../proxy/sign');
const responseHelper = require('../common/response_helper');

//增加草稿合同
exports.contractAddDraft = function (req, res) {
    let reqData = req.body;
    sign.contractAddDraft(reqData ,req).then(function (data) {
        return res.json(data);
    }).catch(function (e) {
        return responseHelper.serverExceptionTip(res, e.message);
    });
};
//修改草稿合同,只能修改合同文件地址
exports.contractUpdateDraft = function (req, res) {
    let reqData = req.body;
    sign.contractUpdateDraft(reqData ,req).then(function (data) {
        return res.json(data);
    }).catch(function (e) {
        return responseHelper.serverExceptionTip(res, e.message);
    });
};
//获取合同签约短信验证码
exports.contractSigningVerifyCode = function (req, res) {
    let reqData = req.body;
    sign.contractSigningVerifyCode(reqData ,req).then(function (data) {
        return res.json(data);
    }).catch(function (e) {
        return responseHelper.serverExceptionTip(res, e.message);
    });
};
//发起签署
exports.contractInitiateSigning = function (req, res) {
    let reqData = req.body;
    sign.contractInitiateSigning(reqData ,req).then(function (data) {
        return res.json(data);
    }).catch(function (e) {
        return responseHelper.serverExceptionTip(res, e.message);
    });
};
//同意或拒绝签署
exports.contractSigning = function (req, res) {
    let reqData = req.body;
    sign.contractSigning(reqData ,req).then(function (data) {
        return res.json(data);
    }).catch(function (e) {
        return responseHelper.serverExceptionTip(res, e.message);
    });
};//同意或拒绝签署列表
exports.contractSimpleInfo = function (req, res) {
    let reqData = req.body;
    sign.contractSimpleInfo(reqData ,req).then(function (data) {
        return res.json(data);
    }).catch(function (e) {
        return responseHelper.serverExceptionTip(res, e.message);
    });
};
