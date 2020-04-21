const cloud = require("wx-server-sdk");
const response = require("../../utils/response.js");
const getDate = require("../../utils/getDate");

module.exports = async (ctx, next) => {
  try {
    const db = cloud.database();
    const { OPENID } = cloud.getWXContext();
    cloud.logger().info({
      openId: OPENID,
    });
    const res = await db
      .collection("Users")
      .where({
        _openId: OPENID,
      })
      .get();
    const [user] = res.data;
    const { lastAttendanceData } = user;
    const isAttended =
      lastAttendanceData &&
      lastAttendanceData == getDate.attendanceDate(moment());
    ctx.body = response({
      message: "",
      code: 0,
      data: {
        isAttended: !!isAttended,
      },
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

  await next();
};
