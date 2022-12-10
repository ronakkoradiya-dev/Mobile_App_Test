import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from './ApiList';

export const postServiceCall = async (endpoint, params, headers = {}) => {

    console.log("REQUEST URL:", BASE_URL + endpoint);
    console.log("HEADER:", JSON.stringify(headers));
    console.log("PARAMS:", JSON.stringify(params));

    return await axios
        .post(BASE_URL + endpoint, params, { headers })
        .then(response => {
            console.log("RESPONSE:", JSON.stringify(response));
            return response;
        })
        .catch(error => {
            console.log("ERROR:", JSON.stringify(error));
            throw error;
        })
};

export const getServiceCall = async (endpoint, params, passToken = true) => {

    const getToken = await AsyncStorage.getItem("userToken")

    const headers = passToken == false ? {} : {
        "Authorization": `Bearer ${getToken}`
    }
    console.log("REQUEST URL:", BASE_URL + endpoint);
    console.log("HEADER:", JSON.stringify(headers));
    console.log("PARAMS:", JSON.stringify(params));

    return await axios
        .get(!passToken ? endpoint : BASE_URL + endpoint, {
            params, headers
        })
        .then(response => {
            // console.log("RESPONSE:", JSON.stringify(response));
            return response;
        })
        .catch(error => {
            console.log("ERROR:", JSON.stringify(error));
            throw error;
        })
};