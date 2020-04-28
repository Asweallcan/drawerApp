const cloud = require("wx-server-sdk");
const moment = require("moment");
const { response, log } = require("../../utils");
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
      lastAttendDate && moment().diff(lastAttendDate || undefined, "days") < 1;

    ctx.body = response({
      data: { ...user, attended },
    });
  } catch (err) {
    log.error({
      message: err,
    });
    ctx.body = response.Error(err);
  }

  await next();
};
