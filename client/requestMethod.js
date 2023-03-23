import axios from "axios";

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTc3YWJkNjVjODUyZDlkZmRjZGFjNSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3OTU0MzUzMSwiZXhwIjoxNjc5NjI5OTMxfQ.fvUravdEwbInTUgp47WbLXcnuIwEadyFEEBEqwi67Pc";

export const publicRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const userRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});
