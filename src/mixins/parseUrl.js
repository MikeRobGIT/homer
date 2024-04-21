// parseUrl.js
function getTldFromHostname(hostname) {
  const parts = hostname.split(".");
  return parts.length > 1 ? `${parts[parts.length - 1]}` : "";
}

export function parseUrl(url) {
  if (url.startsWith("*")) {
    const parts = url.slice(1).split("|"); // Remove '*' and split by '|'
    if (parts.length === 2) {
      const port = parts[0];
      const subdomain = parts[1];
      const protocol = window.location.protocol;
      const tld = getTldFromHostname(window.location.hostname);
      const hostnameParts = window.location.hostname.split(".");
      const hostname = hostnameParts[0];

      if (hostname === "localhost") {
        return `${protocol}//${hostname}:${port}`;
      } else if (hostnameParts.length === 3) {
        return `${protocol}//${subdomain}.${hostnameParts[1]}.${tld}`;
      } else if (
        hostnameParts.length === 4 &&
        hostnameParts.every((part) => !isNaN(part))
      ) {
        return `${protocol}//${hostnameParts.join(".")}:${port}`;
      }
    }
  }
  // Return the original URL if no special marker
  return url;
}
