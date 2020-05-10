import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";

import "./style.less";

interface Props {
  tab: string;
  activeKey: string;
}

class Tabpane extends Component<Props> {
  render() {
    const { children, tab, activeKey } = this.props;

    return (
      <View className={`tabpane ${activeKey === tab ? "active" : ""}`}>
        {children}
      </View>
    );
  }
}

export default Tabpane;
