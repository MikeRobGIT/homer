// parseUrl.js

function isPrivateIpAddress(hostname) {
  return /^(10\.\d{1,3}\.\d{1,3}\.\d{1,3}|192\.168\.\d{1,3}\.\d{1,3}|172\.(1[6-9]|2[0-9]|3[0-1])\.\d{1,3}\.\d{1,3})$/.test(
    hostname,
  );
}

export function parseUrl(item) {
  const { url, internal, external } = item;
  // if internal or external is not defined, return the original url
  if (!internal && !external) {
    return url;
  }
  const hostname = window.location.hostname;
  // Check if hostname is 'localhost' or an IP address
  if (hostname === "localhost" || isPrivateIpAddress(hostname)) {
    return internal;
  } else {
    return external;
  }
}
