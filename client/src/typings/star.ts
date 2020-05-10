import { UserInfoWithId } from "./users";

export interface Star {
  date: number; // 时间
  starUserId: string;
  starUserInfo: UserInfoWithId; // 点赞的人
  staredUserId: string;
  staredUserInfo: UserInfoWithId; // 被点赞的人
  postId: number; // 被点赞的帖子
  userId: number; // 被点赞的人
  _id: string;
}
