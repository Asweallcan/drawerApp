import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";

import "./style.less";

interface Props {}

class Clock extends Component<Props> {
  render() {
    return <View>clock</View>;
  }
}

export default Clock;
