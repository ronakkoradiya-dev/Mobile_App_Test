import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { getServiceCall } from '../api/Webservice';
import { ApiList } from '../api/ApiList';

import { sizeWidth, sizeFont } from '../utils/Size';
import { Colors } from '../utils/Colors';
import { Images } from '../utils/Images';
import { Strings } from '../utils/Strings';
import { useFocusEffect } from '@react-navigation/native';

var page = 1 // Page variable for the pagination

const Home = ({ navigation }) => {

    const [userList, setUserList] = useState([])
    const [loadMore, setLoadMore] = useState(false);
    const [totalPage, setTotalPage] = useState(0);

    useFocusEffect(
        useCallback(() => {
            page = 1
            getUserListApiCall()
        }, [],)
    )

    // Get userlist api method
    const getUserListApiCall = async () => {

        const data = { page }

        getServiceCall(ApiList.GET_USERS, data)
            .then(async responseJson => {
                if (responseJson?.data?.data != null) {
                    if (page == 1) {
                        setUserList(responseJson.data?.data)
                    } else {
                        const mergeData = [...userList, ...responseJson.data?.data]
                        setUserList(mergeData)
                    }
                    page = page + 1
                    setTotalPage(responseJson.data?.total_pages)
                    setLoadMore(false)
                }
            })
            .catch(error => {
                console.log(error.message)
            })
    };

    // Load more Data Handler
    const handleLoadMore = () => {
        setLoadMore(true)
        getUserListApiCall()
    }

    // Loader footer component
    const listLoaderFooterComponent = () => (
        loadMore == true ?
            <View style={{ padding: sizeWidth(5) }} >
                <ActivityIndicator color={Colors.THEME_COLOR} />
            </View>
            : null
    )

    // Render userlist item
    const renderUserListItem = ({ item }) => (
        <Pressable
            onPress={() => {
                navigation.navigate("UserDetails", {
                    id: item?.id
                })
            }}
            style={styles.itemListContainer} >
            <View>
                <Image
                    source={{ uri: item?.profilepicture }}
                    resizeMode="cover"
                    style={styles.profileImg}
                />
            </View>
            <View>
                <Image
                    source={Images.PLAY_ICON}
                    resizeMode="contain"
                    style={styles.playIcon}
                />
                <View style={{ paddingTop: sizeWidth(5) }} >
                    <Text style={styles.nameTxt} >
                        {item?.name}
                    </Text>
                    <Text style={styles.emailTxt} >
                        {item?.email}
                    </Text>
                    <Text style={styles.locationTxt} >
                        {item?.location}
                    </Text>
                </View>
                <LinearGradient
                    colors={[Colors.INPUT_TEXT_COLOR, Colors.THEME_SECOND_COLOR]}
                    style={styles.viewBtnContianer}>
                    <Text style={[styles.emailTxt, {
                        color: Colors.WHITE_COLOR,
                    }]} >{Strings.VIEW_PROFILE}</Text>
                </LinearGradient>
            </View>
        </Pressable>
    )

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer} >
                <View style={styles.headerTextView} >
                    <Text style={styles.headerTxt} >{Strings.HIRE_THE_ART}</Text>
                </View>
                <Pressable
                    style={styles.addBtnView}
                    onPress={() => navigation.navigate("AddUser")}>
                    <Image
                        source={Images.ADD_USER}
                        resizeMode="contain"
                        style={styles.addIcon}
                    />
                </Pressable>
            </View>
            <View style={{ flex: 1, flexGrow: 1, }} >
                <FlatList
                    contentContainerStyle={{ paddingTop: sizeWidth(2), }}
                    data={userList}
                    renderItem={renderUserListItem}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReachedThreshold={0.01}
                    onEndReached={() => { page != totalPage && loadMore == false ? handleLoadMore() : null }}
                    ListFooterComponent={listLoaderFooterComponent}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        flex: 0.1,
        flexDirection: 'row',
        alignItems: "center",
        borderBottomWidth: 0.5,
    },
    headerTextView: {
        paddingLeft: sizeWidth(15),
        flex: 0.9,
        justifyContent: "center",
    },
    headerTxt: {
        color: Colors.LIGHT_GRAY_COLOR,
        fontFamily: "OpenSans-Regular",
        fontWeight: "700",
        fontSize: sizeFont(6),
        textAlign: 'center'
    },
    addBtnView: {
        flex: 0.1,
        paddingEnd: sizeWidth(5),
    },
    addIcon: {
        width: sizeWidth(8),
        height: sizeWidth(8),
    },
    itemListContainer: {
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
        marginHorizontal: sizeWidth(5), marginBottom: sizeWidth(4), backgroundColor: Colors.LIGHT_ORANGE_COLOR, borderRadius: 10
    },
    profileImg: {
        width: '100%',
        height: sizeWidth(60),
    },
    playIcon: {
        position: "absolute",
        top: -22,
        left: sizeWidth(5),
        width: sizeWidth(12),
        height: sizeWidth(12),
    },
    viewBtnContianer: {
        width: sizeWidth(40),
        height: sizeWidth(10),
        alignItems: "center",
        justifyContent: "center",
        alignSelf: 'center',
        marginVertical: sizeWidth(5),
        borderRadius: 10,
    },
    nameTxt: {
        textAlign: 'center',
        color: Colors.LIGHT_GRAY_COLOR,
        fontFamily: "OpenSans-Regular",
        fontWeight: "700",
        fontSize: sizeFont(5),
        textAlign: 'center'
    },
    emailTxt: {
        textAlign: 'center',
        color: Colors.LIGHT_GRAY_COLOR,
        fontFamily: "OpenSans-Regular",
        fontWeight: "400",
        marginVertical: sizeWidth(2),
        fontSize: sizeFont(4),
        textAlign: 'center'
    },
    locationTxt: {
        textAlign: 'center',
        color: Colors.LIGHT_GRAY_COLOR,
        fontFamily: "OpenSans-Regular",
        fontWeight: "300",
        marginVertical: sizeWidth(2),
        fontSize: sizeFont(4),
        textAlign: 'center'
    },
});

export default Home;