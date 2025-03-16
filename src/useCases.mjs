const statusCodeUseCases = {
  // 1xx Informational
  100: [
    "When uploading large files in chunks to indicate the server is ready for the next chunk",
    "In WebSockets to confirm a handshake is in progress",
  ],
  101: [
    "During WebSocket connection establishment",
    "When switching from HTTP to WebSockets protocol",
  ],

  // 2xx Success
  200: [
    "Standard response for successful HTTP requests",
    "Response to successful GET requests",
    "When an API request completes successfully",
  ],
  201: [
    "After a POST request that creates a new resource",
    "When an item is successfully added to a database",
    "After user registration is complete",
  ],
  204: [
    "After a successful DELETE operation",
    "When submitting a form that should not navigate away",
    "When an update operation succeeds but no content needs to be returned",
  ],

  // 3xx Redirection
  301: [
    "When a website has moved permanently to a new domain",
    "Redirecting from old URLs to new URLs for SEO purposes",
    "When consolidating multiple URLs to a canonical URL",
  ],
  302: [
    "Temporary redirects during maintenance",
    "After a successful form submission to redirect to a confirmation page",
    "For A/B testing to temporarily direct users to different versions",
  ],
  304: [
    "When browser cache is still valid",
    "When a resource hasn't changed since the last request",
    "To reduce bandwidth by not resending unchanged files",
  ],

  // 4xx Client Errors
  400: [
    "When form validation fails",
    "When request parameters are missing or invalid",
    "When the JSON payload is malformed",
  ],
  401: [
    "When a user tries to access a resource without logging in",
    "When an API key is missing or invalid",
    "When session tokens have expired",
  ],
  403: [
    "When a user is logged in but lacks permission for a resource",
    "When IP-based restrictions prevent access",
    "When trying to modify read-only resources",
  ],
  404: [
    "When a URL doesn't exist",
    "When a resource has been deleted",
    "To mask the existence of sensitive resources for security",
  ],
  429: [
    "When rate limits have been exceeded",
    "To prevent brute force attacks",
    "When a client is making too many requests in a short time period",
  ],

  // 5xx Server Errors
  500: [
    "When an unhandled exception occurs",
    "During database connection failure",
    "When the server encounters an unexpected condition",
  ],
  502: [
    "When a proxy or load balancer can't reach the upstream server",
    "During server deployment or restart",
    "When the backend service is down",
  ],
  503: [
    "During scheduled maintenance",
    "When the server is overloaded",
    "When a service is temporarily unavailable due to high traffic",
  ],
  // Add more as needed
};

export default statusCodeUseCases;
