import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import moment from 'moment';
import FastImage from 'react-native-fast-image'

export default class News extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          loading: false,
          data: [],
          page: 1,
          error: null,
          refreshing: false
        };
    }

    componentDidMount() {
        this.onFetch();

        //console.log('sources', this.props.sources);
    }

    onFetch() {
        const { page } = this.state;
        const { sources } = this.props;
        const baseUrl = `https://newsapi.org/v2/top-headlines?country=cn&apiKey=dbdebefd38ce4812b8ce0a3fb4f287a5&page=${page}&pageSize=20`;
        //console.log('sources', sources);

        let url = baseUrl;
        if (sources !== undefined) {
            url = `${baseUrl}&category=${sources}`;
        }

        this.setState({ loading: true });

        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log('news', data);

                this.setState({ 
                    //data: data.articles,
                    data: page === 1 ? data.articles : [...this.state.data, ...data.articles],
                    error: data.error || null,
                    loading: false,
                    refreshing: false
                });
            })
            .catch(error => {
                this.setState({ error, loading: false });
            });
    }

    handleRefresh = () => {
        this.setState(
          {
            page: 1,
            refreshing: true
          },
          () => {
            this.onFetch();
          }
        );
      };

      handleLoadMore = () => {
        this.setState(
          {
            page: this.state.page + 1
          },
          () => {
            this.onFetch();
          }
        );
      };

      renderFooter = () => {
        if (!this.state.loading) return null;
    
        return (
          <View
            style={{
              paddingVertical: 20,
              borderTopWidth: 1,
              borderColor: "#CED0CE"
            }}
          >
            <ActivityIndicator animating size="large" />
          </View>
        );
      };

    renderSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              //width: "100%",
              backgroundColor: "#ecf0f1",
              //marginLeft: "14%"
            }}
          />
        );
      };

      openNews(url) {
        //console.log('news', this.props.navigation);
        this.props.navigation.navigate('Webview', { source: url });
      }

    render() {
        const { data, refreshing } = this.state;

        return (
                <View style={styles.container}>
                    <FlatList
                        data={data}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) =>
                            <TouchableOpacity style={styles.flatview} onPress={() => this.openNews(item.url)}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 2 }}>
                                        <Text style={styles.h2text}>{item.title}</Text>

                                        <View style={styles.dateAndAuthor}>
                                            <Text style={[styles.dateAndAuthorText, { marginRight: 15 }]}>{moment(item.publishedAt).calendar()}</Text>

                                            {
                                                (item.author !== null) && (item.author !== '') &&
                                                <Text style={styles.dateAndAuthorText}>{`作者: ${item.author}`}</Text>
                                            }
                                        </View>
                                    </View>

                                    {
                                        (item.urlToImage !== null) && (item.urlToImage !== '') &&
                                        <FastImage
                                            style={{ width: 60, height: 60, flex: 1 }}
                                            source={{
                                                uri: item.urlToImage,
                                                priority: FastImage.priority.normal,
                                            }}
                                            resizeMode={FastImage.resizeMode.contain}
                                        />
                                    }
                                </View>

                                {
                                        (item.description !== null) && (item.description !== '') &&
                                        <Text style={styles.content}>{item.description}</Text>
                                }
                            </TouchableOpacity>
                        }
                        keyExtractor={(item, index) => index.toString()}
                        ItemSeparatorComponent={this.renderSeparator}
                        ListFooterComponent={this.renderFooter}
                        onRefresh={this.handleRefresh}
                        refreshing={refreshing}
                        onEndReached={this.handleLoadMore}
                        onEndReachedThreshold={0.5}
                    />
                </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 15,
      justifyContent: 'center',
      alignItems: 'center',
    },
    h2text: {
      fontFamily: 'Helvetica',
      fontSize: 18,
      fontWeight: '500',
      color: '#262626'
    },
    flatview: {
      justifyContent: 'center',
      paddingVertical: 15,
      borderRadius: 2,
    },
    content: {
      fontFamily: 'Verdana',
      fontSize: 14,
      fontWeight: '300',
      color: '#4d4d4d'
    },
    dateAndAuthor: {
        flexDirection: 'row',
        marginBottom: 15
    },
    dateAndAuthorText: {
        fontSize: 12,
        color: 'grey'
    }
  });