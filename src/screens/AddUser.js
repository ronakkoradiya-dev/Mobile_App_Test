import React, { useState } from 'react';
import { Alert, Image, Pressable, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { postServiceCall } from '../api/Webservice';
import { ApiList } from '../api/ApiList';

import { sizeWidth, sizeFont } from './../utils/Size';
import { Colors } from './../utils/Colors';
import { Images } from './../utils/Images';
import { Strings } from './../utils/Strings';


const AddUser = ({ navigation }) => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [location, setLocation] = useState("")

    //Check validation handller
    const addUserHandler = () => {
        if (name != "" && email != "" && location != "") addUserApiCall()
        else Alert.alert("All fields required.")
    }

    // VerifyOtp api method
    const addUserApiCall = async () => {

        var data = {
            "name": name,
            "email": email,
            "location": location
        }

        const getToken = await AsyncStorage.getItem("userToken")

        const headers = {
            "Authorization": `Bearer ${getToken}`
        }

        postServiceCall(ApiList.GET_USERS, data, headers)
            .then(async responseJson => {
                if (responseJson.data?.code == 0) {
                    if (responseJson.data?.data != null) {
                        navigation.replace("Home")
                    }
                }
            })
            .catch(error => {
                console.log(error.message)
            })
    };

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle='light-content'
                hidden={false}
                backgroundColor={Colors.THEME_COLOR}
                translucent={false}
            />
            <LinearGradient colors={[Colors.THEME_COLOR, Colors.THEME_SECOND_COLOR]}
                style={styles.container}>
                <View style={styles.headerImgContainer} >
                    <Pressable style={styles.backIconContianer}
                        onPress={() => { navigation.goBack() }}
                    >
                        <Image
                            source={Images.BACK_ICON}
                            style={styles.backIcon}
                        />
                    </Pressable>
                    <Image
                        source={Images.APP_LOGO}
                        style={styles.logoIcon}
                    />
                </View>
                <View style={styles.userIntrationView} >
                    <Text style={styles.titleTxt}>
                        {Strings.ADD_USER}
                    </Text>
                    <View style={{ marginTop: sizeWidth(8) }} >
                        <TextInput
                            value={name}
                            onChangeText={(txt) => setName(txt)}
                            placeholder={Strings.ENTER_NAME}
                            style={styles.inputStyl}
                        />
                        <TextInput
                            value={email}
                            onChangeText={(txt) => setEmail(txt)}
                            placeholder={Strings.EMAIL_ID}
                            style={styles.inputStyl}
                        />
                        <TextInput
                            value={location}
                            onChangeText={(txt) => setLocation(txt)}
                            placeholder={Strings.LOCATION}
                            style={styles.inputStyl}
                        />
                        <Pressable
                            onPress={() => addUserHandler()}
                            style={styles.btnContainer} >
                            <Text style={styles.btnTxt} >{Strings.ADD}</Text>
                        </Pressable>
                    </View>
                </View>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backIcon: {
        width: sizeWidth(4),
        height: sizeWidth(4),
        resizeMode: "contain"
    },
    logoIcon: {
        width: sizeWidth(35),
        height: sizeWidth(35),
        resizeMode: "contain"
    },
    userIntrationView: {
        paddingHorizontal: sizeWidth(5),
        flex: 0.8,
    },
    titleTxt: {
        color: Colors.WHITE_COLOR,
        fontFamily: "OpenSans-Regular",
        fontWeight: "700",
        textAlign: 'center',
        fontSize: sizeFont(5.5),
    },
    headerImgContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.5,
    },
    backIconContianer: {
        position: "absolute",
        left: sizeWidth(7),
        top: sizeWidth(10),
    },
    subTitleTxt: {
        color: Colors.WHITE_COLOR,
        fontFamily: "OpenSans-Regular",
        fontWeight: "400",
        fontSize: sizeFont(4),
        paddingTop: sizeWidth(1)
    },
    inputStyl: {
        fontFamily: "OpenSans-Regular",
        fontWeight: "400",
        letterSpacing: 2,
        fontSize: sizeFont(3.5),
        borderRadius: 10,
        marginBottom: sizeWidth(5),
        height: sizeWidth(12),
        padding: sizeWidth(3),
        color: Colors.INPUT_TEXT_COLOR,
        backgroundColor: Colors.DIM_GRAY_COLOR,
    },
    btnContainer: {
        borderRadius: 10,
        height: sizeWidth(14),
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: Colors.WHITE_COLOR,
    },
    btnTxt: {
        color: Colors.INPUT_TEXT_COLOR,
        fontFamily: "OpenSans-Regular",
        fontWeight: "700",
        fontSize: sizeFont(4.5),
        paddingTop: sizeWidth(1)
    },
    otherTxt: {
        color: Colors.WHITE_COLOR,
        fontFamily: "OpenSans-Regular",
        fontWeight: "400",
        fontSize: sizeFont(4),
    }
});

export default AddUser;