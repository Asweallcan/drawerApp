const cloud = require("wx-server-sdk");
const { response, getRequestData, log } = require("../../utils");
const { User, Post } = require("../../models");

module.exports = async (ctx, next) => {
  try {
    const db = cloud.database();
    const _ = db.command;
    const $ = db.command.aggregate;

    const { offset, limit, type = "all" } = getRequestData(ctx);

    const { OPENID } = cloud.getWXContext();
    const { data } = await db
      .collection(User.__TABLE__)
      .where({ openId: OPENID })
      .get();
    const self = User(data[0]);
    const { _id, followIds, starIds } = self;

    const { total: count } = await db
      .collection(Post.__TABLE__)
      .where(
        type === "all"
          ? { isPublic: true }
          : { isPublic: true, userId: _.in(followIds) }
      )
      .count();
    const list = await db
      .collection(Post.__TABLE__)
      .aggregate()
      .match(
        type === "all"
          ? {
              isPublic: true,
            }
          : {
              isPublic: true,
              userId: $.in(followIds),
            }
      )
      .skip(offset)
      .limit(limit)
      .lookup({
        from: User.__TABLE__,
        let: {
          userId: "$userId",
        },
        pipeline: $.pipeline()
          .match(_.expr($.eq(["$_id", "$$userId"])))
          .project({
            _id: 1,
            nickName: 1,
            avatarUrl: 1,
          })
          .done(),
        as: "userInfo",
      })
      .addFields({
        isSelf: $.eq(["$userId", _id]),
        stared: $.setIntersection(["$starIds", starIds]),
      })
      .end()
      .then(({ list }) => {
        return list.map((post) => ({
          ...post,
          stared: post.stared.length > 0,
          userInfo: post.userInfo[0],
        }));
      });

    ctx.body = response({
      data: {
        data: list,
        count,
      },
    });
  } catch (err) {
    throw err;
  }

  await next();
};
