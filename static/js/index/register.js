/**
 * Created by Echonessy on 2018/12/18.
 */
$(function () {
    var loader = null;
    //检测手机号是否存在
    function checkPhoneExist(phone,callback) {
        var Url = '/checkPhoneExist';
        var SubData = {}
        SubData.phone = phone;
        echo.ajax.post(Url,SubData,function (res) {
            echo.ajax.callback(res,function () {
                var isExist = res.data.isExist;
                //存在
                if(isExist) {
                    layer.msg('用户已存在');
                    return
                } else {
                    callback();
                    return
                }
            })
        })
    }
    //获取注册验证码Ajax
    function registeredVerifyCode(phone) {
        var Url = '/registeredVerifyCode';
        var SubData = {}
        SubData.phone = phone;
        echo.ajax.post(Url,SubData,function (res) {
            echo.ajax.callback(res,function () {
                layer.msg('短信已发送');
            })
        })
    }
    //事件集合
    clickEvt();
    function clickEvt() {
        //手机号用户名同步
        $('#phone').on('input',function () {
            $("#alias").val($(this).val())
        })
        //手机号格式校验
        $("#phone").on('blur',function () {
            if(!echo.fun.checkPhone($(this).val())&& $(this).val()) {
                $(this).val('');
                layer.msg('手机号码格式错误，请重新输入');
                return
            }
        })
        //创建公钥私钥
        $('#creat_Key').on('click',function () {
            var auth = $("#auth").val();
            var alias = $("#alias").val();
            if(!auth) {
                layer.msg('请输入密码');
                return
            }
            if(!alias) {
                layer.msg('请输入手机号');
                return
            }
            loader = layer.load(1, {shade: [0.1,'#fff']});
            createKeyAuth(alias,auth)
        })
        // 注册
        $("#registerBtn").on('click',function () {
            registerBefore()
        })
    }
    //创建私钥公钥
    function createKeyAuth(alias,auth) {
        var creData = {alias: alias, auth};
        createKey(creData).then(res => {
            writeKeyFile(alias,auth,res.data,function () {
                $("#keyData").val(res.data);
                var reqData = JSON.parse(res.data);
                var xpub = reqData.xpub;
                $("#publicKeys").html(xpub);
                layer.close(loader);
            })
        }).catch(err => {
            layer.msg(err)
        });
    }
    // 注册前检测
    function registerBefore() {
        var name = $('#name').val();//姓名
        var phone = $('#phone').val();//手机号
        var idCard = $('#idCard').val();//身份证号
        var verifyCode = $('#verifyCode').val();//短信验证码
        var memberImg = $('#memberImg').val();//本人照片地址
        var idCardFrontImg = $('#idCardFrontImg').val();//身份证正面图片地址
        var idCardBackImg = $('#idCardBackImg').val();//身份证反面图片地址
        var publicKeys = $('#publicKeys').html();//公钥
        if(!name) {layer.msg('请输入姓名');return;}
        if(!idCard) {layer.msg('请输入身份证号');return;}
        if(!echo.fun.isCardNo(idCard)) {$('#idCard').val('');layer.msg('身份证格式错误，请重新输入');return;}
        if(!phone) {layer.msg('请输入手机号');return;}
        if(!echo.fun.checkPhone(phone)) {$('#phone').val('');layer.msg('手机号码格式错误，请重新输入');return;}
        if(!verifyCode) {layer.msg('请输入短信验证码');return;}
        if(!memberImg) {layer.msg('请上传本人照片');return;}
        if(!idCardFrontImg) {layer.msg('请上传身份证正面图片');return;}
        if(!idCardBackImg) {layer.msg('请上传身份证反面图片');return;}
        if(!publicKeys) {layer.msg('请获取公钥');return;}
        registeredAjax();
    }
    //注册
    function registeredAjax() {
        var Url = '/registered';
        var SubData = {}
        SubData.name = $('#name').val();//姓名
        SubData.phone = $('#phone').val();//手机号
        SubData.idCard = $('#idCard').val();//身份证号
        SubData.verifyCode = $('#verifyCode').val();//短信验证码
        SubData.memberImg = $('#memberImg').val();//本人照片地址
        SubData.idCardFrontImg = $('#idCardFrontImg').val();//身份证正面图片地址
        SubData.idCardBackImg = $('#idCardBackImg').val();//身份证反面图片地址
        SubData.publicKeys = $('#publicKeys').html();//公钥
        echo.ajax.post(Url,SubData,function (res) {
            echo.ajax.callback(res,function () {
                layer.msg('注册成功');
                window.location.href = '/index'
            });
        })
    }







//创建签名
    function createSignMessage(signData) {
        signMessage(signData).then(r =>{
            console.log(r)
            $('#signMessage').html(r.data)
            echo.box.close();
        }).catch(err => {
            echo.box.alert(err)
        })
    }

})

