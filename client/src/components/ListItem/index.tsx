import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import moment from "moment";
import { Attendance } from "@/typings";

import "./style.less";

interface Props extends Attendance {
  onClick: () => void;
}

class List extends Component<Props> {
  render() {
    const { file, title, date, onClick } = this.props;

    return (
      <View className="common-list-item" hoverClass="clicked" onClick={onClick}>
        <Image src={file} mode="aspectFill" className="img" />
        <View className="info">
          <View className="title">{title}</View>
          <View className="date">
            {moment(date).format("YYYY-MM-DD HH:mm:ss")}
          </View>
        </View>
      </View>
    );
  }
}

export default List;
