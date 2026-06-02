const TOKEN_KEY = "token";
const ROLE_KEY = "role";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getRole() {
  return localStorage.getItem(ROLE_KEY)?.toLowerCase() || "";
}

export function isLoggedIn() {
  return Boolean(getToken());
}

export function isAdmin() {
  return getRole() === "admin";
}
