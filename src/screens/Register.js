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


const Register = ({ navigation }) => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // Sign in button handller
    const signUpHandler = () => {
        if (name != "" && email != "" && password != "") RegisterApiCall()
        else Alert.alert("All fields required.")
    }

    // VerifyOtp api method
    const RegisterApiCall = async () => {

        var data = {
            "name": name,
            "email": email,
            "password": password
        }

        postServiceCall(ApiList.AUTH_REG, data)
            .then(async responseJson => {
                if (responseJson.data?.code == 0) {
                    if (responseJson.data?.data != null) {
                        await AsyncStorage.setItem("userToken", responseJson.data.data?.Token)
                        navigation.replace("Login")
                    }
                } else {
                    alert(responseJson.data?.message)
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
                hidden={true}
                backgroundColor={Colors.WHITE_COLOR}
                translucent={false}
            />
            <LinearGradient colors={[Colors.THEME_COLOR, Colors.THEME_SECOND_COLOR]}
                style={styles.container}>
                <View style={styles.headerImgContainer} >
                    <Image
                        source={Images.APP_LOGO}
                        style={styles.logoIcon}
                    />
                </View>
                <View style={styles.userInputContainer} >
                    <View>
                        <Text style={styles.titleTxt}>
                            {Strings.SIGN_UP}
                        </Text>
                        <Text style={styles.subTitleTxt}>
                            {Strings.WITH_PHONE}
                        </Text>
                    </View>
                    <View style={{ marginTop: sizeWidth(8) }} >
                        <TextInput
                            value={name}
                            onChangeText={(txt) => {
                                setName(txt)
                            }}
                            placeholder={Strings.ENTER_NAME}
                            style={styles.inputStyl}
                        />
                        <TextInput
                            value={email}
                            onChangeText={(txt) => {
                                setEmail(txt)
                            }}
                            placeholder={Strings.EMAIL_ID}
                            style={styles.inputStyl}
                        />
                        <TextInput
                            value={password}
                            onChangeText={(txt) => {
                                setPassword(txt)
                            }}
                            secureTextEntry={true}
                            placeholder={Strings.PASSWORD}
                            style={styles.inputStyl}
                        />
                        <Pressable
                            onPress={() => {
                                signUpHandler()
                            }} style={styles.btnContainer} >
                            <Text style={styles.btnTxt} >{Strings.SUBMIT}</Text>
                        </Pressable>
                    </View>
                    <View style={styles.footerContainer} >
                        <Text style={styles.otherTxt} >{Strings.ALREADY_ACCOUNT}</Text>
                        <Text onPress={() => {
                            navigation.navigate("Login")
                        }} style={[styles.otherTxt, {
                            fontWeight: "700"
                        }]} >{Strings.SIGN_IN}</Text>
                    </View>
                </View>
            </LinearGradient>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerImgContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.4,
    },
    userInputContainer: {
        padding: sizeWidth(5),
        flex: 0.6,
    },
    logoIcon: {
        width: sizeWidth(35),
        height: sizeWidth(35),
        resizeMode: "contain"
    },
    titleTxt: {
        color: Colors.WHITE_COLOR,
        fontFamily: "OpenSans-Regular",
        fontWeight: "700",
        fontSize: sizeFont(5.5),
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
    },
    footerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        flexDirection: "row",
    },
});

export default Register;