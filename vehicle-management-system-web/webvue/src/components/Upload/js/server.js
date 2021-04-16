const Koa = require('koa');
const path = require('path'); 
const Router = require("@koa/router"); 
const  multer = require("@koa/multer");
const cors = require("@koa/cors");
const serve = require("koa-static");
const app = new Koa();

//deploy to heroku will use environment variable 
const  PORT = process.env.PORT || 3000;
const router = new Router();
const upload = multer({dest:'uploads'});
app.use(serve('.'));
app.use(cors());
app.use(router.routes());
router.post('/uploads',upload.single('file'),async(ctx)=>{
    const domain = ctx.protocol +'://' +ctx.host +'/';
    const { path , originalname } = ctx.file;
    console.log("domain",domain);
    ctx.body = {
        code:200,
        data,
        message:'成功'
    }
})

app.listen(PORT, ()=>{
    console.log(`server is listening on port ${PORT}`);
})

