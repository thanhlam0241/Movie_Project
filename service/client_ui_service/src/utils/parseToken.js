import { jwtDecode } from "jwt-decode";

export default function parseToken(token) {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error(error);
    return null;
  }
}
