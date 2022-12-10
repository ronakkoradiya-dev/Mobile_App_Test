import React, { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider'

import { getServiceCall } from '../api/Webservice';
import { ApiList } from '../api/ApiList';

import { sizeWidth, sizeFont } from '../utils/Size';
import { Colors } from '../utils/Colors';
import { Images } from '../utils/Images';
import { Strings } from './../utils/Strings';

const UserDetails = ({ navigation, route }) => {

    const [userDetail, setUserDetail] = useState({})
    const [imgGalleryList, setImgGalleryList] = useState([])
    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        getUserListApiCall()
        getImgGalleryListApiCall()
    }, [])

    // Get user details api call
    const getUserListApiCall = async () => {

        getServiceCall(ApiList.GET_USERS + "/" + route.params?.id, "")
            .then(async responseJson => {
                if (responseJson?.data != null) {
                    setUserDetail(responseJson.data)
                }
            })
            .catch(error => {
                console.log(error.message)
            })
    };

    // Get image gallery api call
    const getImgGalleryListApiCall = async () => {

        getServiceCall("https://jsonplaceholder.typicode.com/photos", "", false)
            .then(async responseJson => {
                if (responseJson?.data != null) {
                    // NOTE  Filter data only 27 img list beacuse that api have 5000 image list
                    const tempData = responseJson.data.filter((obj, ind) => ind < 27)
                    var tempMainData = []
                    var mainData = []
                    var count = 8
                    for (var i = 0; i <= count; i++) {
                        tempMainData.push(tempData[i]);
                        if (i == count) {
                            i = count
                            count = count + 9
                            mainData.push({ subData: tempMainData })
                            tempMainData = []
                        }
                        if (count >= tempData.length) {
                            count = 8
                            break
                        }
                    }
                    setImgGalleryList(mainData)
                }
            })
            .catch(error => {
                console.log(error.message)
            })
    };

    // Render slinder images list
    const renderMainImgListItem = ({ item }) => (
        <View >
            <FlatList
                showsVerticalScrollIndicator={false}
                numColumns={3}
                columnWrapperStyle={styles.columnWrapperStyle}
                keyExtractor={(item, index) => index.toString()}
                data={item?.subData}
                renderItem={renderImgListItem}
            />

            {/* Custom pagination view */}
            <View style={styles.paginationContainer} >
                {imgGalleryList.map((obj, ind) => {
                    return (
                        <View style={[styles.dotStyl, { backgroundColor: ind == activeIndex ? Colors.THEME_COLOR : Colors.DIM_THEME_COLOR, width: ind == activeIndex ? sizeWidth(6) : sizeWidth(3), }]} />
                    )
                })}
            </View>
        </View>
    )

    // Render image list
    const renderImgListItem = ({ item }) => (
        <Image
            style={styles.imgBoxContainer}
            source={{ uri: item?.thumbnailUrl }}
        />
    )

    return (
        <ScrollView style={styles.container}>
            <View style={styles.headerContainer} >
                <Pressable
                    style={{
                        flex: 0.1,
                        paddingStart: sizeWidth(5),
                    }}
                    onPress={() => navigation.goBack()}>
                    <Image
                        source={Images.BACK_ICON}
                        resizeMode="contain"
                        style={styles.backIcon}
                    />
                </Pressable>
                <View style={styles.headerTitleContainer} >
                    <Text style={styles.headerTxt} >{Strings.PROFILE_DETAILS}</Text>
                </View>
            </View>
            <View style={styles.mainContainer} >
                <View>
                    <Image
                        source={{ uri: userDetail?.profilepicture }}
                        resizeMode="cover"
                        style={styles.userProfileImg}
                    />
                </View>
                <View style={styles.userDetailContianer} >
                    <Text style={styles.nameTxt} >
                        {userDetail?.name}
                    </Text>
                    <Text style={styles.emailTxt} >
                        {userDetail?.email}
                    </Text>
                    <Text style={styles.locationTxt} >
                        {userDetail?.location}
                    </Text>
                </View>
            </View>
            <View style={styles.galleryContainer} >
                <Text style={[styles.nameTxt, {
                    textAlign: 'left',
                    marginLeft: sizeWidth(2),
                    fontWeight: "400",
                }]} >{Strings.GALLERY}</Text>
                <View style={styles.listImgContainer} >
                    <AppIntroSlider
                        data={imgGalleryList}
                        renderItem={renderMainImgListItem}
                        pagingEnabled={true}
                        renderPagination={() => null}
                        keyExtractor={(item, index) => index.toString()}
                        showsHorizontalScrollIndicator={false}
                        onSlideChange={(index) => setActiveIndex(index)}
                        showDoneButton={false}
                        showNextButton={false}
                        showPrevButton={false}
                    />
                </View>
            </View>
        </ScrollView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        height: sizeWidth(13),
        flexDirection: 'row',
        alignItems: "center",
        borderBottomWidth: 0.5,
    },
    headerTxt: {
        color: Colors.LIGHT_GRAY_COLOR,
        fontFamily: "OpenSans-Regular",
        fontWeight: "700",
        fontSize: sizeFont(5),
        textAlign: 'center'
    },
    backIcon: {
        tintColor: Colors.LIGHT_GRAY_COLOR,
        width: sizeWidth(4),
        height: sizeWidth(4),
    },
    headerTitleContainer: {
        paddingRight: sizeWidth(15),
        flex: 0.9,
        justifyContent: "center",
    },
    mainContainer: {
        padding: sizeWidth(5),
        marginTop: sizeWidth(5)
    },
    userProfileImg: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        width: '100%',
        height: sizeWidth(50),
    },
    userDetailContianer: {
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        margin: sizeWidth(3),
        marginBottom: sizeWidth(4),
        backgroundColor: Colors.LIGHT_ORANGE_COLOR,
        borderRadius: 10,
        paddingBottom: sizeWidth(7),
        paddingTop: sizeWidth(5)
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
    galleryContainer: {
        paddingHorizontal: sizeWidth(5),
        flexGrow: 1,
        flex: 1,
    },
    listImgContainer: {
        marginTop: sizeWidth(5),
        flexGrow: 1,
        flex: 1
    },
    columnWrapperStyle: {
        alignItems: "center",
        justifyContent: "space-between"
    },
    paginationContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center',
        padding: sizeWidth(5)
    },
    dotStyl: {
        marginHorizontal: sizeWidth(1),
        height: sizeWidth(3),
        borderRadius: sizeWidth(5),
    },
    imgBoxContainer: {
        borderRadius: 15,
        margin: sizeWidth(1.5),
        width: sizeWidth(27),
        height: sizeWidth(27)
    },
    galleryTitle: {

    }
});

export default UserDetails;