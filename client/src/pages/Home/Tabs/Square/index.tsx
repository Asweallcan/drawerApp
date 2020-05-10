import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { request } from "@/utils";
import List from "./components/List";
import { Post } from "@/typings";

import "./style.less";

interface Props {
  tab: string;
  activeKey: string;
}

interface State {
  activeTab: number;
  currentPage: number;
  listData: Post[];
  lowerLoading: boolean;
}

const PAGE_SIZE = 20;

class Square extends Component<Props, State> {
  rendered = false;
  listCount = 0;

  state = {
    activeTab: 0,
    currentPage: 0,
    listData: [],
    lowerLoading: false
  };

  componentWillReceiveProps(nextProps) {
    const { tab, activeKey } = nextProps;

    if (!this.rendered && activeKey === tab) {
      this.rendered = true;
      this.fetchData();
    }
  }

  fetchData = async (append?) => {
    try {
      Taro.showLoading({
        title: "加载中"
      });
      const { listData, activeTab, currentPage } = this.state;
      const { data, count } = await request<{ data: Post[]; count: number }>(
        "post/list",
        {
          type: activeTab === 0 ? "all" : "follow",
          offset: currentPage * PAGE_SIZE,
          limit: PAGE_SIZE
        }
      );
      this.listCount = count;
      this.setState({
        listData: !!append ? (listData as Post[]).concat(data) : data,
        lowerLoading: false
      });
    } catch (err) {
    } finally {
      Taro.hideLoading();
    }
  };

  updateListData = (postId, data) => {
    const { listData } = this.state;
    this.setState({
      listData: listData.map((post: Post) =>
        post._id === postId ? data : post
      )
    });
  };

  onRefresherRefresh = () => {
    this.setState(
      {
        currentPage: 0
      },
      () => {
        this.fetchData();
      }
    );
  };

  onScrollToLower = () => {
    const { listData, currentPage } = this.state;
    if (listData.length >= this.listCount) return;
    this.setState(
      {
        currentPage: currentPage + 1,
        lowerLoading: true
      },
      () => {
        this.fetchData(true);
      }
    );
  };

  render() {
    const { activeTab, listData, lowerLoading } = this.state;

    const tabList = [{ title: "所有" }, { title: "关注" }];

    return (
      <View className="tab-sqaure">
        {this.rendered ? (
          <View style={{ height: "100%" }}>
            <View className="choose-type">
              {tabList.map((item, index) => {
                const { title } = item;
                return (
                  <View
                    className={`tab ${activeTab === index ? "active" : ""}`}
                    onClick={() => this.setState({ activeTab: index })}
                  >
                    {title}
                  </View>
                );
              })}
            </View>
            <List
              my-class="list"
              listData={listData}
              onRefresherRefresh={this.onRefresherRefresh}
              onScrollToLower={this.onScrollToLower}
              lowerLoading={lowerLoading}
              updateListData={this.updateListData}
            />
          </View>
        ) : null}
      </View>
    );
  }
}

export default Square;
