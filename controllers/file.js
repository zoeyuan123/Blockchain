/**
 * Created by Echonessy on 2018/12/24.
 */
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const FormData = require('form-data');
//查询合同详细信息
exports.upload1 = function (req, res) {
    const { path: filePath, originalFilename } = req.files.file
    const newPath = path.join(path.dirname(filePath), originalFilename)
    fs.rename(filePath, newPath, function (err) {
        if (err) {
            return;
        }
        else {
            const file = fs.createReadStream(newPath)
            const form = new FormData()
            const meta = {
                'cookie': "JSESSIONID="+req.query.sessionId,
            };
            form.append('file', file)
            console.log(form.getHeaders(meta))
            fetch(config.javaServerUrl+'/upload/1', {
                method: "POST",
                headers: form.getHeaders(meta),
                body: form
            }) .then( response =>
                response.json()
            ).then(function (json) {
                console.log('----------------------responseData--------------------------')
                console.log(json)
                console.log('----------------------responseData--------------------------')
                return res.json(json)
            });
        }
    })
};



//上传用户信息图片
exports.upload2 = function (req, res) {
    const { path: filePath, originalFilename } = req.files.file
    const newPath = path.join(path.dirname(filePath), originalFilename)
    fs.rename(filePath, newPath, function (err) {
        if (err) {
            return;
        }
        else {
            const file = fs.createReadStream(newPath)
            const form = new FormData()
            const meta = {
                'cookie': "JSESSIONID="+req.query.sessionId,
            };
            form.append('file', file)
            var header = form.getHeaders();
            fetch(config.javaServerUrl+'/upload/2', {
                method: "POST",
                headers: form.getHeaders(meta),
                body: form
            }) .then( response =>
                response.json()
            ).then(function (json) {
                console.log('----------------------responseData--------------------------')
                console.log(json)
                console.log('----------------------responseData--------------------------')
                return res.json(json)
            });
        }
    })
};

//上传合同PDF解析成jpg图片
exports.upload3 = function (req, res) {
    const { path: filePath, originalFilename } = req.files.file
    const newPath = path.join(path.dirname(filePath), originalFilename)
    fs.rename(filePath, newPath, function (err) {
        if (err) {
            return;
        }
        else {
            const file = fs.createReadStream(newPath)
            const form = new FormData()
            const meta = {
                'cookie': "JSESSIONID="+req.query.sessionId,
            };
            form.append('file', file)
            console.log(form.getHeaders(meta))
            fetch(config.javaServerUrl+'/upload/3', {
                method: "POST",
                headers: form.getHeaders(meta),
                body: form
            }) .then( response =>
                response.json()
            ).then(function (json) {
                console.log('----------------------responseData--------------------------')
                console.log(json)

                console.log('----------------------responseData--------------------------')
                return res.json(json)
            });
        }
    })
};