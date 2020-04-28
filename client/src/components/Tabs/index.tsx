import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { IconFont } from "@/components";
import colors from "@/style/constants";

import "./style.less";

interface Props {
  activeKey: string;
  setActiveKey: any;
  iconSize?: number;
  tabs: {
    [key: string]: {
      name: string;
      icon: string;
    };
  };
}

class Tabs extends Component<Props> {
  render() {
    const {
      activeKey,
      tabs = {},
      iconSize,
      children,
      setActiveKey
    } = this.props;
    const tabKeys = Object.keys(tabs);

    return (
      <View className="tabs">
        <View className="body">{children}</View>
        <View className="footer">
          {tabKeys.map(tabKey => {
            const { icon, name } = tabs[tabKey];
            return (
              <View
                key={tabKey}
                className={`tab-item ${activeKey === tabKey ? "active" : ""}`}
                onClick={() => {
                  setActiveKey(tabKey);
                }}
              >
                <IconFont
                  name={icon as any}
                  size={iconSize || 60}
                  color={activeKey === tabKey ? colors.THEME_COLOR : "#000"}
                />
                <View className="tab-name">{name}</View>
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}

export default Tabs;
