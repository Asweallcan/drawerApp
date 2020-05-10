import { UserInfo } from "@tarojs/taro";

export interface SelfInfoResp extends UserInfo {
  lastAttendDate: number;
  openId: number;
  continuousAttendCount: number;
  followerIds: string[];
  followIds: string[];
  starIds: string[];
  commentIds: string[];
  staredIds: string[];
  commentedIds: string[];
  postIds: string[];
  messages: any[];
  registerDate: number;
  attended: boolean;
  _id: string;
}

export interface UserInfoWithId extends UserInfo {
  _id: string;
}
