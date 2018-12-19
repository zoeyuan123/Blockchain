/**
 * Created by Echonessy on 2018/10/19.
 */
const common = require("./common");
const crypto = require('crypto');

//默认页面
exports.index = function (req, res) {
    return res.render('index');
};
//未认证用户中心
exports.register = function (req, res) {
    return res.render('register');
};
//认证后用户中心
exports.user = function (req, res) {
    return res.render('user/user');
};
//wasm
exports.wasm = function (req, res) {
    return res.render('wasm/index');
};
/***********************主动发起合同*************************/

//合同签署第一步 设置合同及签署方
exports.appcode = function (req, res) {
    return res.render('sign/appcode/index');
};

//合同签署第一步 设置合同及签署方
exports.sign = function (req, res) {
    return res.render('sign/initiative/step1');
};
//合同签署第二步  拖拽签名
exports.signnext = function (req, res) {
    return res.render('sign/initiative/step2');
};
//保存草稿结果页
exports.draftsign = function (req, res) {
    return res.render('sign/initiative/draftsign');
};
//发起签署结果页
exports.initiatesign = function (req, res) {
    return res.render('sign/initiative/initiatesign');
};
//单边签署合同信息
exports.signinfo = function (req, res) {
    return res.render('sign/initiative/signinfo');
};


/***********************被动签署合同*************************/

//合同拖拽生成签署合同
exports.passivesign = function (req, res) {
    return res.render('sign/passivity/index');
};
//同意签署结果
exports.agreesign = function (req, res) {
    return res.render('sign/passivity/agreesign');
};
//同意签署合同详情
exports.agreeinfo = function (req, res) {
    return res.render('sign/passivity/agreeinfo');
};

//拒绝签署结果
exports.refusesign = function (req, res) {
    return res.render('sign/passivity/refusesign');
};
//拒绝签署合同详情
exports.refuseinfo = function (req, res) {
    return res.render('sign/passivity/refuseinfo');
};
//合同管理
exports.manage = function (req, res) {
    return res.render('manage/index');
};

//404
exports.i404 = function (req, res) {
    return res.render('error/404');
};
//403
exports.i403 = function (req, res) {
    return res.render('error/403');
};
//400
exports.i400 = function (req, res) {
    return res.render('error/400');
};
//500
exports.i500 = function (req, res) {
    return res.render('error/500');
};
//503
exports.i503 = function (req, res) {
    return res.render('error/503');
};
//电子签章Demo
exports.signDemo = function (req, res) {
    return res.render('demo/signDemo');
};




