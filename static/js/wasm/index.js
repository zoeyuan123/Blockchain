/**
 * Created by Echonessy on 2018/12/6.
 */

creat_Key()
function creat_Key() {
    $('#creat_Key').on('click',function () {
        //调用创建秘钥函数
        //alias 秘钥别名
        //auth 密码
        echo.box.loader("生成中....请等待")
        var auth = $("#auth").val();
        createKeyAuth(auth)
    })
}


//创建私钥公钥
function createKeyAuth(auth) {
    var creData = {alias: "testKey", auth}
    createKey(creData).then(res => {
        console.log(res)
        var reqData = JSON.parse(res.data);
        $('#creatKey').html(res.data)
        reqData.auth = auth;
        var signData = {message:"91c3ea050a9226ca95348ba2ed6f98ab6fd8ec1ce43a7b140476592d4406c449", key: res.data, password: auth}
        createSignMessage(signData)
    }).catch(err => {
        echo.box.alert(err)
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
