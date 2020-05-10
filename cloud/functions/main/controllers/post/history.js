const cloud = require("wx-server-sdk");
const { response } = require("../../utils");
const { User, Post } = require("../../models");

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

    const { postIds } = User(users[0]);

    const { data: attendances } = await db
      .collection(Post.__TABLE__)
      .field({
        title: true,
        file: true,
        date: true,
        isPublic: true,
      })
      .where({
        _id: _.in(postIds),
        isAttendance: true,
      })
      .get();

    ctx.body = response({
      data: attendances,
    });
  } catch (err) {
    throw err;
  }

  await next();
};
