import { setCookie, getCookie, eraseCookie } from './cookieUtils';

const cookieName = 'discord_auth_token';

export const getToken = () => getCookie(cookieName);

export const setToken = (token) => setCookie(cookieName, token, 1);

export const deleteToken = () => eraseCookie(cookieName);
