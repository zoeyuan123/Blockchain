/**
 * Created by Echonessy on 2018/12/26.
 */

$(function () {
    layui.use('layer',function () {});
    var tishi = layer.open({
        shadeClose: false,
        content: '加载合同中...'
    });
    //渲染拿到的第一步数据
    renderPreData()
    function renderPreData() {
        $('#MainBox').css('overflow-y','hidden');
        var stepInfo = JSON.parse(localStorage.getItem('stepInfo'));
        console.log(stepInfo);
        renderContact(stepInfo);
        renderBaseInfo(stepInfo)
    }
    //加载基本信息
    function renderBaseInfo(stepInfo) {
        $("#contactRemark").html(stepInfo.contactRemark).attr('title',stepInfo.contactRemark);
        $("#contactTime").html(stepInfo.contactTime).attr('title',stepInfo.contactTime);
        $("#contactName").html(stepInfo.contactName).attr('title',stepInfo.contactName);

        var signatory = stepInfo.signatory
        var Html = '';
        for(var i=0; i<signatory.length;i++) {
            var this_Data = signatory[i];
            Html += ' <li data-this_Data="'+JSON.stringify(this_Data)+'">';
            Html += '<span title="'+this_Data.name+'">'+this_Data.id+'.'+this_Data.name+'</span>';
            Html += '<span title="'+this_Data.phone+'">Tel：'+this_Data.phone+'</span>';
            Html += '</li>';
        }
       $("#intro_Signle").html(Html)
    }
    //加载合同
    function renderContact(stepInfo) {
        var contactUrl = stepInfo.contactUrl;
        console.log(contactUrl)
        var signImgHtml = '';
        for(var i=0;i<contactUrl.length;i++) {
            signImgHtml += '<img id="img_this'+i+'" src="'+contactUrl[i]+'" alt="">';
            signImgHtml += '<canvas id="canvas_this'+i+'" style="display: none;"></canvas>';
        }
        $("#ImgBoxMain").html(signImgHtml);
        var imgNum=$('#ImgBoxMain img').length;
        $('#ImgBoxMain img').load(function(){
            if(!--imgNum){
                //合并成一张图
                creatCanvasToOne()
                // creatBaseImg(contactUrl); // 如果跨域报错，打开这个方法
            }
        });
    }
    //多张合同合并成一张图
    function creatCanvasToOne() {
        var DataArr = [];
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        canvas.width = $("#ImgBoxMain").width();
        canvas.height = $("#ImgBoxMain").height();
        $.each($('#ImgBoxMain img'),function (imgi,imgobj) {
            var this_Img = $(imgobj);
            var bw = $(imgobj).width();
            var bh = $(imgobj).height();
            var signImg=new Image();
            var top = $(imgobj).position().top;
            console.log(top)
            signImg.crossOrigin = "";
            signImg.src = $(imgobj).attr('src');
            signImg.onload=function(err){
                ctx.drawImage(signImg,0,top,bw,bh);
                DataArr.push(canvas.toDataURL("image/jpeg",1));
                if(DataArr.length == $('#ImgBoxMain img').length) {
                    $("#ImgBoxMain").css('display','none');
                    $('#MainBox').css('overflow-y','auto');
                    layer.msg('加载完毕');
                    $("#showBase64").attr('src',DataArr[DataArr.length-1])
                }
            }
        })
    }
    //传入图片路径，返回base64
    function getBase64(img){
        function getBase64Image(img,width,height) {//width、height调用时传入具体像素值，控制大小 ,不传则默认图像大小
            var canvas = document.createElement("canvas");
            canvas.width = width ? width : img.width;
            canvas.height = height ? height : img.height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            var dataURL = canvas.toDataURL();
            return dataURL;
        }
        var image = new Image();
        image.crossOrigin = '';
        image.src = img;
        var deferred=$.Deferred();
        if(img){
            image.onload =function (){
                deferred.resolve(getBase64Image(image));//将base64传给done上传处理
            }
            return deferred.promise();//问题要让onload完成后再return sessionStorage['imgTest']
        }
    }
    function creatBaseImg(data) {
        var Arr = [];
        var i= 0;
        toget(i);
        function toget(i) {
            if(i==data.length) {
                return Arr;
            }
            getBase64(data[i]).then(function(base64){
                var id = 'img_this'+i;
                Arr.push(base64);
                var Dom = $("#"+id).attr('src',base64)
                i++;
                return toget(i);
            },function(err){
                console.log(err);//打印异常信息
            });
        }
    }
    // 打开获取签章
    stepEvt();
    function stepEvt() {
        $('#change_Btn').on('click',function () {
            $('#main_Evt').css('display','block');
            $('#code_Box').css('display','none');
            $('#file_Box').css('display','none');
            $('#sign_Box').css('display','none');
            $('#add_sign').stop(true).fadeIn(150);
        })
        $('#start_Sign').on('click',function () {
            $('#iden_Box').stop(true).fadeIn(150);
        })
    }
    init()
    //    初始化拖拽缩放
    function init() {
        var LeftHtml = $('#LeftBox').html();
        $( "#MainBox .drag_Box" ).resizable({
            aspectRatio: 1 / 1,
            maxHeight: 250,
            maxWidth: 350,
            minHeight: 20,
            minWidth: 20,
            ghost: true,
        });
        //删除当前签名
        $('.sing_close').on('click',function () {
            $(this).parent('.drag_Box').remove()
        })
        //拖拽
        $(".drag_Box").draggable({
            scroll: false,
            stop: function(event, ui) {
                var thisDom = ui.helper;
                var thisDomL = ui.position.left + $('#sign_Img').offset().left - $('#MainBox').offset().left;
                var thisDomT = ui.position.top +$('#MainBox').scrollTop()+  $('#sign_Img').offset().top - $('#MainBox').offset().top;
                if($(thisDom[0]).attr('data-in') != 'true') {
                    thisDom[0].style.left = thisDomL - 0 + 'px'; //1 为边框宽度
                    thisDom[0].style.top = thisDomT - 0 + 'px';//1 为边框宽度
                    $(thisDom[0]).attr('data-in','true');
                    var close = '<i class="sing_close"></i>';
                    $(thisDom[0]).append(close);
                    $('#DragBox').append($(thisDom[0]));
                    var dragSrc = $(thisDom[0]).find('img').attr('src');
                    $('#sign_Img').html(initLeftBox(dragSrc));
                }
                init();
            }
        });
    }
    //    还原左侧Dom
    function initLeftBox(dragSrc) {
        var Html = '';
        Html += '<div class="drag_Box" >';
        Html += '<img src="'+dragSrc+'"  class="" alt="">'
        Html += '</div>';
        return Html;
    }
    //    创建canvas数据坐标系
    function create(fun) {
        var arr = [];
        for(var i=0;i<$('#MainBox .drag_Box').length;i++) {
            var thisBox = $('#MainBox .drag_Box').eq(i);
            var w = thisBox.width() ? thisBox.width() : "50px";
            var h = thisBox.height() ? thisBox.height() : "50px";
            var l = thisBox.position().left ? thisBox.position().left : "0";
            var t = thisBox.position().top ? thisBox.position().top : "0";
            var thisImg = thisBox.find('img');
            var imgSrc = thisImg.attr('src');
            var obj = {};
            obj.w = w;
            obj.h = h;
            obj.l = l;
            obj.t = t;
            obj.src = imgSrc;
            arr.push(obj);
        }
        createCanvas(arr,fun)
    }
    //    合并canvas
    function createCanvas(arr,fun) {
        var DataArr = [];
        var base64 = [];
        var Arr = [];
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        var bw = $('#showBase64').width();
        var bh = $('#showBase64').height();
        canvas.width = bw;
        canvas.height = bh;
        var image=new Image();
        image.crossOrigin = '';
        image.src=$('#showBase64').attr('src');
        image.onload=function(){
            ctx.drawImage(image,0,0,bw,bh);
            console.log('加载完毕');
            $.each(arr,function (i,obj) {
                var signImg=new Image();
                signImg.crossOrigin = "";
                signImg.src = obj.src;
                signImg.onload=function(){
                    ctx.drawImage(signImg,obj.l,obj.t,obj.w,obj.h);
                    base64.push(canvas.toDataURL("image/jpeg",1));
                    if(base64.length == arr.length) {
                        Arr.push(base64[base64.length-1]);
                        funCallBack(base64[base64.length-1],fun)
                    }
                }
            })
        }
    }
    //    合并后回调
    function funCallBack(src,fun) {
       fun(src);
    }
    //保存草稿
    function contractAddDraft(url) {
        var Url = '/contractAddDraft';
        var SubData = {};
        var stepInfo = JSON.parse(localStorage.getItem('stepInfo'));
        SubData.contractName = stepInfo.contactName;
        SubData.endTime = stepInfo.contactTime;
        SubData.remark = stepInfo.contactRemark;
        SubData.secretContract = (stepInfo.contactSecret == 'false' ? 'N':'Y');
        var signatory = stepInfo.signatory
        var contactMids = ''
        for(var i=0;i<signatory.length;i++) {
            contactMids += signatory[i].contactMid+','
        }
        contactMids = contactMids.substr(0, contactMids.length - 1);
        SubData.contactMids = contactMids;
        SubData.contractUrl = url;
        echo.ajax.post(Url,SubData,function (res) {
            echo.ajax.callback(res,function () {
                window.location.href = '/draftsign?id='+res.data.id;
            })
        })
    }
    //保存草稿事件
    saveDraft()
    function saveDraft() {
        $("#saveDraft").on('click',function () {
            create(function (url) {
                contractAddDraft(url)
            })
        })
    }

    //获取验证码
    getSignCodeEvt()
    function getSignCodeEvt() {
        $("#sendPhone").html(window.localStorage.getItem('c_pid'));
        //     获取验证码
        $("#getVerifyCode").on('click',function () {
            var phone = $("#sendPhone").html();
            echo.fun.countDown(this); //倒计时
            contractSigningVerifyCode(phone); // 获取登录验证码Ajax
        })
    }
    //获取验证码Ajax
    function contractSigningVerifyCode(phone) {
        var Url = '/contractSigningVerifyCode';
        var SubData = {}
        SubData.phone = phone;
        echo.ajax.post(Url,SubData,function (res) {
            echo.ajax.callback(res,function () {
                alert(res.data.code);
                layer.msg('短信已发送');
            })
        })
    }
    //发起签署事件
    signCerBtnEvt()
    function signCerBtnEvt() {
        $("#iden_CerBtn").on('click',function () {
            var verifyCode = $("#verifyCode").val();
            var phone = $("#sendPhone").html();
            if(!verifyCode) {layer.msg('请输入验证码');return}
            create(function (url) {
                base64ToUrl(url,verifyCode);
                // contractInitiateSigning(url,verifyCode);
            })
        })
    }
    //base64上传后获取url
    function base64ToUrl(url,verifyCode) {
        var Url = '/upload4';
        var SubData = {};
        SubData.phone = $("#sendPhone").html();
        SubData.url = url;
        echo.ajax.post(Url,SubData,function (res) {
            echo.ajax.callback(res,function () {
                var this_Url = res.data.contractUrl;
                contractInitiateSigning(url,verifyCode)
            })
        })
    }
    //发起签署
    function contractInitiateSigning(url,verifyCode) {
        var Url = '/contractInitiateSigning';
        var SubData = {};
        var stepInfo = JSON.parse(localStorage.getItem('stepInfo'));
        SubData.id = '0';
        SubData.contractName = stepInfo.contactName;
        SubData.endTime = stepInfo.contactTime;
        SubData.remark = stepInfo.contactRemark;
        SubData.secretContract = (stepInfo.contactSecret == 'false' ? 'N':'Y');
        var signatory = stepInfo.signatory
        var contactMids = ''
        for(var i=0;i<signatory.length;i++) {
            contactMids += signatory[i].contactMid+','
        }
        contactMids = contactMids.substr(0, contactMids.length - 1);
        SubData.contactMids = contactMids;
        SubData.contractUrl = url;
        SubData.verifyCode = verifyCode;
        echo.ajax.post(Url,SubData,function (res) {
            echo.ajax.callback(res,function () {
                window.location.href = '/initiatesign?id='+ res.data.id;
            })
        })
    }
})




