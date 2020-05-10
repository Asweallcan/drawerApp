const cloud = require("wx-server-sdk");
const moment = require("moment");
const { response, getRequestData } = require("../../utils");
const { User, Post } = require("../../models");

module.exports = async (ctx, next) => {
  let transaction;
  try {
    const db = cloud.database();
    const { OPENID } = cloud.getWXContext();

    const { data: users } = await db
      .collection(User.__TABLE__)
      .where({
        openId: OPENID,
      })
      .get();

    const user = User(users[0]);

    // if (
    //   user.lastAttendDate &&
    //   moment(moment().format("YYYY-MM-DD")).diff(
    //     moment(moment(user.lastAttendDate || undefined).format("YYYY-MM-DD")),
    //     "days"
    //   ) < 1
    // )
    //   throw "今日已经打卡过了";

    transaction = await db.startTransaction();
    const { title, file, isPublic } = getRequestData(ctx);
    const post = Post({
      title,
      file,
      isPublic,
      isAttendance: true,
      date: moment().valueOf(),
      userId: user._id,
    });

    const { _id: postId } = await transaction
      .collection(Post.__TABLE__)
      .add({ data: post });
      
    if (
      moment(moment().format("YYYY-MM-DD")).diff(
        moment(moment(user.lastAttendDate || undefined).format("YYYY-MM-DD")),
        "days"
      ) < 2
    )
      user.continuousAttendCount = user.continuousAttendCount + 1;
    else user.continuousAttendCount = 0;
    user.postIds = user.postIds.concat(postId);
    user.lastAttendDate = moment().valueOf();

    await transaction.collection(User.__TABLE__).doc(user._id).set({
      data: user,
    });

    await transaction.commit();
    ctx.body = response();
  } catch (err) {
    if (transaction) await transaction.rollback(-1);
    throw err;
  }

  await next();
};
