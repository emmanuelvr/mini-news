/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Component } from 'react';
import { ListView } from 'react-native';
import { Button, Icon, List, ListItem } from 'native-base';
// interfaces
import Post from '../../../interfaces/post';
// components
import PostListItem from '../../../components/post-list-item';

interface Props {
  onPressLeft: (item: Post) => void;
  onPressRight: (item: Post, rowMap: any) => void;
  onPressItem: (item: Post) => void;
  items: Post[];
}

export default class PostsList extends Component<Props> {
  dataSource: any;

  constructor(props: any) {
    super(props);
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2): boolean => r1 !== r2 });
    this.state = {
      listViewData: props.items,
    };
  }

  deleteRow(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.listViewData];
    newData.splice(rowId, 1);
    this.setState({ listViewData: newData });
  }

  render(): JSX.Element {
    const { items, onPressLeft, onPressRight } = this.props;

    return (
      <List
        leftOpenValue={75}
        rightOpenValue={-75}
        dataSource={this.dataSource.cloneWithRows(items)}
        renderRow={data => <PostListItem post={data} />}
        renderLeftHiddenRow={data => (
          <Button full onPress={() => alert(data)}>
            <Icon active name="information-circle" />
          </Button>
        )}
        renderRightHiddenRow={(data, secId, rowId, rowMap) => (
          <Button full danger onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
            <Icon active name="trash" />
          </Button>
        )}
      />
    );
  }
}
