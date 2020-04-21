// 云函数入口文件
const cloud = require("wx-server-sdk");
const TcbRouter = require("tcb-router");
const controllers = require("./controllers");

cloud.init();

// 云函数入口函数
exports.main = async (event, context) => {
  const app = new TcbRouter({
    event,
  });

  app.router("user/register", controllers.user.register);
  app.router("attendance/isAttended", controllers.attendance.isAttended);

  return app.serve();
};
