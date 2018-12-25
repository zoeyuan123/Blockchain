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
                elem: '#test1',
                theme: '#2F53B1'
            });
            //监听指定开关
            form.on('switch(switchEncrypt)', function(data){
                console.log('开关checked：'+ (this.checked ? 'true' : 'false'));
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
        //    移除已添加列表
        $('.step_User_List_Done i').on('click',function () {
            $(this).parent('li').remove();
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
})