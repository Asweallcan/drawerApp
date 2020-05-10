const { checkParams } = require("../utils");

/**
 * 
  date: number; // 时间
  postId: number; // 被点赞的帖子
  staredUserId: number; // 被点赞的人
  starUserId: number; // 点赞的人
 */
const Star = (params) => {
  if (!checkParams(params, ["date", "postId", "staredUserId", "starUserId"]))
    throw "参数错误";
  return {
    ...params,
  };
};

Star.__TABLE__ = "Stars";

module.exports = Star;
