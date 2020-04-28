import { UserInfo } from "@tarojs/taro";

const uuid = (userInfo: UserInfo) => {
  const { province, city } = userInfo;
  return (
    province +
    city +
    `${Date.now()}` +
    Math.floor(Math.random() * 10000000).toString()
  );
};

export default uuid;
