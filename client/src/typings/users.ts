import { UserInfo } from "@tarojs/taro";

export interface SelfInfoResp extends UserInfo {
  lastAttendDate: number;
  openId: number;
  continuousAttendCount: number;
  attendanceIds: string[];
  followerIds: string[];
  followIds: string[];
  starIds: string[];
  commentIds: string[];
  postIds: string[];
  messages: any[];
  registerDate: number;
  attended: boolean;
  _id: string;
}
