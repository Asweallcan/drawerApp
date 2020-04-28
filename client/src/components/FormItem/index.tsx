import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";

import "./style.less";

interface Props {
  title: string;
  required?: boolean;
  error?: boolean;
}

class Attendance extends Component<Props> {
  render() {
    const { children, required, title, error } = this.props;
    return (
      <View
        className={`form-item ${required ? "required" : ""} ${
          error ? "has-error" : ""
        }`}
      >
        <View className="form-item-title">{title}</View>
        <View className="form-item-body">{children}</View>
      </View>
    );
  }
}

export default Attendance;
