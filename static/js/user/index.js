/**
 * Created by Echonessy on 2018/12/20.
 */
$(function () {
    //点击事件集合
    clickEvt();
    function clickEvt() {
        $( "#slider" ).slider({
            value: 50
        });
        //左侧菜单切换
        $('#userLeft li').on('click',function () {
            var i = $(this).index();
            $(".user_Fun").css('display','none');
            $(this).siblings().removeClass();
            $(this).removeClass().addClass('this_UserMenu');
            $("#user_Con .user_Fun").eq(i).stop(true).fadeIn(150);
        });
        //暂未开放
        $('#enterprise').on('click',function () {
            layer.msg('暂未开放');
        });
        // 修改用户信息
        $('#memberUpdateBtn').on('click',function () {
            memberUpdate();
        });
        // 查询
        $('#search').on('input',function () {
            listSearch();
        });
    }
    // 获取用户信息
    memberinfo();
    function memberinfo() {
        var Url = '/memberinfo';
        echo.ajax.post(Url,null,function (res) {
            echo.ajax.callback(res,function () {
                var resData = res.data;
                renderInfo(resData)
            })
        })
    }
    // 渲染用户数据
    function renderInfo(data) {
        if(!data) {return}
        $("#name").html(data.name);//姓名
        $("#phone").html(data.phone);//手机号
        $("#publicKeys").html(data.publicKeys);//公钥
        $("#idCard").html(data.idCard);//身份证号
        $("#id").val(data.id);//用户ID
        $("#memberImg").val(data.memberImg);//本人照片地址
        $("#idCardFrontImg").val(data.idCardFrontImg);//身份证正面图片地址
        $("#idCardBackImg").val(data.idCardBackImg);//身份证反面图片地址
        $("#position").val(data.position);//职位
        $("#company").val(data.company);//公司
        $("#addTime").val(data.addTime);//注册时间
        $("#privateKeysFileUrl").val(data.privateKeysFileUrl);//私钥文件地址
    }
    // 修改用户信息
    function memberUpdate() {
        var Url = '/memberUpdate';
        var SubData = {};
        SubData.company = $("#company").val();
        SubData.position = $("#position").val();
        echo.ajax.post(Url,SubData,function (res) {
            echo.ajax.callback(res,function () {
                layer.msg('修改成功')
            })
        })
    }
    // 获取用户签章
    signatureInfo();
    function signatureInfo() {
        var Url = '/signatureInfo';
        echo.ajax.post(Url,null,function (res) {
            echo.ajax.callback(res,function () {
                var resData = res.data;
                renderInfoImg(resData);
            })
        })
    }
    // 渲染签章
    function renderInfoImg(data) {
        if(!data) {return}
        var Html = '';
        for(var i=0; i<data.length;i++) {
            Html += '<li><img src="data:image/png;base64,'+data[i].url+'" alt=""></li>';
        }
        // $("#user_SignList").html(Html).attr({
        //     "data-id": data.id,
        //     "data-mid": data.mid,
        //     "data-addTime": data.addTime
        // });
    }
    // 查询联系人
    function listSearch() {
        var Url = '/listSearch';
        var SubData = {}
        SubData.search = $("#search").val();
        echo.ajax.post(Url,SubData,function (res) {
            echo.ajax.callback(res,function () {
                var resData = res.data;
                renderLink(resData);
            })
        })
    }
    // 渲染联系人列表
    function renderLink(data) {
        var Html = '';
        Html += '<li class="serch_top">';
        Html += '<span>姓名</span>';
        Html += '<span>公钥</span>';
        Html += '<span>单位</span>';
        Html += '<span>职位</span>';
        Html += '<span>备注</span>';
        Html += '</li>';
        if(data) {
            console.log(data)
            for(var i=0;i<data.length;i++) {
                var this_Data = data[i];
                Html += '<li>';
                Html += '<span>'+this_Data.name+'</span>';
                Html += '<span title="'+this_Data.publicKeys+'">'+this_Data.publicKeys+'</span>';
                Html += '<span>'+this_Data.company+'</span>';
                Html += '<span>'+this_Data.position+'</span>';
                Html += '<input type="text" class="updateRemark" data-phone="'+this_Data.phone+'" data-id="'+this_Data.id+'" value="'+this_Data.remark+'">';
                Html += '</li>';
            }
        }
        $("#serch_List").html(Html);
        contactUpdateEvt();
    }
    //联系人弹窗关闭
    fadeClose();
    function fadeClose() {
        $('#serch_Btn').on('click',function () {
            $('#link_Fade').stop(true).fadeIn(150);
        })
        $('#link_Close').on('click',function () {
            $('#link_Fade').stop(true).fadeOut(150);
        })
    }
    //添加联系人
    function contactAdd(type,search) {
        var Url = '/contactAdd';
        var SubData = {}
        SubData.type = type;
        SubData.search = search;
        echo.ajax.post(Url,SubData,function (res) {
            echo.ajax.callback(res,function () {
                layer.msg('添加成功');
            })
        })
    }
    //添加联系人事件
    addEvt();
    function addEvt() {
        $(".addLinkEvt").on('click',function () {
            var type = $(this).attr('data-type');
            var search = (type == 'PHONE'? $("#add_Phone").val():$("#add_Key").val())
            contactAdd(type,search)
        })
    }
    //修改联系人备注事件
    function contactUpdateEvt() {
        $(".updateRemark").on('blur',function () {
            var id = $(this).attr('data-id');
            var remark = $(this).val();
            contactUpdate(id,remark);
        })
    }
    // 修改联系人备注
    function contactUpdate(id,remark) {
        var Url = '/contactUpdate';
        var SubData = {}
        SubData.id = id;
        SubData.remark = remark;
        echo.ajax.post(Url,SubData,function (res) {
            echo.ajax.callback(res,function () {
                layer.msg('更新成功');
            })
        })
    }
    //  图片裁剪
    corpUpImgEvt();
    function corpUpImgEvt() {
        var $image = $('.img-container > img'),
            options = {
                aspectRatio: 1 / 1,
                preview: '.img-preview',
                crop: function (data) {}
            };
        $image.on({
            'build.cropper': function (e) {
                console.log(e.type);
            },
            'built.cropper': function (e) {
                console.log(e.type);
            },
            'dragstart.cropper': function (e) {
                console.log(e.type, e.dragType);
            },
            'dragmove.cropper': function (e) {
                console.log(e.type, e.dragType);
            },
            'dragend.cropper': function (e) {
                console.log(e.type, e.dragType);
            },
            'zoomin.cropper': function (e) {
                console.log(e.type);
            },
            'zoomout.cropper': function (e) {
                console.log(e.type);
            }
        }).cropper(options);
        // Methods
        $(document.body).off('click');
        $(document.body).on('click', '[data-method]', function () {
            var data = $(this).data(),
                $target,
                result;
            if (data.method) {
                data = $.extend({}, data); // Clone a new one
                if (typeof data.target !== 'undefined') {
                    $target = $(data.target);
                    if (typeof data.option === 'undefined') {
                        try {
                            data.option = JSON.parse($target.val());
                        } catch (e) {
                            console.log(e.message);
                        }
                    }
                }
                result = $image.cropper(data.method, data.option);
                if (data.method === 'getCroppedCanvas') {
                    var url = result.toDataURL('image/png',0.5);
                    $("#base64").val(url);
                    signatureAdd(url)
                    // uploadbase64(url)
                }

            }
        });
    }
//    打开关闭
    openEvt();
    function openEvt() {
        $("#openLocal").on('click',function () {
            $("#localFade").fadeIn(150);
        })
        $("#cancelLocal").on('click',function () {
            $("#localFade").fadeOut(150);
        })
    }
    //自动上传
    selfMotionUpload();
    function selfMotionUpload() {
        $("#fileLocal").on('change',function () {
            uploadLocalFile();
            var URL = window.URL || window.webkitURL,
                blobURL;
            var $image = $('.img-container > img')
            var files = this.files, file;
            if (files && files.length) {
                file = files[0];
                if (/^image\/\w+$/.test(file.type)) {
                    blobURL = URL.createObjectURL(file);
                    $image.one('built.cropper', function () {
                        URL.revokeObjectURL(blobURL); // Revoke when load complete
                    }).cropper('reset', true).cropper('replace', blobURL);
                }
            }
        });

    }
//    上传
    function uploadLocalFile() {
        var Url = "/upload2";
        var formDom = "#formLocal";
        var fileDom = "#fileLocal";
        uploadEvt(Url,formDom,fileDom,function (data) {
            $("#img-corp").attr('src',data.data.urls[0]);
            $("#base64Post").attr('data-header',data.sessionId);
            corpEvt();
        })
    }
//    添加签章
    function signatureAdd(url) {
        var Url = '/signatureAdd';
        var SubData = {}
        SubData.url = url;
        echo.ajax.post(Url,SubData,function (res) {
            echo.ajax.callback(res,function () {
                layer.msg('添加成功');
                signatureInfo();
            })
        })
    }
})

