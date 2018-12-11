/*!Index 路由*/
const express = require('express');
const router = express.Router();
const index = require('../controllers/index');
const wasm = require('../controllers/wasm');
router.get(/(^\/$)|^(\/index)/, index.index);

//首页
router.get("/", index.index);//首页
router.get("/usercer", index.usercer);//未认证用户中心
router.get("/user", index.user);//用户中心

router.get("/sign", index.sign);//合同签署

router.get("/agreesign", index.agreesign);//同意签署结果
router.get("/agreeinfo", index.agreeinfo);//同意签署合同详情

router.get("/refusesign", index.refusesign);//拒绝签署结果
router.get("/refuseinfo", index.refuseinfo);//拒绝签署结果详情

router.get("/signstep", index.signstep);//合同签署1
router.get("/signnext", index.signnext);//合同签署2
router.get("/draftsign", index.draftsign);//保存草稿

router.get("/manage", index.manage);//合同签署管理

router.get("/wasm", index.wasm);//wasm




//私钥解密
router.post('/wasmKey',index.wasmKey);

router.get("/404", index.i404);//404
router.get("/403", index.i403);//403
router.get("/400", index.i400);//400
router.get("/500", index.i500);//500
router.get("/503", index.i503);//503


//签名demo
router.get("/signDemo", index.signDemo);//503

module.exports = router;