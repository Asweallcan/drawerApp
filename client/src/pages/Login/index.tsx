import Taro, { Component, Config } from "@tarojs/taro";
import { View, Button } from "@tarojs/components";
import { request } from "@/utils";
import { BACKEND_ERROR } from "@/constants";
import { IconFont } from "@/components";

import "./style.less";

class Login extends Component {
  config: Config = {
    navigationBarBackgroundColor: "#fff"
  };

  onGetUserInfo = async ({ detail: { userInfo } }) => {
    try {
      Taro.showLoading({
        title: "加载中"
      });
      await request("user/register", userInfo);
      Taro.showToast({
        title: "登陆成功"
      });
      Taro.navigateBack();
    } catch (err) {
      console.error(err);
      Taro.showToast({
        title: BACKEND_ERROR,
        icon: "none"
      });
    } finally {
      Taro.hideLoading();
    }
  };

  render() {
    return (
      <View className="page-login">
        <View className="btn-group">
          <Button
            className="btn login-btn"
            openType="getUserInfo"
            onGetUserInfo={this.onGetUserInfo}
          >
            <IconFont name="weixin" size={40} color="#fff" />
            一键登录
          </Button>
          <Button
            className="btn cancel-btn"
            onClick={() => Taro.navigateBack()}
          >
            取消
          </Button>
        </View>
      </View>
    );
  }
}

export default Login;
