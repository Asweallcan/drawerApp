import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";

import "./style.less";

interface Props {
  required?: boolean;
  title: string;
}

class Attendance extends Component<Props> {
  render() {
    const { children, required, title } = this.props;
    return (
      <View className={`form-item ${required ? "required" : ""}`}>
        <View className="form-item-title">{title}</View>
        <View className="form-item-body">{children}</View>
      </View>
    );
  }
}

export default Attendance;
