import Taro, { Component } from "@tarojs/taro";
import { View, Button } from "@tarojs/components";
import { request } from "@/utils";
import { BACKEND_ERROR } from "@/constants";
import { IsAttendedResp } from "@/typings";

import "./style.less";

interface Props {}

class Attendance extends Component<Props> {
  toAttendance = async () => {
    try {
      const settings = await Taro.getSetting();
      if (!settings["authSetting"]["scope.userInfo"]) {
        Taro.navigateTo({
          url: "/pages/Login/index"
        });
      } else {
        const { isAttended } = await request<IsAttendedResp>(
          "attendance/isAttended"
        );
        if (!isAttended) {
          Taro.navigateTo({
            url: "/pages/Attendance/index"
          });
        } else {
          Taro.showToast({
            title: "今日已经打卡，请明天再来",
            icon: "none"
          });
        }
      }
    } catch (err) {
      console.error(err);
      Taro.showToast({
        title: BACKEND_ERROR,
        icon: "none"
      });
    }
  };

  render() {
    return (
      <View className="tab-attendance">
        <View className="new-attendance">
          <Button
            className="new-attendance-btn"
            type="primary"
            onClick={this.toAttendance}
          >
            打卡
          </Button>
        </View>
        <View className="attendance-history"></View>
      </View>
    );
  }
}

export default Attendance;
