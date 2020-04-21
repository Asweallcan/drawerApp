import Taro, { Component, Config } from "@tarojs/taro";
import { View, Button } from "@tarojs/components";
import { AtIcon } from "taro-ui";
import { request } from "@/utils";
import { BACKEND_ERROR } from "@/constants";

import "./style.less";

class Login extends Component {
  config: Config = {
    navigationBarBackgroundColor: "#fff"
  };

  onGetUserInfo = async () => {
    try {
      await request("user/register");
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
            <AtIcon prefixClass="icon" value="weixin" size={18} />
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
