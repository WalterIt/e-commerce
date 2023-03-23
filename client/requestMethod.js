import axios from "axios";

// const TOKEN =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTc3YWJkNjVjODUyZDlkZmRjZGFjNSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3OTU0MzUzMSwiZXhwIjoxNjc5NjI5OTMxfQ.fvUravdEwbInTUgp47WbLXcnuIwEadyFEEBEqwi67Pc";

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.token;

export const publicRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const userRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
  // header: { token: `Bearer ${TOKEN}` },
});
