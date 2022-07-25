export const getFromStorage = (key:string) => {
  if (typeof window !== 'undefined') {
    const user = window.localStorage.getItem(key)
    return user
  }
}
export const setToStorage = (key:string, value:string) => {
  if (typeof window !== 'undefined') {
    return window.localStorage.setItem(key, value)
  }
}
