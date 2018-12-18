/**
 * Created by Echonessy on 2018/10/19.
 */
/**
 * Created by Echonessy on 2018/10/19.
 */
const common = require("./common");
const login = require('../proxy/login');
const responseHelper = require('../common/response_helper');

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


