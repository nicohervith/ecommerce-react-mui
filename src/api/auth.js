import axios from "./axios";

const API = "http://localhost:4000/api";

export const registerRequest = (user) => axios.post(`/auth/register`, user);

export const loginRequest = async (user) => axios.post(`/auth/login`, user);

export const verifyTokenRequest = async () => axios.get(API + `/auth/verify`);
