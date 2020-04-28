import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";

import "./style.less";

interface Props {}

class Divider extends Component<Props> {
  render() {
    const { children } = this.props;

    return <View className="divider">{children}</View>;
  }
}

export default Divider;
