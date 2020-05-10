const cloud = require("wx-server-sdk");
const {
  response,
  getRequestData,
  checkParams,
  getAllInIds,
} = require("../../utils");
const { User, Post, Comment, Star } = require("../../models");

module.exports = async (ctx, next) => {
  try {
    const db = cloud.database();
    const _ = db.command;

    const data = getRequestData(ctx);

    if (!checkParams(data, ["id"])) throw "参数错误";

    const { id } = data;

    const { data: post } = await db.collection(Post.__TABLE__).doc(id).get();
    const { userId, commentIds, starIds } = Post(post);
    const [userInfo, comments, stars] = await Promise.all([
      db
        .collection(User.__TABLE__)
        .doc(userId)
        .field({ nickName: true, avatarUrl: true, _id: true })
        .get(),
      getAllInIds(Comment.__TABLE__, commentIds, {
        field: "date",
        order: "desc",
      }),
      getAllInIds(Star.__TABLE__, starIds, { field: "date", order: "desc" }),
    ]).then(async ([userInfo, allComments, allStars]) => {
      return Promise.all([
        Promise.resolve(userInfo.data),
        await Promise.all(
          allComments.data.map(async (comment) => {
            const { commentUserId, replyUserId } = comment;
            const [
              { data: commentUserInfo },
              { data: replyUserInfo },
            ] = await Promise.all(
              db
                .collection(User.__TABLE__)
                .doc(commentUserId)
                .field({ nickName: true, avatarUrl: true, _id: true })
                .get(),
              db
                .collection(User.__TABLE__)
                .doc(replyUserId)
                .field({ nickName: true, avatarUrl: true, _id: true })
                .get()
            );
            return {
              ...comment,
              commentUserInfo,
              replyUserInfo,
            };
          })
        ),
        await Promise.all(
          allStars.data.map(async (star) => {
            const { starUserId } = star;
            const { data: starUserInfo } = await db
              .collection(User.__TABLE__)
              .doc(starUserId)
              .field({ nickName: true, avatarUrl: true, _id: true })
              .get();
            return {
              ...star,
              starUserInfo,
            };
          })
        ),
      ]);
    });

    ctx.body = response({
      data: {
        ...post,
        userInfo,
        comments,
        stars,
      },
    });
  } catch (err) {
    throw err;
  }

  await next();
};
