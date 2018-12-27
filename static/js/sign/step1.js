/**
 * Created by Echonessy on 2018/12/25.
 */
//初始化LayUI组件
$(function () {
    initLayUi()
    function initLayUi() {
        layui.use(['form', 'laydate'], function(){
            var laydate = layui.laydate;
            var form = layui.form;
            //常规用法
            laydate.render({
                elem: '#contactTime',
                theme: '#2F53B1'
            });
            //监听指定开关
            form.on('switch(contactSecret)', function(data){
                $("#contactSecret").attr('data-checked',(this.checked ? 'true' : 'false'))
                // layer.msg('开关checked：'+ (this.checked ? 'true' : 'false'));
                layer.msg('暂未开放');
            });
        });
    }
//打开弹窗相关事件
    fadeEvt()
    function fadeEvt() {
        //    打开弹窗
        $('.step_Add').on('click',function () {
            $('#add_Link').stop(true).fadeIn(150);
        })
        //    关闭弹窗
        $('.fade_Close').on('click',function () {
            $(this).parents('.fade_Box').stop(true).fadeOut(150);
        })

    }
//上传
    function uploadLocalFile(formDom,fileDom,callback) {
        var Url = "/upload3";
        uploadEvt(Url,formDom,fileDom,function (data) {
            callback(data);
        })
    }
//自动上传
    selfUpload()
    function selfUpload() {
        $("#fileCont").on('change',function () {
            var formDom = '#fileContForm';
            var fileDom = '#fileCont';
            uploadLocalFile(formDom,fileDom,function (data) {
                $("#fileContImg").attr({
                    'src':data.data.urls[0],
                    'data-url':JSON.stringify(data.data.urls),
                })
            });
        })
    }
//    查询事件
    searchEvt();
    function searchEvt() {
        // 查询
        $('#search').on('input',function () {
            listSearch();
        });
    }
    listSearch();
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
        Html +='<li class="top">';
        Html +='<span>姓名、企业名</span>';
        Html +='<span>账号（手机号）</span>';
        Html +='</li>';
        if(data) {
            for(var i=0;i<data.length;i++) {
                var this_Data = data[i];
                Html += "<li data-this_Data='"+JSON.stringify(this_Data)+"'>";
                Html += '<span title="'+this_Data.name+'">'+this_Data.name+'</span>';
                Html += '<span title="'+this_Data.phone+'">'+this_Data.phone+'</span>';
                Html += '</li>';
            }
        }
        $("#serch_List").html(Html);
        addChoiceLink();
        cerChoiceBtn()
    }
    //左右选择联系人
    function addChoiceLink() {
        leftToRight()
    }
    //从左迁移至右侧
    function leftToRight() {
        $("#serch_List li").off('click');
        $("#serch_List li").on('click',function () {
            var objNew = JSON.parse($(this).attr('data-this_Data'));
            var that = this;
            var name = objNew.name;
            var Html = '';
            Html += "<li data-this_Data='"+JSON.stringify(objNew)+"'>";
            Html += '<span>'+name+'</span>';
            Html += '<i class="layui-icon layui-icon-close"></i>';
            Html += '</li>';
            $("#step_User_Done").append(Html);
            $(this).remove()
            removeNowUser();
        })
    }
    //    移除已添加列表
    function removeNowUser() {
        $('#step_User_Done i').off('click');
        $('#step_User_Done i').on('click',function () {
            var this_Pre = $(this).parents('li');
            var objNew =JSON.parse(this_Pre.attr('data-this_Data')) ;
            var name = objNew.name;
            var phone = objNew.phone;
            console.log(objNew)
            var sHtml = $("#serch_List").html();
            sHtml += "<li data-this_Data='"+JSON.stringify(objNew)+"'>";
            sHtml += '<span title="'+name+'" >'+name+'</span>';
            sHtml += '<span title="'+phone+'">'+phone+'</span>';
            sHtml += '</li>';
            $('#serch_List').html(sHtml);
            $(this).parents('li').remove();
            leftToRight()
        });
    }


    //确认联系人
    function cerChoiceBtn() {
        $("#step_User_CerBtn").off('click');
        $("#step_User_CerBtn").on('click',function () {
            var Arr = [];
            $.each($('#step_User_Done li'),function (i,obj) {
                if(i>0) {
                    var objNew = {};
                    var thisLi = JSON.parse($(obj).attr('data-this_Data'));
                    Arr.push(thisLi);
                }
            })
            console.log(Arr)
            $("#add_Link").fadeOut(150);
            renderResultLink(Arr);
        });
    }
    //确认签署方渲染
    function renderResultLink(data) {
        var Html = '';
        if(data.length>0) {
            for(var i=0;i<data.length;i++) {
                var this_Data = data[i];
                Html += "<li data-this_Data='"+JSON.stringify(this_Data)+"'>";
                Html += '<div class="list_Bor">';
                Html += '<span>'+(i+1)+'</span>';
                Html += '<input class="this_name" type="text" value="'+this_Data.name+'" placeholder="姓名、机构号">';
                Html += '<input class="this_phone"  type="text" value="'+this_Data.phone+'" placeholder="账号(手机号)">';
                Html += '<input class="this_publicKeys"  type="hidden" value="'+this_Data.publicKeys+'" placeholder="">';
                Html += '<input class="this_id"  type="hidden" value="'+this_Data.id+'" placeholder="">';
                Html += '</div>';
                Html += '<button class="deleteUser">撤&nbsp;&nbsp;销</button>';
                Html += '</li>';
            }
            $("#sign_User").html(Html);
            deleteUser()
        }
    }

    function deleteUser() {
        $(".deleteUser").off('click');
        $(".deleteUser").on('click',function () {
            $(this).parents('li').remove();
        })
    }

//    下一步
    toSignnext()
    function toSignnext() {
        $("#toSignnext").off('click');
        $("#toSignnext").on('click',function () {
            var fileContImg = $("#fileContImg");
            var contactUrl = fileContImg.attr('data-url');
            var contactName = $('#contactName').val();
            var contactTime = $('#contactTime').val();
            var contactRemark = $('#contactRemark').val();
            var contactSecret = $('#contactSecret').attr('data-checked');
            var sign_User = $("#sign_User li");
            if(!contactUrl) {layer.msg('请先上传合同');return;}
            if(!contactName) {layer.msg('请填写合同名');return;}
            if(!contactTime) {layer.msg('请选择截止时间');return;}
            if(sign_User.length ==0) {layer.msg('请选择签署方');return;}
            var toData = {};
            toData.contactName = contactName;
            toData.contactTime = contactTime;
            toData.contactRemark = contactRemark;
            toData.contactUrl = JSON.parse(contactUrl);
            toData.contactSecret = contactSecret;
            var Arr = [];
            $.each(sign_User,function (i,obj) {
                console.log($(obj).attr('data-this_Data'))
                var objNew = JSON.parse($(obj).attr('data-this_Data'));
                Arr.push(objNew);
            })
            toData.signatory = Arr;
            console.log(toData);
            window.localStorage.setItem('stepInfo',JSON.stringify(toData));
            window.location.href = '/signnext'
        });
    }



})