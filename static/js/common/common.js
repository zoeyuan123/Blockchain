/**
 * Created by echonessy on 2018/10/19.
 */
window.echo = {}
echo.ajax = echo.ajax || {};
echo.box = echo.box || {};
echo.fun = echo.fun || {};
//初始化本地cookie缓存
window.localStorage.setItem('cookie','');
//ajax封装
( function(ajax) {
    function thisAjax (tpStr, url, data, success, err,isAsync) {
        $.ajax({
            type: tpStr || 'post',
            url: url,
            data: data,
            timeout: 30000,//30秒
            cache: false,
            xhrFields: { withCredentials: true },
            async: isAsync,
            // dataType:"json",
            beforeSend: function (XHR) {
                console.log("start=="+isAsync+new Date());
                var sessionId = window.localStorage.getItem('cookie');
                if(sessionId) {
                    XHR.setRequestHeader('reqc','JSESSIONID='+sessionId);
                }
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

    ajax.callback = function (data, success) {
        if(data.sessionId) {
            window.localStorage.setItem('cookie',data.sessionId);
        }
        var this_Time = null;
        if(this_Time) {clearTimeout(this_Time)}
        if(data.reqCode == '0000') {
            success();
            return
        } else if(data.reqCode == '0001') {
            layer.msg('未登录....即将跳转首页')
            this_Time = setTimeout(function () {
                window.location.href = '/index';
            },2000)
        } else {
            layer.msg(data.msg);
            return;
        }
    }
    return ajax;
})(echo.ajax || {});

//sweetAlert封装
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

// 中间方法封装
( function(fun) {
    //识别设备执行
    fun.runMethod = function  (androidFun, iphoneFun) {
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
    //获取验证码倒计时
    fun.countDown = function (id) {
        var timeCount = null;
        var start = 60;
        if(timeCount) {window.clearInterval(timeCount);}
        timeCount = setInterval(function () {
            start--;
            if(start == 0) {
                window.clearInterval(timeCount);
                $(id).attr('disabled',false).css('color','').html('获取验证码')
            } else {
                $(id).attr('disabled',true).css('color','#C2C1C1').html(start +'s')
            }
        },1000)
    }
    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
    fun.isCardNo = function (card) {
        return (/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/).test(card);
    }
    //校验邮箱
    fun.checkEmail = function (email) {
        return (/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/).test(email);
    }
    //手机号码有误
    fun.checkPhone = function (phone){
        return (/^1(3|4|5|6|7|8|9)\d{9}$/).test(phone);
    }


    return fun;
})(echo.fun || {});


//文件写入

function writeKeyFile(alias,auth,keyJson,callback) {
    var SubData = {};
    var Url = '/writeKeyFile';
    SubData.keyJson = keyJson;
    SubData.alias = alias;
    SubData.auth = auth;
    echo.ajax.post(Url,SubData,function (res) {
        echo.ajax.callback( res,function () {
            callback();
            return;
        })
    })
}

//文件读取
function readKeyFile(alias,auth,callback) {
    var SubData = {};
    var Url = '/readKeyFile';
    SubData.alias = alias;
    SubData.auth = auth;
    echo.ajax.post(Url,SubData,function (res) {
        echo.ajax.callback( res,function () {
            callback();
            return;
        })
    })
}
