/**
 * Created by Echonessy on 2018/10/19.
 */
const common = require("./common");
const crypto = require('crypto');

//默认页面
exports.index = function (req, res) {
    return res.render('index');
};
//用户中心
exports.usercer = function (req, res) {
    return res.render('user/usercer');
};
//用户中心
exports.user = function (req, res) {
    return res.render('user/user');
};
//wasm
exports.wasm = function (req, res) {
    return res.render('wasm/index');
};

//合同签署
exports.sign = function (req, res) {
    return res.render('sign/index');
};
//同意签署结果
exports.agreesign = function (req, res) {
    return res.render('sign/agreesign');
};
//同意签署合同详情
exports.agreeinfo = function (req, res) {
    return res.render('sign/agreeinfo');
};


//拒绝签署结果
exports.refusesign = function (req, res) {
    return res.render('sign/refusesign');
};
//拒绝签署合同详情
exports.refuseinfo = function (req, res) {
    return res.render('sign/refuseinfo');
};
//保存草稿
exports.draftsign = function (req, res) {
    return res.render('sign/draftsign');
};


//合同签约步骤1
exports.signstep = function (req, res) {
    return res.render('sign/signstep');
};
//合同签约步骤2
exports.signnext = function (req, res) {
    return res.render('sign/signnext');
};


//合同管理
exports.manage = function (req, res) {
    return res.render('manage/index');
};
//wasmKey
exports.wasmKey = function (req, res) {
    let reqData = req.body;
    console.log(reqData);
    // let cryptoData = reqData.crypto;
    // let cipher = cryptoData.cipher;
    // let ciphertext = cryptoData.ciphertext;
    // let cipherparams = cryptoData.cipherparams;
    // let iv = cipherparams.iv;
    // let key = reqData.auth;
    // console.log(cipher)
    // console.log(key)
    // console.log(iv)
    // ciphertext = new Buffer(ciphertext, 'base64').toString('binary');
    // let decipher = crypto.createDecipheriv(cipher, key, iv);
    // let decoded = decipher.update(ciphertext, 'binary', 'utf8');
    // decoded += decipher.final('utf8');
    // console.log(decoded);
   return res.json(reqData)
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
//电子签章
exports.signDemo = function (req, res) {
    return res.render('demo/signDemo');
};




