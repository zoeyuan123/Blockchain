/*!Index 路由*/
const express = require('express');
const router = express.Router();
const index = require('../controllers/index');
router.get(/(^\/$)|^(\/index)/, index.index);

//首页
router.get("/", index.index);//首页
router.get("/usercer", index.usercer);//用户中心
router.get("/user", index.user);//用户中心
router.get("/wasm", index.wasm);//wasm

router.get("/404", index.i404);//404
router.get("/403", index.i403);//403
router.get("/400", index.i400);//400
router.get("/500", index.i500);//500
router.get("/503", index.i503);//503


//签名demo
router.get("/signDemo", index.signDemo);//503

module.exports = router;