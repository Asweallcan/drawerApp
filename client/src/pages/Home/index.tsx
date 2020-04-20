import Taro, { Component } from "@tarojs/taro";
import { View, OfficialAccount } from "@tarojs/components";
import { Tabs, Tabpane } from "../../components";
import { Clock, Square, Course } from "./Tabs";
import tabs from "./tabs.json";
import "./style.less";

type ActiveKey = keyof typeof tabs;

interface Props {}

interface State {
  activeKey: ActiveKey;
}

class Home extends Component<Props, State> {
  state = {
    activeKey: "Clock" as ActiveKey
  };

  render() {
    const { activeKey } = this.state;

    return (
      <View>
        <OfficialAccount
          onLoad={(...args) => {
            console.log(args);
          }}
          onError={(...args) => {
            console.log(args);
          }}
        >
          123
        </OfficialAccount>
        <Tabs
          tabs={tabs}
          activeKey={activeKey}
          setActiveKey={activeKey => this.setState({ activeKey })}
          iconSize={24}
        >
          <Tabpane tab="Clock" activeKey={activeKey}>
            <Clock></Clock>
          </Tabpane>
          <Tabpane tab="Square" activeKey={activeKey}>
            <Square></Square>
          </Tabpane>
          <Tabpane tab="Course" activeKey={activeKey}>
            <Course></Course>
          </Tabpane>
        </Tabs>
      </View>
    );
  }
}

export default Home;
