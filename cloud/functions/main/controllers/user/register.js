const cloud = require("wx-server-sdk");
const { response, getRequestData } = require("../../utils");
const { User } = require("../../models");

module.exports = async (ctx, next) => {
  let transaction;
  try {
    const db = cloud.database();
    transaction = await db.startTransaction();

    const data = getRequestData(ctx);
    const { OPENID } = cloud.getWXContext();

    const { data: users } = await db
      .collection(User.__TABLE__)
      .where({
        openId: OPENID,
      })
      .get();

    if (!users || !users.length)
      await transaction.collection(User.__TABLE__).add({
        data: User({ ...data, openId: OPENID }),
      });

    await transaction.commit();
    ctx.body = response();
  } catch (err) {
    if (transaction) transaction.rollback();
    throw err;
  }

  await next(); // 执行下一中间件
};
