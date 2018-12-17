/**
 * Created by echonessy on 2018/10/19.
 */
window.echo = {}
echo.ajax = echo.ajax || {};
echo.client = echo.client || {};
echo.box = echo.box || {};

( function(ajax) {
    function thisAjax (tpStr, url, data, success, err,isAsync) {
        $.ajax({
            type: tpStr || 'post',
            url: url,
            data: data,
            timeout: 30000,//30秒
            cache: false,
            async: isAsync,
            dataType:"json",
            beforeSend: function (XHR) {
                console.log("start=="+isAsync+new Date());
            },
            success: success,
            error:  function (xml, status) {
                if(xml && xml.responseText){
                    var errResult;
                    try{
                        errResult=JSON.parse(xml.responseText);
                        layer.msg(errResult.msg);
                        return;
                    }catch(e){
                        layer.msg(xml.responseText);
                        return
                    }
                }else{
                    layer.msg("请求没有响应");
                    return
                }
                err&&err(xml);
            }
        });
    };
    
    ajax.get = function  (url, data, success, error,isAsync) {
        if(isAsync == undefined || isAsync == null){
            isAsync = true;
        }
        thisAjax('get', url, data, success, error,isAsync);
    };

    ajax.post = function (url, data, success, error,isAsync) {
        if(isAsync == undefined || isAsync == null){
            isAsync = true;
        }
        thisAjax('post', url, data, success, error,isAsync);
    };
    return ajax;
})(echo.ajax || {});


( function(client) {
    //识别设备执行
    client.runMethod = function  (androidFun, iphoneFun) {
        var sUserAgent = navigator.userAgent.toLowerCase();
        var isIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
        var isAndroid = sUserAgent.match(/android/i) == "android";
        if(isAndroid) {
            return androidFun();
        } else if(isIphoneOs) {
            return iphoneFun();
        } else {
            return;
        }
    };
    return client;
})(echo.client || {});

(function (box) {
    // options参考 https://notifyjs.com/
    box.tip = function (options) {
        var defaultOpt={
            pos:"bottom-right",
            timeout: 3000,
            status:"info"
        };
        if(typeof options ==="string" ){
            var str=options;
            options={message:str};
        };

        $.notify($.extend(defaultOpt,options));
    };

    box.alert = function (text, callback) {
        if (swal) {
            swal({   title: text, type:"warning",confirmButtonText: "确定", },callback);
            return;
        }
        alert(text);
        typeof(callback) == 'function' ? callback() : undefined;
    };

    box.confirm = function (text, callback) {
        if (swal) {
            swal({
                title: text,
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "确认",
                cancelButtonText:"取消",
                closeOnConfirm: false,
                showLoaderOnConfirm: true
            },callback);
            return;
        }
        var result = confirm(text);
        typeof(callback) == 'function' ? callback(result) : undefined;
    };

    box.prompt = function (text, callback) {
        if (swal) {
            swal({
                title: text,
                type: "input",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "确认",
                cancelButtonText:"取消",
                closeOnConfirm: false,
                showLoaderOnConfirm: false
            },callback);
            return;
        }
        var result = prompt(text);
        typeof(callback) == 'function' ? callback(result) : undefined;
    };
    box.loader = function (text, callback) {
        if (swal) {
            swal({
                title: text,
                type: "info",
                showConfirmButton: false
            },callback);
            return;
        }
        var result = confirm(text);
        typeof(callback) == 'function' ? callback(result) : undefined;
    };
    box.close=function(){
        if (swal) {
            swal.close();
        }
    }

    return box;
})(echo.box || {});





