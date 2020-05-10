// 云函数入口文件
const cloud = require("wx-server-sdk");
const TcbRouter = require("tcb-router");
const controllers = require("./controllers");
const { response, log } = require("./utils");

cloud.init();

// 云函数入口函数
exports.main = async (event, context) => {
  const app = new TcbRouter({
    event,
  });

  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      log.error({ message: err });
      ctx.body = response.Error(err);
    }
  });

  app.router("user/register", controllers.user.register);
  app.router("user/selfInfo", controllers.user.selfInfo);
  app.router("post/attend", controllers.post.attend);
  app.router("post/history", controllers.post.history);
  app.router("post/detail", controllers.post.detail);
  app.router("post/list", controllers.post.list);
  app.router("post/star", controllers.post.star);

  return app.serve();
};
