const cloud = require("wx-server-sdk");
const moment = require("moment");
const { response, log, getRequestData } = require("../../utils");
const { User, Attendance } = require("../../models");

module.exports = async (ctx, next) => {
  let transaction;
  try {
    const db = cloud.database();
    transaction = await db.startTransaction();

    const data = getRequestData(ctx);
    const { title, file } = data;
    const { OPENID } = cloud.getWXContext();

    const { data: users } = await db
      .collection(User.__TABLE__)
      .where({
        openId: OPENID,
      })
      .get();

    const user = User(users[0]);
    const attendance = Attendance({
      title,
      file,
      date: moment().valueOf(),
    });

    if (
      user.lastAttendDate &&
      moment().diff(user.lastAttendDate || undefined, "days") < 1
    )
      return response({
        message: "今日已经打卡过了",
        code: -2,
        data: null,
      });

    const { _id: attendanceId } = await transaction
      .collection(Attendance.__TABLE__)
      .add({ data: attendance });

    if (moment().diff(moment(user.lastAttendDate || undefined), "days") < 2)
      user.continuousAttendCount = user.continuousAttendCount + 1;
    else user.continuousAttendCount = 0;
    user.attendanceIds = user.attendanceIds.concat(attendanceId);
    user.lastAttendDate = moment().valueOf();

    console.log(user);
    await transaction.collection(User.__TABLE__).doc(user._id).set({
      data: user,
    });

    await transaction.commit();
    ctx.body = response();
  } catch (err) {
    if (transaction) await transaction.rollback(-1);
    log.error({ message: err });
    ctx.body = response.Error(err);
  }

  await next();
};
