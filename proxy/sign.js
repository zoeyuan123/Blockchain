/**
 * Created by Echonessy on 2018/12/20.
 */
var path = require('path');
var common = require("./common");


// 增加草稿合同
module.exports.contractAddDraft = function (data,req) {
    var url = config.javaServerUrl;
    var reqUrl=url+'/contract/addDraft';
    return common.postMethod(reqUrl,data,req);
};
// 修改草稿合同,只能修改合同文件地址
module.exports.contractUpdateDraft = function (data,req) {
    var url = config.javaServerUrl;
    var reqUrl=url+'/contract/updateDraft';
    return common.postMethod(reqUrl,data,req);
};
// 获取合同签约短信验证码
module.exports.contractSigningVerifyCode = function (data,req) {
    var url = config.javaServerUrl;
    var reqUrl=url+'/contract/signingVerifyCode';
    return common.postMethod(reqUrl,data,req);
};
// 发起签署
module.exports.contractInitiateSigning = function (data,req) {
    var url = config.javaServerUrl;
    var reqUrl=url+'/contract/initiateSigning';
    return common.postMethod(reqUrl,data,req);
};
// 同意或拒绝签署
module.exports.contractSigning = function (data,req) {
    var url = config.javaServerUrl;
    var reqUrl=url+'/contract/signing';
    return common.postMethod(reqUrl,data,req);
};





