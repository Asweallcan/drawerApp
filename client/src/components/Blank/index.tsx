import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import IconFont from "../IconFont";

import "./style.less";

interface Props {}

class Blank extends Component<Props> {
  render() {
    return (
      <View className="blank">
        <IconFont name="yipiankongbaidedouding" size={240} />
        <View className="blank-text">暂无内容</View>
      </View>
    );
  }
}

export default Blank;
