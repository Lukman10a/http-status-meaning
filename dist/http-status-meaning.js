(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.httpStatusMeaning = factory());
})(this, (function () { 'use strict';

  const statusCodes = {
    // 1xx Informational
    100: "Continue - The server has received the request headers and the client should proceed to send the request body.",
    101: "Switching Protocols - The requester has asked the server to switch protocols and the server has agreed to do so.",
    102: "Processing - The server has received and is processing the request, but no response is available yet.",
    103: "Early Hints - Used to return some response headers before final HTTP message.",

    // 2xx Success
    200: "OK - The request was successful.",
    201: "Created - A new resource was successfully created.",
    202: "Accepted - The request has been accepted for processing, but the processing has not been completed.",
    203: "Non-Authoritative Information - The returned information is from a cached copy instead of the origin server.",
    204: "No Content - The request was successful, but there's no content to return.",
    205: "Reset Content - The server has fulfilled the request and desires that the user agent reset the document view.",
    206: "Partial Content - The server is delivering only part of the resource due to a range header sent by the client.",
    207: "Multi-Status - The message body that follows is an XML message and can contain multiple separate response codes.",
    208: "Already Reported - The members of a DAV binding have already been enumerated in a previous reply.",
    226: "IM Used - The server has fulfilled a request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance.",

    // 3xx Redirection
    300: "Multiple Choices - The request has more than one possible response.",
    301: "Moved Permanently - The URL of the requested resource has been changed permanently.",
    302: "Found - The URI of requested resource has been changed temporarily.",
    303: "See Other - The response to the request can be found under another URI using a GET method.",
    304: "Not Modified - The resource has not been modified since the last request.",
    305: "Use Proxy - The requested resource is available only through a proxy.",
    307: "Temporary Redirect - The request should be repeated with another URI, but future requests should still use the original URI.",
    308: "Permanent Redirect - The request and all future requests should be repeated using another URI.",

    // 4xx Client Errors
    400: "Bad Request - The request could not be understood.",
    401: "Unauthorized - Authentication is required.",
    402: "Payment Required - Payment is required for the requested resource.",
    403: "Forbidden - The server understood the request but refuses to authorize it.",
    404: "Not Found - The requested resource does not exist.",
    405: "Method Not Allowed - The request method is not supported for the requested resource.",
    406: "Not Acceptable - The requested resource cannot generate content according to the Accept headers sent.",
    407: "Proxy Authentication Required - The client must first authenticate itself with the proxy.",
    408: "Request Timeout - The server timed out waiting for the request.",
    409: "Conflict - The request could not be completed due to a conflict with the current state of the resource.",
    410: "Gone - The requested resource is no longer available and will not be available again.",
    411: "Length Required - The request did not specify the length of its content.",
    412: "Precondition Failed - The server does not meet one of the preconditions specified in the request.",
    413: "Payload Too Large - The request entity is larger than limits defined by server.",
    414: "URI Too Long - The URI provided was too long for the server to process.",
    415: "Unsupported Media Type - The request entity has a media type which the server or resource does not support.",
    416: "Range Not Satisfiable - The client has asked for a portion of the file, but the server cannot supply that portion.",
    417: "Expectation Failed - The server cannot meet the requirements of the Expect request-header field.",
    418: "I'm a teapot - The server refuses the attempt to brew coffee with a teapot.",
    421: "Misdirected Request - The request was directed at a server that is not able to produce a response.",
    422: "Unprocessable Entity - The request was well-formed but was unable to be followed due to semantic errors.",
    423: "Locked - The resource that is being accessed is locked.",
    424: "Failed Dependency - The request failed due to failure of a previous request.",
    425: "Too Early - The server is unwilling to risk processing a request that might be replayed.",
    426: "Upgrade Required - The client should switch to a different protocol.",
    428: "Precondition Required - The origin server requires the request to be conditional.",
    429: "Too Many Requests - The user has sent too many requests in a given amount of time.",
    431: "Request Header Fields Too Large - The server is unwilling to process the request because its header fields are too large.",
    451: "Unavailable For Legal Reasons - The resource is unavailable due to legal reasons.",

    // 5xx Server Errors
    500: "Internal Server Error - A generic error message for server issues.",
    501: "Not Implemented - The server does not support the functionality required to fulfill the request.",
    502: "Bad Gateway - The server was acting as a gateway or proxy and received an invalid response from the upstream server.",
    503: "Service Unavailable - The server is temporarily unavailable.",
    504: "Gateway Timeout - The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.",
    505: "HTTP Version Not Supported - The server does not support the HTTP protocol version used in the request.",
    506: "Variant Also Negotiates - The server has an internal configuration error.",
    507: "Insufficient Storage - The server is unable to store the representation needed to complete the request.",
    508: "Loop Detected - The server detected an infinite loop while processing the request.",
    510: "Not Extended - Further extensions to the request are required for the server to fulfill it.",
    511: "Network Authentication Required - The client needs to authenticate to gain network access.",
  };

  // Available languages
  const availableLanguages = ["en", "es", "fr", "de", "zh"];

  // Translations for status code categories
  const categoryTranslations = {
    en: {
      Informational: "Informational",
      Success: "Success",
      Redirection: "Redirection",
      "Client Error": "Client Error",
      "Server Error": "Server Error",
      Unknown: "Unknown",
    },
    es: {
      Informational: "Informativo",
      Success: "Éxito",
      Redirection: "Redirección",
      "Client Error": "Error del Cliente",
      "Server Error": "Error del Servidor",
      Unknown: "Desconocido",
    },
    fr: {
      Informational: "Information",
      Success: "Succès",
      Redirection: "Redirection",
      "Client Error": "Erreur Client",
      "Server Error": "Erreur Serveur",
      Unknown: "Inconnu",
    },
    de: {
      Informational: "Information",
      Success: "Erfolg",
      Redirection: "Umleitung",
      "Client Error": "Client-Fehler",
      "Server Error": "Server-Fehler",
      Unknown: "Unbekannt",
    },
    zh: {
      Informational: "信息性",
      Success: "成功",
      Redirection: "重定向",
      "Client Error": "客户端错误",
      "Server Error": "服务器错误",
      Unknown: "未知",
    },
  };

  // Translations for status codes
  const statusCodeTranslations = {
    // English is the default in statusCodes.mjs
    es: {
      200: "OK - La solicitud ha tenido éxito.",
      201: "Creado - Se ha creado un nuevo recurso con éxito.",
      400: "Solicitud incorrecta - El servidor no pudo entender la solicitud.",
      404: "No encontrado - El recurso solicitado no existe.",
      500: "Error interno del servidor - Un mensaje de error genérico para problemas del servidor.",
      // Add other translations as needed
    },
    fr: {
      200: "OK - La requête a réussi.",
      201: "Créé - Une nouvelle ressource a été créée avec succès.",
      400: "Mauvaise demande - Le serveur n'a pas pu comprendre la requête.",
      404: "Non trouvé - La ressource demandée n'existe pas.",
      500: "Erreur interne du serveur - Un message d'erreur générique pour les problèmes de serveur.",
      // Add other translations as needed
    },
    de: {
      200: "OK - Die Anfrage war erfolgreich.",
      201: "Erstellt - Eine neue Ressource wurde erfolgreich erstellt.",
      400: "Fehlerhafte Anfrage - Die Anfrage konnte nicht verstanden werden.",
      404: "Nicht gefunden - Die angeforderte Ressource existiert nicht.",
      500: "Interner Serverfehler - Eine generische Fehlermeldung für Serverprobleme.",
      // Add other translations as needed
    },
    zh: {
      200: "成功 - 请求成功。",
      201: "已创建 - 成功创建了新资源。",
      400: "错误请求 - 服务器无法理解该请求。",
      404: "未找到 - 请求的资源不存在。",
      500: "服务器内部错误 - 服务器问题的通用错误消息。",
      // Add other translations as needed
    },
  };

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

  /**
   * Returns the human-readable meaning of an HTTP status code
   * @param {number} code - The HTTP status code
   * @param {string} [language='en'] - The language for the response
   * @returns {string} The human-readable meaning of the status code
   */
  function getStatusMeaning(code, language = "en") {
    if (language === "en" || !availableLanguages.includes(language)) {
      return statusCodes[code] || "Unknown status code";
    }

    return (
      statusCodeTranslations[language]?.[code] ||
      statusCodes[code] ||
      "Unknown status code"
    );
  }

  /**
   * Returns the category of an HTTP status code
   * @param {number} code - The HTTP status code
   * @param {string} [language='en'] - The language for the response
   * @returns {string} The category of the status code
   */
  function getStatusCategory(code, language = "en") {
    let category;

    if (code >= 100 && code < 200) category = "Informational";
    else if (code >= 200 && code < 300) category = "Success";
    else if (code >= 300 && code < 400) category = "Redirection";
    else if (code >= 400 && code < 500) category = "Client Error";
    else if (code >= 500 && code < 600) category = "Server Error";
    else category = "Unknown";

    if (language === "en" || !availableLanguages.includes(language)) {
      return category;
    }

    return categoryTranslations[language][category] || category;
  }

  /**
   * Checks if a status code is in the Informational category (1xx)
   * @param {number} code - The HTTP status code
   * @returns {boolean} True if the code is in the Informational category
   */
  function isInformational(code) {
    return code >= 100 && code < 200;
  }

  /**
   * Checks if a status code is in the Success category (2xx)
   * @param {number} code - The HTTP status code
   * @returns {boolean} True if the code is in the Success category
   */
  function isSuccess(code) {
    return code >= 200 && code < 300;
  }

  /**
   * Checks if a status code is in the Redirection category (3xx)
   * @param {number} code - The HTTP status code
   * @returns {boolean} True if the code is in the Redirection category
   */
  function isRedirection(code) {
    return code >= 300 && code < 400;
  }

  /**
   * Checks if a status code is in the Client Error category (4xx)
   * @param {number} code - The HTTP status code
   * @returns {boolean} True if the code is in the Client Error category
   */
  function isClientError(code) {
    return code >= 400 && code < 500;
  }

  /**
   * Checks if a status code is in the Server Error category (5xx)
   * @param {number} code - The HTTP status code
   * @returns {boolean} True if the code is in the Server Error category
   */
  function isServerError(code) {
    return code >= 500 && code < 600;
  }

  /**
   * Returns all status codes in a specific category
   * @param {string} category - The category to filter by ('informational', 'success', 'redirection', 'clientError', 'serverError')
   * @param {string} [language='en'] - The language for the response
   * @returns {Object} An object containing the filtered status codes and their meanings
   */
  function getStatusCodesByCategory(category, language = "en") {
    const result = {};

    for (const code in statusCodes) {
      const numCode = parseInt(code);

      if (
        (category === "informational" && isInformational(numCode)) ||
        (category === "success" && isSuccess(numCode)) ||
        (category === "redirection" && isRedirection(numCode)) ||
        (category === "clientError" && isClientError(numCode)) ||
        (category === "serverError" && isServerError(numCode))
      ) {
        result[code] = getStatusMeaning(numCode, language);
      }
    }

    return result;
  }

  /**
   * Returns all status codes
   * @param {string} [language='en'] - The language for the response
   * @returns {Object} An object containing all status codes and their meanings
   */
  function getAllStatusCodes(language = "en") {
    const result = {};

    for (const code in statusCodes) {
      result[code] = getStatusMeaning(parseInt(code), language);
    }

    return result;
  }

  /**
   * Returns common use cases for a given status code
   * @param {number} code - The HTTP status code
   * @returns {string[]} Array of common use cases or empty array if none defined
   */
  function getStatusCodeUseCases(code) {
    return statusCodeUseCases[code] || [];
  }

  /**
   * Returns all supported languages
   * @returns {string[]} Array of language codes
   */
  function getSupportedLanguages() {
    return [...availableLanguages];
  }

  // Export everything for browser usage
  var httpStatusMeaning = {
    getStatusMeaning,
    getStatusCategory,
    isInformational,
    isSuccess,
    isRedirection,
    isClientError,
    isServerError,
    getStatusCodesByCategory,
    getAllStatusCodes,
    getStatusCodeUseCases,
    getSupportedLanguages,
  };

  // This is a simple wrapper for browser compatibility
  // You'll need to use a bundler like webpack, rollup, or esbuild to build this


  // Attach to window object for browser usage
  if (typeof window !== "undefined") {
    window.httpStatusMeaning = httpStatusMeaning;
  }

  return httpStatusMeaning;

}));
//# sourceMappingURL=http-status-meaning.js.map
