const Koa = require("koa");

const Router = require("koa-router");

const body = require("koa-body");

const app = new Koa();

app.use(
  body({
    multipart: true,
  })
);

const router = new Router();
router.get("/", (ctx) => {
  ctx.body = "hello hei";
});
app.use(router.routes());

app.listen(8000, () => {
  console.log("open server localhost:8000");
});
