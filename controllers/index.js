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




