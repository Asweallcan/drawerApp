import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtIcon } from "taro-ui";
import "./style.less";

export type Page = "clock" | "square" | "course";

interface Props {
  currentPage?: Page;
}

const pages = [
  {
    key: "clock",
    name: "打卡",
    icon: "icon-heart",
    size: 18,
    path: "pages/Clock/index"
  },
  {
    key: "square",
    name: "广场",
    icon: "icon-voice",
    size: 20,
    path: "pages/Squre/index"
  },
  {
    key: "course",
    name: "教程",
    icon: "shouhuiban",
    size: 24,
    path: "pages/Course/index"
  }
];

class Router extends Component<Props> {
  onRouteClick = (key, path) => {
    const { currentPage } = this.props;
    if (key === currentPage) {
      return;
    }
    Taro.navigateTo({
      url: path
    });
  };

  render() {
    const { currentPage } = this.props;

    return (
      <View className="router">
        {pages.map(page => {
          const { key, name, path, icon, size } = page;
          return (
            <View
              key={key}
              className={`route ${currentPage === key ? "active" : ""}`}
              onClick={() => this.onRouteClick(key, path)}
            >
              <AtIcon prefixClass="icon" value={icon} size={size} />
              <View className="route-name">{name}</View>
            </View>
          );
        })}
      </View>
    );
  }
}

export default Router;
