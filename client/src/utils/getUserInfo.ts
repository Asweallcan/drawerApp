import Taro, { UserInfo } from "@tarojs/taro";

const getUserInfo = () => {
  return new Promise<UserInfo>((resolve, reject) => {
    Taro.getSetting({
      success: settings => {
        if (!settings.authSetting["scope.userInfo"]) {
          Taro.navigateTo({
            url: "/pages/Login/index"
          });
        } else {
          Taro.getUserInfo({
            success: info => {
              resolve(info.userInfo);
            },
            fail: () => {
              reject();
            }
          });
        }
      },
      fail: () => {
        reject();
      }
    });
  });
};

export default getUserInfo;
