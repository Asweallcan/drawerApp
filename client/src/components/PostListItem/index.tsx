import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import moment from "moment";
import { Post } from "@/typings";
import CustomImage from "@/components/CustomImage";

import "./style.less";

interface Props extends Post {
  onClick: (any) => void;
}

class PostListItem extends Component<Partial<Props>> {
  render() {
    const { file, title, isPublic, date, onClick } = this.props;

    return (
      <View className="common-list-item" hoverClass="clicked" onClick={onClick}>
        <CustomImage src={file!} mode="aspectFill" my-class="img" />
        <View className="info">
          <Text
            className="title"
            style={{
              textOverflow: "ellipsis",
              display: "-webkit-box",
              overflow: "hidden",
              // @ts-ignore
              "-webkit-line-clamp": 3,
              "-webkit-box-orient": "vertical"
            }}
          >
            {title}
          </Text>
          <View className="status">
            <Text className="is-public">
              {isPublic ? "所有人可见" : "仅自己可见"}
            </Text>
            <Text className="date">
              {moment(date).format("YYYY-MM-DD HH:mm:ss")}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default PostListItem;
