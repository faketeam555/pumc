import React from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { isFunction } from "../../utilities";
import styles from "../../styles";

/**
 *  data :- array
 *  renderNoData :- function :- if data is empty then shows this component
 *  renderRow :- function(rowData, data) :- render the List's single Item.
 *  rowTouch :- function(rowData, data) :- call the onPress function for row.
 *  page_size :- data to be shown on a list at starting.
 *  action :- function to be called when list end is reached or, user refreshes the screen.
 * */

export default class ListView extends React.PureComponent {
  constructor(props) {
    super(props);
    let { page_size = 10, pagination = {}, data = [] } = props;
    pagination = pagination || {};
    data = data || [];
    let { totalRecords = 10, maximumPages = 1, pageNumber = 1 } = pagination;

    this.state = {
      offset: 0,
      page_number: 1,
      page_size: page_size ? page_size : 10,
      refreshing: false
    };

    this.onEndReachedCalled = false;
    this.fetchedAllData = ( data.length == totalRecords || maximumPages == pageNumber );
  }

  async componentDidMount() {
    let { action } = this.props;
    let { page_number, page_size } = this.state;

    if (isFunction(action)) {
      action({ page_size, page_number });
    }
  }

  componentWillReceiveProps(nextProps) {
    let { data, pagination } = nextProps;
    pagination = pagination || {};
    let { totalRecords = 10, maximumPages = 1, pageNumber = 1 } = pagination;

    if (data && data.length <= totalRecords) {
      this.onEndReachedCalled = false;
      this.fetchedAllData = ( data.length == totalRecords || maximumPages == pageNumber );
    } else {
      this.fetchedAllData = true
    }

    if (this.state.refreshing) {
      this.state.refreshing = false;
    }
  }

  renderNoData = () => {
    const { renderNoData } = this.props;
    if (isFunction(renderNoData)) {
      return renderNoData();
    }
    return <View/>;
  };

  renderItem = ({ item, index }) => {
    let { rowTouch, renderRow, data } = this.props;

    if (isFunction(renderRow)) {
      if (isFunction(rowTouch)) {
        return (
          <TouchableOpacity activeOpacity={0.6} onPress={() => rowTouch(item, data)}>
            {renderRow(item, data, index)}
          </TouchableOpacity>
        );
      } else {
        return renderRow(item, data, index);
      }
    } else {
      return <View/>;
    }
  };

  keyExtractor = item => {
    const { keyExtractor } = this.props;

    if (isFunction(keyExtractor)) {
      return keyExtractor(item);
    }
    return item._id ? item._id : JSON.stringify(item);
  };

  onEndReached = async info => {
    let { page_number, page_size } = this.state;
    let { action, data } = this.props;

    if (!this.fetchedAllData && !this.onEndReachedCalled && isFunction(action)) {
      this.onEndReachedCalled = true;
      this.state.page_number = ++page_number;

      action({ page_size, page_number, oldData: data });
    }
  };

  _onRefresh = () => {
    let { action, page_size } = this.props;

    if (isFunction(action)) {
      this.setState({
        refreshing: true,
        page_number: 1,
        page_size: page_size ? page_size : 10
      });
      this.onEndReachedCalled = false;
      this.fetchedAllData = false;
      action({ page_number: 1, page_size: page_size, refreshing: true });
      this.setState({ refreshing: false });
    }
  };

  render() {
    let {
      data,
      touchableNativeFeedback = false,
      renderRow,
      rowTouch,
      keyExtractor,
      removeClippedSubviews = true,
      ItemSeparatorComponent,
      ...otherListProps
    } = this.props;
    data = data ? data : [];

    if (!ItemSeparatorComponent) {
      ItemSeparatorComponent = () => <View style={[styles.clear, styles.bgLightGray]}/>;
    }

    return (
      <FlatList
        refreshing={this.state.refreshing}
        onRefresh={this._onRefresh}
        keyExtractor={this.keyExtractor}
        ListEmptyComponent={this.renderNoData}
        ItemSeparatorComponent={ItemSeparatorComponent}
        data={data}
        renderItem={this.renderItem}
        onEndReachedThreshold={0.2}
        onEndReached={this.onEndReached}
        {...otherListProps}
      />
    );
  }
}
