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
  onPressRight: (item: Post) => void;
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

  deleteRow = (data, secId, rowId, rowMap): void => {
    const { onPressRight } = this.props;
    rowMap[`${secId}${rowId}`].props.closeRow();
    onPressRight(data);
  };

  render(): JSX.Element {
    const { items, onPressLeft, onPressItem } = this.props;

    return (
      <List
        leftOpenValue={75}
        rightOpenValue={-75}
        dataSource={this.dataSource.cloneWithRows(items)}
        renderRow={(data: Post): JSX.Element => <PostListItem onPress={onPressItem} post={data} />}
        renderLeftHiddenRow={(data: Post): JSX.Element => (
          <Button full onPress={(): void => onPressLeft(data)}>
            <Icon active name={`star${!data.isFavorite ? '-outline' : ''}`} />
          </Button>
        )}
        renderRightHiddenRow={(data: Post, secId, rowId, rowMap): JSX.Element => (
          <Button full danger onPress={(): void => this.deleteRow(data, secId, rowId, rowMap)}>
            <Icon active name="trash" />
          </Button>
        )}
      />
    );
  }
}
