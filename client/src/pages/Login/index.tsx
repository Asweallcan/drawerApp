import Taro, { Component, Config } from "@tarojs/taro";
import { View, Button } from "@tarojs/components";
import { AtIcon } from "taro-ui";

import "./style.less";

class Login extends Component {
  config: Config = {
    navigationBarBackgroundColor: "#fff"
  };

  render() {
    return (
      <View className="login">
        <Button
          className="login-btn"
          openType="getUserInfo"
          onGetUserInfo={() => {
            Taro.navigateBack();
          }}
        >
          <AtIcon prefixClass="icon" value="weixin" size={18} />
          一键登录
        </Button>
      </View>
    );
  }
}

export default Login;
