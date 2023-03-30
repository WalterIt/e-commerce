import axios from "axios";

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
// const currentUser = (user && JSON.parse(user).currentUser) || {};
const currentUser = (user ? JSON.parse(user)?.currentUser : {}) || {};
const TOKEN = currentUser?.token;
// console.log(TOKEN);

export const publicRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const userRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
  // header: { token: `Bearer ${TOKEN}` },
});
