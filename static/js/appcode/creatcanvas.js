/**
 * Created by Echonessy on 2018/12/12.
 */
$(function () {
    initCanvas()
    function initCanvas() {
        var screen = $('#app_Content').width();
        $('#myCanvas').css({'width':screen,"height":screen});
        InitThis()
    }

    var mousePressed = false;
    var lastX, lastY;
    var ctx;
    function InitThis() {
        ctx = document.getElementById('myCanvas').getContext("2d");
        var myCanvas = $('#myCanvas');
        myCanvas.on('touchstart',function (e) {
                console.log(e.target)

                mousePressed = true;
                Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
        })
        myCanvas.on('touchmove',function (e) {
            console.log(e.pageX)
                if (mousePressed) {

                    Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
                }
        })
        myCanvas.on('touchend',function (e) {
                if (mousePressed) {
                    mousePressed = false;
                    cPush();
                }
        })
        //
        // $('#myCanvas').touch(function (e) {

        // });
        // $('#myCanvas').touchStart(function (e) {

        // });
        // $('#myCanvas').touchEnd(function (e) {

        // });
        //
        // $('#myCanvas').mouseleave(function (e) {
        //     if (mousePressed) {
        //         mousePressed = false;
        //         cPush();
        //     }
        // });
        // drawImage();
    }
    function drawImage() {
        var image = new Image();
        image.src = 'img/bg.jpg';
        $(image).load(function () {
            ctx.drawImage(image, 0, 0, 500, 200);
            cPush();
        });
    }
    function Draw(x, y, isDown) {
        if (isDown) {
            ctx.beginPath();
            ctx.strokeStyle = "red";
            ctx.lineWidth = 5;
            ctx.lineJoin = "round";
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(x, y);
            ctx.closePath();
            ctx.stroke();
        }
        lastX = x;
        lastY = y;
    }
    var cPushArray = new Array();
    var cStep = -1;
    function cPush() {
        cStep++;
        console.log(cStep)
        if (cStep < cPushArray.length) { cPushArray.length = cStep; }
        cPushArray.push(document.getElementById('myCanvas').toDataURL());
    }
    function cUndo() {
        if (cStep > 0) {
            cStep--;
            var canvasPic = new Image();
            canvasPic.src = cPushArray[cStep];
            console.log(canvasPic.src)
            canvasPic.onload = function () { ctx.drawImage(canvasPic, 0, 0); };
        }
    }
    function cRedo() {
        if (cStep < cPushArray.length-1) {
            cStep++;
            var canvasPic = new Image();
            canvasPic.src = cPushArray[cStep];
            canvasPic.onload = function () { ctx.drawImage(canvasPic, 0, 0); }
        }
    }
})