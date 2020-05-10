const { checkParams } = require("../utils");

/**
  nickName,
  avatarUrl,
  openId,
  lastAttendDate = null,
  continuousAttendCount = 0,
  followerIds = [],
  followIds = [],
  starIds = [],
  commentIds = [],
  postIds = [],
  messages = [],
  registerDate = Date.now(),
  _id,
 */

const User = (params) => {
  if (!checkParams(params, ["nickName", "avatarUrl", "openId"]))
    throw "参数错误";

  const {
    nickName,
    avatarUrl,
    openId,
    lastAttendDate = null,
    continuousAttendCount = 0,
    followerIds = [],
    followIds = [],
    starIds = [],
    commentIds = [],
    staredIds = [],
    commentedIds = [],
    postIds = [],
    messages = [],
    registerDate = Date.now(),
    _id,
  } = params;

  return {
    nickName,
    avatarUrl,
    openId,
    lastAttendDate,
    continuousAttendCount,
    followerIds,
    followIds,
    starIds,
    commentIds,
    staredIds,
    commentedIds,
    postIds,
    messages,
    registerDate,
    _id,
  };
};

User.__TABLE__ = "Users";

module.exports = User;
