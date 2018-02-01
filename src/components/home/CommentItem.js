// Copyright (c) 2018 by monster1935. All Rights Reserved.
// 评论区单条评论组件
import React, { Component } from 'react';
import { Image, Text, View, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import 'moment/locale/zh-cn';
import HTMLView from 'react-native-htmlview';
import InlineImage from '../common/InlineImage';
import PostStyle from './PostStyle';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 10,
  }
});

class CommentItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reply: {}
    };
  }

  componentWillMount() {
    this.setState({
      reply: this.props.reply,
    });
  }

  renderNode(node,index) {
    if (node.name == 'img') {
      const { src } = node.attribs;
      let uri = src;
      if (!src.includes('http')) {
        uri = 'http:' + src;
      }
      const { width } = Dimensions.get('window');
      return (
        <InlineImage
          source={{uri: uri}}
          key={index}
          style={{width: width - 30, height: 200}}
          resizeMode='cover'
        />
      )
    }
  }

  render() {
    const { reply }  = this.state;
    return (
      <View style={styles.container}>
        <Image
          source={{'uri': reply.author.avatar_url}}
          style={styles.avatar}
        />
      <View style={{flex: 1, borderBottomWidth: 1, borderBottomColor: '#eee'}}>
          <Text
            style={{fontSize: 12, color: '#333', marginBottom: 6}}
          >
            {reply.author.loginname}
          </Text>
          <HTMLView value={reply.content} stylesheet={PostStyle} renderNode={this.renderNode}>
          </HTMLView>
          <View
            style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}
          >
            <Text
              style={{fontSize: 12}}
            >
              {moment(reply.create_at).fromNow()}
            </Text>
            <View
              style={{flexDirection: 'row', marginBottom: 6}}
            >
              <Icon name="md-thumbs-up" size={16} color={'#ccc'}></Icon>
              <Text
                style={{marginLeft: 6,fontSize: 12, color: '#ccc'}}
              >
                {reply.ups.length}
              </Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
};

export default CommentItem;
