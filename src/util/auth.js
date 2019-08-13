import Cookies from 'js-cookie'
const TokenKey = 'x-access-token'
const UserKey = 'x-access-user';
var inFifteenMinutes = new Date(new Date().getTime() + 30 * 60 * 1000);
export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token, { expires: inFifteenMinutes })
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}

export function setUser(user) {
    return Cookies.set(UserKey, user, { expires: inFifteenMinutes })
}

export function getUser() {
    return Cookies.get(UserKey);
}