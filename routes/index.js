/*!Index 路由*/
const express = require('express');
const router = express.Router();
const index = require('../controllers/index');
const manage = require('../controllers/manage');

// const wasm = require('../controllers/wasm');



router.get(/(^\/$)|^(\/index)/, index.index);

//首页
router.get("/", index.index);//首页
router.get("/usercer", index.usercer);//未认证用户中心
router.get("/user", index.user);//用户中心


/***********************合同签署*********Start****************/

router.get("/appcode", index.appcode);
/***********************主动发起合同*************************/
//合同签署第一步 设置合同及签署方
router.get("/sign", index.sign);
router.post("/sign", index.sign);
//合同签署第二步  拖拽签名
router.get("/signnext", index.signnext);
router.post("/signnext", index.signnext);
//保存草稿结果页
router.get("/draftsign", index.draftsign);
router.post("/draftsign", index.draftsign);
//发起签署结果页
router.get("/initiatesign", index.initiatesign);
router.post("/initiatesign", index.initiatesign);
//单边签署合同信息
router.get("/signinfo", index.signinfo);
router.post("/signinfo", index.signinfo);

/***********************被动签署合同*************************/
//合同拖拽生成签署合同
router.get("/passivesign", index.passivesign);
router.post("/passivesign", index.passivesign);
//同意签署结果
router.get("/agreesign", index.agreesign);
router.post("/agreesign", index.agreesign);
//同意签署合同详情
router.get("/agreeinfo", index.agreeinfo);
router.post("/agreeinfo", index.agreeinfo);
//拒绝签署结果
router.get("/refusesign", index.refusesign);
router.post("/refusesign", index.refusesign);
//拒绝签署结果详情
router.get("/refuseinfo", index.refuseinfo);
router.post("/refuseinfo", index.refuseinfo);

/***********************合同签署*********End****************/





/***********************合同管理********Start*****************/
//合同签署管理页面
router.get("/manage", manage.index);
//全部文件
router.post("/contractAll", manage.contractAll);
//待我签
router.post("/waitMineList", manage.waitMineList);
//待对方签
router.post("/waitOtherList", manage.waitOtherList);
//已完成
router.post("/completeList", manage.completeList);
//已拒绝
router.post("/refuseList", manage.refuseList);
//草稿箱
router.post("/draftList", manage.draftList);
//删除草稿箱
router.post('/deleteDraft',manage.deleteDraft)
/***********************合同管理********End*****************/

router.get("/wasm", index.wasm);//wasm
//私钥解密
router.post('/wasmKey',index.wasmKey);
//签名demo
router.get("/signDemo", index.signDemo);
//异常
router.get("/404", index.i404);//404
router.get("/403", index.i403);//403
router.get("/400", index.i400);//400
router.get("/500", index.i500);//500
router.get("/503", index.i503);//503



module.exports = router;