/**
 * Created by Echonessy on 2018/12/13.
 */


$(function () {
    //Tab切换
    manaTabEvt()
    function manaTabEvt() {
        $('#mana_Tab>li').on('click',function () {
            $(this).siblings().removeClass();
            $(this).addClass('this_Tab');
            $('#mana_TabCon>li').css('display','none');
            $('#mana_TabCon>li').eq($(this).index()).stop(true).fadeIn(150);
        })

    }
    //阻止冒泡
    function stopBubble(evt) {
        var evt = evt||window.event;
        if (evt.stopPropagation) {
            evt.stopPropagation();
        }
        else {
            window.event.cancelBubble = true;
        }
    }
    //模拟跳转
    mockRedirect()
    function mockRedirect() {
        $('.to_Passivesign').on('click',function () {
            window.location.href  = '/passivesign'
        })
        $('.to_Signinfo').on('click',function () {
            window.location.href  = '/signinfo'
        })
        $('.to_Agreeinfo').on('click',function () {
            window.location.href  = '/agreeinfo'
        })
        $('.to_Refuseinfo').on('click',function () {
            window.location.href  = '/refuseinfo'
        })
        $('.to_Signnext').on('click',function () {
            window.location.href  = '/signnext'
        })
    }



    //获取全部文件Ajax
    getAllAjax();
    function getAllAjax() {
        var Url = '/contractAll';
        var SubData = {};
        echo.ajax.post(Url,SubData,function (res) {
            echo.ajax.callback(res,function () {
                renderAllHtml(res.data)
            })
        })
    }
    //全部文件头部html
    function creAllTopHtml() {
        var Html = '';
        Html += '<li class="top">';
        Html += '<span>合同名称</span>';
        Html += '<span>发起人</span>';
        Html += '<span>发起时间</span>';
        Html += '<span>截止时间</span>';
        Html += '<span>状态</span>';
        Html += '</li>';
        return Html;
    }
    //全部文件列表Html
    function creAllListHtml(data) {
        var Html = '<ul class="single total_List">'
        Html += creAllTopHtml();
        if(data.length > 0) {
            for(var i=0;i<data.length;i++) {
                var this_Data = data[i];
                Html += '<li>';
                Html += '<span data-id="'+this_Data.id+'">'+this_Data.contract+'</span>';
                Html += '<span>'+this_Data.initiator+'</span>';
                Html += '<span>'+this_Data.startTime+'</span>';
                Html += '<span>'+this_Data.endTime+'</span>';
                Html += '<span>'+this_Data.status+'</span>';
                Html += '</li>';
            }
        }
        Html += '</ul>';
        return Html;
    }
    //渲染数据
    function renderAllHtml(data) {
        $('#total_List').html(creAllListHtml(data))
    }




    //获取待我签Ajax
    getWaitMineAjax()
    function getWaitMineAjax() {
        var Url = '/waitMineList';
        var SubData = {};
        echo.ajax.post(Url,SubData,function (res) {
            echo.ajax.callback(res,function () {
                renderWaitMineHtml(res.data)
            })
        })
    }
    //待我签头部html
    function creWaitMineTopHtml() {
        var Html = '';
        Html += '<li class="top">';
        Html += '<span>合同名称</span>';
        Html += '<span>发起人</span>';
        Html += '<span>发起时间</span>';
        Html += '<span>截止时间</span>';
        Html += '</li>';
        return Html;
    }
    //待我签列表Html
    function creWaitMineHtml(data) {
        var Html = '<ul class="single wait_Me">'
        Html += creWaitMineTopHtml();
        if(data.length > 0) {
            for(var i=0;i<data.length;i++) {
                var this_Data = data[i];
                Html += '<li>';
                Html += '<span class="to_Passivesign" data-id="'+this_Data.id+'">'+this_Data.contract+'</span>';
                Html += '<span>'+this_Data.initiator+'</span>';
                Html += '<span>'+this_Data.startTime+'</span>';
                Html += '<span>'+this_Data.endTime+'</span>';
                Html += '</li>';
            }
        }
        Html += '</ul>';
        return Html;
    }
    //渲染数据
    function renderWaitMineHtml(data) {
        $('#wait_Me').html(creWaitMineHtml(data))
    }





    //获取待对方签Ajax
    getWaitYouAjax()
    function getWaitYouAjax() {
            var Url = '/waitOtherList';
            var SubData = {};
            echo.ajax.post(Url,SubData,function (res) {
                echo.ajax.callback(res,function () {
                    renderWaitYouHtml(res.data)
                })
            })
        }
    //待对方签头部html
    function creWaitYoueTopHtml() {
        var Html = '';
        Html += '<li class="top">';
        Html += '<span>合同名称</span>';
        Html += '<span>待签方</span>';
        Html += '<span>发起时间</span>';
        Html += '<span>截止时间</span>';
        Html += '</li>';
        return Html;
    }
    //待对方签列表Html
    function creWaitYouHtml(data) {
        var Html = '<ul class="single wait_You">'
        Html += creWaitYoueTopHtml();
        if(data.length > 0) {
            for(var i=0;i<data.length;i++) {
                var this_Data = data[i];
                Html += '<li>';
                Html += '<span class="to_Signinfo" data-id="'+this_Data.id+'">'+this_Data.contract+'</span>';
                Html += '<span>'+this_Data.signinArticle+'</span>';
                Html += '<span>'+this_Data.startTime+'</span>';
                Html += '<span>'+this_Data.endTime+'</span>';
                Html += '</li>';
            }
        }
        Html += '</ul>';
        return Html;
    }
    //渲染数据
    function renderWaitYouHtml(data) {
        $('#wait_You').html(creWaitYouHtml(data))
    }





    //获取已完成Ajax
    getDoneAjax()
    function getDoneAjax() {
            var Url = '/completeList';
            var SubData = {};
            echo.ajax.post(Url,SubData,function (res) {
                echo.ajax.callback(res,function () {
                    renderDoneHtml(res.data)
                })
            })
        }
    //已完成头部html
    function creDoneTopHtml() {
        var Html = '';
        Html += '<li class="top">';
        Html += '<span>合同名称</span>';
        Html += '<span>签署方</span>';
        Html += '<span>发起时间</span>';
        Html += '<span>完成时间</span>';
        Html += '</li>';
        return Html;
    }
    //已完成列表Html
    function creDoneHtml(data) {
        var Html = '<ul class="single sign_Done">'
        Html += creDoneTopHtml();
        if(data.length > 0) {
            for(var i=0;i<data.length;i++) {
                var this_Data = data[i];
                Html += '<li>';
                Html += '<span class="to_Agreeinfo" data-id="'+this_Data.id+'">'+this_Data.contract+'</span>';
                Html += '<span>'+this_Data.signin+'</span>';
                Html += '<span>'+this_Data.startTime+'</span>';
                Html += '<span>'+this_Data.doneTime+'</span>';
                Html += '</li>';
            }
        }
        Html += '</ul>';
        return Html;
    }
    //渲染数据
    function renderDoneHtml(data) {
        $('#sign_Done').html(creDoneHtml(data))
    }



    //获取已拒绝Ajax
    getRefuseAjax()
    function getRefuseAjax() {
            var Url = '/refuseList';
            var SubData = {};
            echo.ajax.post(Url,SubData,function (res) {
                echo.ajax.callback(res,function () {
                    renderRefuseHtml(res.data)
                })
            })
        }
    //已拒绝头部html
    function creRefuseTopHtml() {
        var Html = '';
        Html += '<li class="top">';
        Html += '<span>合同名称</span>';
        Html += '<span>发起人</span>';
        Html += '<span>发起时间</span>';
        Html += '<span>拒签主体</span>';
        Html += '<span>拒签时间</span>';
        Html += '</li>';
        return Html;
    }
    //已拒绝列表Html
    function creRefuseHtml(data) {
        var Html = '<ul class="single refuse_List">'
        Html += creRefuseTopHtml();
        if(data.length > 0) {
            for(var i=0;i<data.length;i++) {
                var this_Data = data[i];
                Html += '<li>';
                Html += '<span class="to_Refuseinfo" data-id="'+this_Data.id+'">'+this_Data.contract+'</span>';
                Html += '<span>'+this_Data.initiator+'</span>';
                Html += '<span>'+this_Data.denied+'</span>';
                Html += '<span>'+this_Data.startTime+'</span>';
                Html += '<span>'+this_Data.deniedTime+'</span>';
                Html += '</li>';
            }
        }
        Html += '</ul>';
        return Html;
    }
    //渲染数据
    function renderRefuseHtml(data) {
        $('#refuse_List').html(creRefuseHtml(data))
    }



    //获取草稿箱Ajax
    getDraftAjax()
    function getDraftAjax() {
            var Url = '/draftList';
            var SubData = {};
            echo.ajax.post(Url,SubData,function (res) {
                echo.ajax.callback(res,function () {
                    renderDraftHtml(res.data)
                })
            })
        }
    //已拒绝头部html
    function creDraftTopHtml() {
        var Html = '';
        Html += '<li class="top">';
        Html += '<span>合同名称</span>';
        Html += '<span>签署对象</span>';
        Html += '<span>最后一次编辑时间</span>';
        Html += '<span></span>';
        Html += '</li>';
        return Html;
    }
    //已拒绝列表Html
    function creDraftHtml(data) {
        var Html = '<ul class="single sign_Draft">'
        Html += creDraftTopHtml();
        if(data.length > 0) {
            for(var i=0;i<data.length;i++) {
                var this_Data = data[i];
                Html += '<li>';
                Html += '<span class="to_Refuseinfo" data-id="'+this_Data.id+'">'+this_Data.contract+'</span>';
                Html += '<span>'+this_Data.signUser+'</span>';
                Html += '<span>'+this_Data.lastEditTime+'</span>';
                Html += '<span><img src="/static/img/model/del.png" data-id="'+this_Data.id+'" class="del_Ico" alt=""></span>';
                Html += '</li>';
            }
        }
        Html += '</ul>';
        return Html;
    }
    //渲染数据
    function renderDraftHtml(data) {
        $('#sign_Draft').html(creDraftHtml(data));
        deleteEvt()
    }
    // 删除草稿事件
    function deleteEvt() {
        $('.del_Ico').off('click');
        $('.del_Ico').on('click',function (evt) {
            stopBubble(evt);
            var that = this;
            var id = $(this).attr('data-id');
            $('#is_Del').stop(true).fadeIn(150);
            $('.del_Ok').off('click');
            $('.del_No').off('click');
            $('.del_Ok').on('click',function (evt) {
                stopBubble(evt)
                deleteDraftAjax(id);
                $('#is_Del').stop(true).fadeOut(150);
            })
            $('.del_No').on('click',function (evt) {
                stopBubble(evt)
                $('#is_Del').stop(true).fadeOut(150);
            })
        })
    }
    // 删除草稿
    function deleteDraftAjax(id) {
        var Url = '/deleteDraft';
        var SubData = {};
        SubData.id = id;
        echo.ajax.post(Url,SubData,function (res) {
            echo.ajax.callback(res,function () {
                layer.msg('删除成功');
                getDraftAjax();
            })
        })
    }


})