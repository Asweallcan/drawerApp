const cloud = require("wx-server-sdk");
const moment = require("moment");
const { response } = require("../../utils");
const { User } = require("../../models");

module.exports = async (ctx, next) => {
  try {
    const db = cloud.database();
    const { OPENID } = cloud.getWXContext();
    const { data: users } = await db
      .collection(User.__TABLE__)
      .where({
        openId: OPENID,
      })
      .get();
    const [user] = users;

    const { lastAttendDate } = user;

    const attended =
      lastAttendDate &&
      moment(moment().format("YYYY-MM-DD")).diff(
        moment(moment(lastAttendDate).format("YYYY-MM-DD")),
        "days"
      ) < 1;

    ctx.body = response({
      data: { ...user, attended: false },
    });
  } catch (err) {
    throw err;
  }

  await next();
};
