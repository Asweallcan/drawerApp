import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtIcon } from "taro-ui";
import pages from "../../router.json";
import "./style.less";

export type Page = keyof typeof pages;

interface Props {
  currentPage?: Page;
}

class Router extends Component<Props> {
  onRouteClick = (key, path) => {
    const { currentPage } = this.props;
    if (key === currentPage) {
      return;
    }
    Taro.redirectTo({
      url: path
    });
  };

  render() {
    const { currentPage } = this.props;

    return (
      <View className="router">
        {Object.keys(pages).map(key => {
          const { name, path, icon, size } = pages[key];
          const isActive = currentPage === key;
          return (
            <View
              key={key}
              className={`route ${isActive ? "active" : ""}`}
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
