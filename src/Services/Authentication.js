import decode from "jwt-decode";
import API from "./API";

const AUTH_TOKEN = "authenticationToken";
const AUTH_EMAIL = "authenticationEmail";

export default class Authentication {
  static isLoggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  static isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  static login = (email, password) => {
    return API.login(email, password).then((response) => {
      const isTokenExist = response?.auth_token || null;
      if (isTokenExist && isTokenExist !== null) {
        this.setToken(response?.auth_token, email);
      } else {
        return Promise.resolve(response);
      }
      return Promise.resolve(response);
    });
  };

  static setToken(idToken, email) {
    localStorage.setItem(AUTH_TOKEN, idToken);
    localStorage.setItem(AUTH_EMAIL, email);
  }

  static getToken() {
    return localStorage.getItem(AUTH_TOKEN);
  }

  static logout() {
    localStorage.removeItem(AUTH_TOKEN);
    localStorage.removeItem(AUTH_EMAIL);
  }
}
