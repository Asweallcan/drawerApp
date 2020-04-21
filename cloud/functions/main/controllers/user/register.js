const cloud = require("wx-server-sdk");
const response = require("../../utils/response.js");

module.exports = async (ctx, next) => {
  try {
    const db = cloud.database();
    const { OPENID } = cloud.getWXContext();
    cloud.logger().info({
      openId: OPENID,
    });
    const res = await db.collection("Users").where({
      _openId: OPENID,
    });
    const { data } = res;
    if (!data) {
      db.collection("Users").add({
        data: {
          _openId: OPENID,
          attendanceIds: [],
          attendanceCount: 0,
          lastAttendanceDate: null,
        },
      });
    }
    ctx.body = response({
      message: "",
      code: 0,
      data: null,
    });
  } catch (err) {
    cloud.logger().info({
      message: err,
    });
    ctx.body = response({
      message: err,
      code: -1,
      data: null,
    });
  }

  await next(); // 执行下一中间件
};
