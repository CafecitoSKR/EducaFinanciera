export function getToken() {
    return localStorage.getItem('auth-token');
}

export function setToken(token) {
    localStorage.setItem('auth-token', token);
}

export function removeToken() {
    localStorage.removeItem('auth-token');
}

export function isAuthenticated() {
    return !!getToken();
}