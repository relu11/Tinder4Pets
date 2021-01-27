const devAPIURL = process.env.REACT_APP_DEV_API_URL;
const prodAPIURL = process.env.REACT_APP_PROD_API_URL;
console.log({ devAPIURL, prodAPIURL });
export const API_URL =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? devAPIURL
    : prodAPIURL;
