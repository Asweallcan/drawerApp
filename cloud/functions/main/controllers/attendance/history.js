const cloud = require("wx-server-sdk");
const moment = require("moment");
const { response, log } = require("../../utils");
const { User, Attendance } = require("../../models");

module.exports = async (ctx, next) => {
  try {
    const db = cloud.database();
    const _ = db.command;
    const { OPENID } = cloud.getWXContext();

    const { data: users } = await db
      .collection(User.__TABLE__)
      .where({
        openId: OPENID,
      })
      .get();

    const { attendanceIds } = User(users[0]);

    const { data: attendances } = await db
      .collection(Attendance.__TABLE__)
      .where({
        _id: _.in(attendanceIds),
      })
      .get();

    ctx.body = response({
      data: attendances,
    });
  } catch (err) {
    log.error({ message: err });
    ctx.body = response.Error(err);
  }

  await next();
};
