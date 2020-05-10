import Taro, { Component } from "@tarojs/taro";
import { Tabs, Tabpane } from "./components";
import { Attendance, Square } from "./Tabs";
import tabs from "./tabs.json";
import "./style.less";

type ActiveKey = keyof typeof tabs;

interface Props {}

interface State {
  activeKey: ActiveKey;
}

class Home extends Component<Props, State> {
  state = {
    activeKey: "Attendance" as ActiveKey
  };

  render() {
    const { activeKey } = this.state;

    return (
      <Tabs
        tabs={tabs}
        activeKey={activeKey}
        setActiveKey={activeKey => this.setState({ activeKey })}
      >
        <Tabpane tab="Attendance" activeKey={activeKey}>
          <Attendance />
        </Tabpane>
        <Tabpane tab="Square" activeKey={activeKey}>
          <Square tab="Square" activeKey={activeKey} />
        </Tabpane>
      </Tabs>
    );
  }
}

export default Home;
