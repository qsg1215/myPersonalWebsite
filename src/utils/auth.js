import Cookies from 'js-cookie'

export function getCookie (name) {
  return Cookies.get(name)
}

export function setCookie(name, token, option) {
  return Cookies.set(name, token, option)
}

export function removeCookie (name) {
  return Cookies.remove(name)
}
