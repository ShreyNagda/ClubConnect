export const getCookieByName = (name) => {
  const cookieString = document.cookie;
  const cookiesArray = cookieString.split("; ");
  console.log(cookieString);
  for (let cookie of cookiesArray) {
    const [key, value] = cookie.split("=");
    if (key === name) {
      return decodeURIComponent(value); // Decode value if it's encoded
    }
  }
  return null;
};
