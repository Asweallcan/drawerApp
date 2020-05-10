const cloud = require("wx-server-sdk");
const { response, getRequestData } = require("../../utils");
const { User, Post, Star, Message } = require("../../models");
const moment = require("moment");

module.exports = async (ctx, next) => {
  let transaction;
  try {
    const db = cloud.database();
    transaction = await db.startTransaction();

    const { postId } = getRequestData(ctx);
    const { OPENID } = cloud.getWXContext();
    const date = moment().valueOf();

    const { data } = await db.collection(Post.__TABLE__).doc(postId).get();
    const post = Post(data);

    const [self, postUser] = await Promise.all([
      db
        .collection(User.__TABLE__)
        .where({
          openId: OPENID,
        })
        .get(),
      db.collection(User.__TABLE__).doc(post.userId).get(),
    ]).then(([{ data: data1 }, { data: data2 }]) => {
      return [User(data1[0]), User(data2)];
    });

    const { _id: starId } = await transaction.collection(Star.__TABLE__).add({
      data: Star({
        date,
        postId,
        staredUserId: postUser._id,
        starUserId: self._id,
      }),
    });

    post.starIds = post.starIds.concat(starId);
    self.starIds = self.starIds.concat(starId);
    if (postUser._id !== self._id) {
      postUser.staredIds = postUser.staredIds.concat(starId);
      postUser.messages = postUser.messages.concat(
        Message({
          date,
          type: "star",
          postId,
          userId: self._id,
          content: "",
        })
      );
    } else {
      self.staredIds = self.staredIds.concat(starId);
    }

    await transaction
      .collection(User.__TABLE__)
      .doc(self._id)
      .set({ data: self });
    if (postUser._id !== self._id) {
      await transaction
        .collection(User.__TABLE__)
        .doc(postUser._id)
        .set({ data: postUser });
    }
    await transaction
      .collection(Post.__TABLE__)
      .doc(postId)
      .set({ data: post });

    const newPost = await transaction
      .collection(Post.__TABLE__)
      .doc(postId)
      .get()
      .then(({ data }) => ({
        ...data,
        stared: true,
        isSelf: postUser._id === self._id,
        userInfo: {
          avatarUrl: postUser.avatarUrl,
          nickName: postUser.nickName,
          _id: postUser._id,
        },
      }));

    await transaction.commit();

    ctx.body = response({
      data: newPost,
    });
  } catch (err) {
    if (transaction) transaction.rollback();
    throw err;
  }

  await next(); // 执行下一中间件
};
