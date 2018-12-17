/**
 * Created by Echonessy on 2018/10/19.
 */
const common = require("./common");
const manage = require('../proxy/manage');
const responseHelper = require('../common/response_helper');

//合同管理页面
exports.index = function (req, res) {
    return res.render('manage/index');
};
//全部文件
exports.contractAll = function (req, res) {
    let reqData = req.body;
    manage.contractAll(reqData).then(function (data) {
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
//待我签
exports.waitMineList = function (req, res) {
    let reqData = req.body;
    manage.waitMineList(reqData).then(function (data) {
        var result = data.result;
        if(result == 'success') {
            return res.json(data);
        }
        return responseHelper.serverExceptionTip(res, data.ErrMsg||'');
    }).catch(function (e) {
        return responseHelper.serverExceptionTip(res, e.message);
    });
};
//待对方签
exports.waitOtherList = function (req, res) {
    let reqData = req.body;
    manage.waitOtherList(reqData).then(function (data) {
        var result = data.result;
        if(result == 'success') {
            return res.json(data);
        }
        return responseHelper.serverExceptionTip(res, data.ErrMsg||'');
    }).catch(function (e) {
        return responseHelper.serverExceptionTip(res, e.message);
    });
};
//已完成
exports.completeList = function (req, res) {
    let reqData = req.body;
    manage.completeList(reqData).then(function (data) {
        var result = data.result;
        if(result == 'success') {
            return res.json(data);
        }
        return responseHelper.serverExceptionTip(res, data.ErrMsg||'');
    }).catch(function (e) {
        return responseHelper.serverExceptionTip(res, e.message);
    });
};
//已拒绝
exports.refuseList = function (req, res) {
    let reqData = req.body;
    manage.refuseList(reqData).then(function (data) {
        var result = data.result;
        if(result == 'success') {
            return res.json(data);
        }
        return responseHelper.serverExceptionTip(res, data.ErrMsg||'');
    }).catch(function (e) {
        return responseHelper.serverExceptionTip(res, e.message);
    });
};
//草稿箱
exports.draftList = function (req, res) {
    let reqData = req.body;
    manage.draftList(reqData).then(function (data) {
        var result = data.result;
        if(result == 'success') {
            return res.json(data);
        }
        return responseHelper.serverExceptionTip(res, data.ErrMsg||'');
    }).catch(function (e) {
        return responseHelper.serverExceptionTip(res, e.message);
    });
};
//删除草稿箱
exports.deleteDraft = function (req, res) {
    let reqData = req.body;

    manage.deleteDraft(reqData).then(function (data) {
        var result = data.result;
        if(result == 'success') {
            return res.json(data);
        }
        return responseHelper.serverExceptionTip(res, data.ErrMsg||'');
    }).catch(function (e) {
        return responseHelper.serverExceptionTip(res, e.message);
    });
};

