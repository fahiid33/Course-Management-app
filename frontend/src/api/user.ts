import axios from 'axios';

const API_URL = process.env.API_URL;

export const register = async (userData: { username: string; password: string }) => {
    console.log('register', userData);
    try{
        const response = await axios.post(`${API_URL}/auth/register`, userData);
        return response.data;
    }
    catch(err){
        console.log(err);
    }
};

export const login = async (userData: { username: string; password: string }) => {
    try{
        const response = await axios.post(`${API_URL}/auth/login`, userData);
        return response.data;
    }
    catch(err){
        console.log(err);
    }
};
