/**
 * Created by Echonessy on 2018/10/19.  config
 */
var path = require('path');
var common = require("./common");

//全部列表
module.exports.contractAll = function (data) {
    var url = config.javaServerUrl;
    var reqUrl=url+'/contract/all';
    return common.postMethod(reqUrl,data);
};

//待我签
module.exports.waitMineList = function (data) {
    var url = config.javaServerUrl;
    var reqUrl=url+'/contract/waitmine';
    return common.postMethod(reqUrl,data);
};

//待对方签
module.exports.waitOtherList = function (data) {
    var url = config.javaServerUrl;
    var reqUrl=url+'/contract/waitother';
    return common.postMethod(reqUrl,data);
};

//已完成
module.exports.completeList = function (data) {
    var url = config.javaServerUrl;
    var reqUrl=url+'/contract/complete';
    return common.postMethod(reqUrl,data);
};

//已拒绝
module.exports.refuseList = function (data) {
    var url = config.javaServerUrl;
    var reqUrl=url+'/contract/refuse';
    return common.postMethod(reqUrl,data);
};

//草稿箱
module.exports.draftList = function (data) {
    var url = config.javaServerUrl;
    var reqUrl=url+'/contract/draft';
    return common.postMethod(reqUrl,data);
};
//删除草稿箱
module.exports.deleteDraft = function (data) {
    var url = config.javaServerUrl;
    var reqUrl=url+'/contract/delete';
    return common.postMethod(reqUrl,data);
};



