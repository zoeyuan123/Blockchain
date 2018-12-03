/**
 * Created by Echonessy on 2018/10/19.  config
 */
var path = require('path');
var common = require("./common");

module.exports.test = function (data) {
    var url = config.javaServerUrl;
    var reqUrl=url+'后台URL';
    return common.postMethod(reqUrl,data);
};
