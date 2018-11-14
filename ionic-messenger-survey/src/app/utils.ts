const HTTP_PATTERN = /^http:\/\/|^\/\//;
const HTTPS_PROTOCOL = 'https:';
const FORCE_HTTPS =
  typeof location === 'undefined'
    ? false
    : location.protocol === HTTPS_PROTOCOL;

export const getSecureUrl = (url) => {
  return FORCE_HTTPS ? url.replace(HTTP_PATTERN, `${HTTPS_PROTOCOL}//`) : url;
};
