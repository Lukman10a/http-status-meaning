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
const availableLanguages = ["en", "es", "fr", "de", "pt", "it", "ru", "zh", "ja", "ar"];

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
  pt: {
    Informational: "Informativo",
    Success: "Sucesso",
    Redirection: "Redirecionamento",
    "Client Error": "Erro do Cliente",
    "Server Error": "Erro do Servidor",
    Unknown: "Desconhecido",
  },
  it: {
    Informational: "Informativo",
    Success: "Successo",
    Redirection: "Reindirizzamento",
    "Client Error": "Errore del Client",
    "Server Error": "Errore del Server",
    Unknown: "Sconosciuto",
  },
  ru: {
    Informational: "Информационный",
    Success: "Успех",
    Redirection: "Перенаправление",
    "Client Error": "Ошибка Клиента",
    "Server Error": "Ошибка Сервера",
    Unknown: "Неизвестно",
  },
  zh: {
    Informational: "信息性",
    Success: "成功",
    Redirection: "重定向",
    "Client Error": "客户端错误",
    "Server Error": "服务器错误",
    Unknown: "未知",
  },
  ja: {
    Informational: "情報",
    Success: "成功",
    Redirection: "リダイレクション",
    "Client Error": "クライアントエラー",
    "Server Error": "サーバーエラー",
    Unknown: "不明",
  },
  ar: {
    Informational: "معلوماتي",
    Success: "نجاح",
    Redirection: "إعادة توجيه",
    "Client Error": "خطأ العميل",
    "Server Error": "خطأ الخادم",
    Unknown: "غير معروف",
  },
};

// Translations for status codes
const statusCodeTranslations = {
  // English is the default in statusCodes.mjs
  es: {
    200: "OK - La solicitud ha tenido éxito.",
    201: "Creado - Se ha creado un nuevo recurso con éxito.",
    400: "Solicitud incorrecta - El servidor no pudo entender la solicitud.",
    401: "No autorizado - Se requiere autenticación.",
    403: "Prohibido - El servidor entendió la solicitud, pero se niega a autorizarla.",
    404: "No encontrado - El recurso solicitado no existe.",
    500: "Error interno del servidor - Un mensaje de error genérico para problemas del servidor.",
    503: "Servicio no disponible - El servidor no está disponible temporalmente.",
  },
  fr: {
    200: "OK - La requête a réussi.",
    201: "Créé - Une nouvelle ressource a été créée avec succès.",
    400: "Mauvaise demande - Le serveur n'a pas pu comprendre la requête.",
    401: "Non autorisé - Une authentification est nécessaire.",
    403: "Interdit - Le serveur a compris la requête mais refuse de l'autoriser.",
    404: "Non trouvé - La ressource demandée n'existe pas.",
    500: "Erreur interne du serveur - Un message d'erreur générique pour les problèmes de serveur.",
    503: "Service indisponible - Le serveur est temporairement indisponible.",
  },
  de: {
    200: "OK - Die Anfrage war erfolgreich.",
    201: "Erstellt - Eine neue Ressource wurde erfolgreich erstellt.",
    400: "Fehlerhafte Anfrage - Die Anfrage konnte nicht verstanden werden.",
    401: "Nicht autorisiert - Authentifizierung ist erforderlich.",
    403: "Verboten - Der Server hat die Anfrage verstanden, weigert sich aber, sie zu autorisieren.",
    404: "Nicht gefunden - Die angeforderte Ressource existiert nicht.",
    500: "Interner Serverfehler - Eine generische Fehlermeldung für Serverprobleme.",
    503: "Dienst nicht verfügbar - Der Server ist vorübergehend nicht verfügbar.",
  },
  pt: {
    200: "OK - A requisição foi bem-sucedida.",
    201: "Criado - Um novo recurso foi criado com sucesso.",
    400: "Requisição inválida - O servidor não conseguiu entender a requisição.",
    401: "Não autorizado - Autenticação é necessária.",
    403: "Proibido - O servidor entendeu a requisição, mas recusa-se a autorizá-la.",
    404: "Não encontrado - O recurso solicitado não existe.",
    500: "Erro interno do servidor - Uma mensagem de erro genérica para problemas no servidor.",
    503: "Serviço indisponível - O servidor está temporariamente indisponível.",
  },
  it: {
    200: "OK - La richiesta è stata completata con successo.",
    201: "Creato - Una nuova risorsa è stata creata con successo.",
    400: "Richiesta errata - Il server non ha potuto comprendere la richiesta.",
    401: "Non autorizzato - È richiesta l'autenticazione.",
    403: "Vietato - Il server ha compreso la richiesta, ma si rifiuta di autorizzarla.",
    404: "Non trovato - La risorsa richiesta non esiste.",
    500: "Errore interno del server - Un messaggio di errore generico per problemi del server.",
    503: "Servizio non disponibile - Il server è temporaneamente non disponibile.",
  },
  ru: {
    200: "OK - Запрос успешно выполнен.",
    201: "Создано - Новый ресурс был успешно создан.",
    400: "Плохой запрос - Сервер не смог понять запрос.",
    401: "Не авторизован - Требуется аутентификация.",
    403: "Запрещено - Сервер понял запрос, но отказывается его авторизовать.",
    404: "Не найдено - Запрашиваемый ресурс не существует.",
    500: "Внутренняя ошибка сервера - Общее сообщение об ошибке для проблем сервера.",
    503: "Сервис недоступен - Сервер временно недоступен.",
  },
  zh: {
    200: "成功 - 请求成功。",
    201: "已创建 - 成功创建了新资源。",
    400: "错误请求 - 服务器无法理解该请求。",
    401: "未授权 - 需要身份验证。",
    403: "禁止 - 服务器理解请求，但拒绝授权。",
    404: "未找到 - 请求的资源不存在。",
    500: "服务器内部错误 - 服务器问题的通用错误消息。",
    503: "服务不可用 - 服务器暂时不可用。",
  },
  ja: {
    200: "OK - リクエストは成功しました。",
    201: "作成済み - 新しいリソースが正常に作成されました。",
    400: "不正なリクエスト - サーバーはリクエストを理解できませんでした。",
    401: "未認証 - 認証が必要です。",
    403: "禁止 - サーバーはリクエストを理解しましたが、承認を拒否しています。",
    404: "見つかりません - 要求されたリソースは存在しません。",
    500: "サーバー内部エラー - サーバーの問題に関する一般的なエラーメッセージ。",
    503: "サービス利用不可 - サーバーは一時的に利用できません。",
  },
  ar: {
    200: "موافق - نجح الطلب.",
    201: "تم الإنشاء - تم إنشاء مورد جديد بنجاح.",
    400: "طلب خاطئ - لم يستطع الخادم فهم الطلب.",
    401: "غير مصرح - المصادقة مطلوبة.",
    403: "محظور - فهم الخادم الطلب ولكنه يرفض تفويضه.",
    404: "غير موجود - المورد المطلوب غير موجود.",
    500: "خطأ داخلي في الخادم - رسالة خطأ عامة لمشاكل الخادم.",
    503: "الخدمة غير متوفرة - الخادم غير متاح مؤقتًا.",
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

// Direct mappings for specific phrases to their status codes
// These have the highest priority and override any other matching
const DIRECT_STATUS_MAPPINGS = {
  "not found": 404,
  "bad request": 400,
  "unauthorized": 401,
  "forbidden": 403,
  "internal server error": 500,
  "service unavailable": 503,
  "ok": 200,
  "created": 201,
  "continue": 100,
  "moved permanently": 301,
  "found": 302,
  "resource not found": 404,
  "server internal error": 500,
  "not found - the requested resource does not exist.": 404
};

// Special keywords to specific status codes mapping for direct matches
const KEYWORDS_TO_CODES = {
  'continue': 100,
  'switching': 101,
  'processing': 102,
  'early hints': 103,
  'ok': 200,
  'created': 201,
  'accepted': 202,
  'non-authoritative': 203,
  'no content': 204,
  'reset': 205,
  'partial': 206,
  'multi-status': 207,
  'already reported': 208,
  'im used': 226,
  'multiple choices': 300,
  'moved permanently': 301,
  'found': 302,
  'see other': 303,
  'not modified': 304,
  'use proxy': 305,
  'temporary redirect': 307,
  'permanent redirect': 308,
  'bad request': 400,
  'unauthorized': 401,
  'payment required': 402,
  'forbidden': 403,
  'not found': 404,
  'method not allowed': 405,
  'not acceptable': 406,
  'proxy authentication': 407,
  'request timeout': 408,
  'conflict': 409,
  'gone': 410,
  'length required': 411,
  'precondition failed': 412,
  'payload too large': 413,
  'uri too long': 414,
  'unsupported media': 415,
  'range not satisfiable': 416,
  'expectation failed': 417,
  'teapot': 418,
  'misdirected': 421,
  'unprocessable': 422,
  'locked': 423,
  'failed dependency': 424,
  'too early': 425,
  'upgrade required': 426,
  'precondition required': 428,
  'too many requests': 429,
  'fields too large': 431,
  'legal reasons': 451,
  'internal server error': 500,
  'not implemented': 501,
  'bad gateway': 502,
  'service unavailable': 503,
  'gateway timeout': 504,
  'http version': 505,
  'variant': 506,
  'insufficient storage': 507,
  'loop detected': 508,
  'not extended': 510,
  'network authentication': 511,
  // Additional keywords for easier matching
  'redirect': 302,
  'moved': 301,
  'resource': 404,
  'server error': 500,
  'internal error': 500,
};

// Special phrases that should be excluded from fuzzy matching
const NEGATIVE_PHRASES = [
  'not a ', 'is not ', 'not an ', 'invalid ', 'no such ', 'unknown '
];

/**
 * Helper function to normalize and parse status codes
 * @param {number|string} code - The HTTP status code
 * @returns {number|null} - Parsed numeric code or null
 */
function normalizeStatusCode(code) {
  if (code === null || code === undefined) return null;
  
  // If it's already a number
  if (typeof code === 'number') return isNaN(code) ? null : code;
  
  // If it's a string that contains only digits
  if (typeof code === 'string' && /^\d+$/.test(code)) {
    return parseInt(code, 10);
  }
  
  return null;
}

/**
 * Check if a query is likely a status code description by looking for key markers
 * @param {string} query - The query to check
 * @returns {boolean} - True if the query is likely a status description
 */
function isLikelyStatusDescription(query) {
  if (!query || typeof query !== 'string') return false;
  
  const normalizedQuery = query.toLowerCase();
  
  // Check if it's in our direct mappings
  if (DIRECT_STATUS_MAPPINGS[normalizedQuery]) {
    return true;
  }
  
  // Check for negative phrases first
  for (const phrase of NEGATIVE_PHRASES) {
    if (normalizedQuery.includes(phrase)) {
      return false;
    }
  }
  
  // Check for direct keyword matches
  for (const keyword in KEYWORDS_TO_CODES) {
    if (normalizedQuery === keyword || normalizedQuery.includes(keyword)) {
      return true;
    }
  }
  
  // Common keywords in status code descriptions
  const keywords = [
    'ok', 'success', 'created', 'found', 'redirect', 'not found', 'error', 
    'unauthorized', 'bad', 'forbidden', 'server', 'client', 'unavailable', 'timeout'
  ];
  
  // Check for exact matches of common status code names
  const exactMatches = [
    'not found', 'bad request', 'unauthorized', 'forbidden', 'ok', 
    'internal server error', 'service unavailable', 'created', 'continue'
  ];
  
  if (exactMatches.includes(normalizedQuery)) {
    return true;
  }
  
  // Check if any of the keywords are in the query
  return keywords.some(keyword => 
    normalizedQuery === keyword || 
    normalizedQuery.includes(` ${keyword} `) || 
    normalizedQuery.startsWith(`${keyword} `) || 
    normalizedQuery.endsWith(` ${keyword}`));
}

/**
 * Check if input contains negative phrases that would make it unlikely to be a valid status code
 * @param {string} query - The query string to check
 * @returns {boolean} - True if the query contains negative phrases
 */
function containsNegativePhrases(query) {
  if (!query || typeof query !== 'string') return false;
  const normalizedQuery = query.toLowerCase();
  
  return NEGATIVE_PHRASES.some(phrase => normalizedQuery.includes(phrase));
}

/**
 * Find a status code by its description (fuzzy match)
 * @param {string} description - Description or part of it (e.g., "Not Found")
 * @returns {number|null} - The matching status code or null if not found
 */
function findStatusCodeByDescription(description) {
  if (!description || typeof description !== 'string') return null;
  
  const lowerDescription = description.toLowerCase();
  
  // If the description contains negative phrases, it's likely not a status code reference
  if (containsNegativePhrases(lowerDescription)) {
    return null;
  }
  
  // Check direct mappings first (highest priority)
  if (DIRECT_STATUS_MAPPINGS[lowerDescription]) {
    return DIRECT_STATUS_MAPPINGS[lowerDescription];
  }
  
  // Check for phrases that contain "not found" but aren't negative phrases
  if (lowerDescription.includes("not found")) {
    return 404;
  }
  
  // Check for direct keyword matches (second priority)
  for (const keyword in KEYWORDS_TO_CODES) {
    if (lowerDescription === keyword || 
        lowerDescription.includes(` ${keyword} `) || 
        lowerDescription.startsWith(`${keyword} `) || 
        lowerDescription.endsWith(` ${keyword}`)) {
      return KEYWORDS_TO_CODES[keyword];
    }
  }
  
  // Reject input that doesn't look like a status description at all if not already matched
  if (!isLikelyStatusDescription(lowerDescription)) {
    return null;
  }
  
  // Check exact matches with status code meanings
  for (const [code, meaning] of Object.entries(statusCodes)) {
    if (meaning.toLowerCase() === lowerDescription) {
      return parseInt(code, 10);
    }
    
    // Check for the first part before the hyphen (e.g., "Not Found" in "Not Found - The...")
    const shortMeaning = meaning.split(' - ')[0].toLowerCase();
    if (shortMeaning === lowerDescription) {
      return parseInt(code, 10);
    }
  }
  
  // Check if description is contained in any status code meaning
  // Very specific descriptions get priority
  const exactMatches = [];
  
  for (const [code, meaning] of Object.entries(statusCodes)) {
    const meaningLower = meaning.toLowerCase();
    if (meaningLower.includes(lowerDescription)) {
      exactMatches.push({ code: parseInt(code, 10), score: lowerDescription.length });
    }
  }
  
  if (exactMatches.length > 0) {
    // Sort by score (higher is better - we want the most specific match)
    exactMatches.sort((a, b) => b.score - a.score);
    return exactMatches[0].code;
  }
  
  // Check if any keywords match
  const words = lowerDescription.split(/\s+/).filter(word => word.length > 3);
  if (words.length > 0) {
    // Try to match based on significant words
    const candidateMatches = [];
    
    for (const [code, meaning] of Object.entries(statusCodes)) {
      const meaningLower = meaning.toLowerCase();
      let matchScore = 0;
      let exactWordMatches = 0;
      
      for (const word of words) {
        // Ignore very common words that might cause false matches
        if (['this', 'that', 'with', 'from', 'have', 'invalid'].includes(word)) {
          continue;
        }
        
        // Exact word match is weighted higher
        const wordPattern = new RegExp(`\\b${word}\\b`, 'i');
        if (wordPattern.test(meaningLower)) {
          exactWordMatches++;
          matchScore += 3;
        } else if (meaningLower.includes(word)) {
          matchScore += 1;
        }
      }
      
      // Boost score for multiple exact word matches (to avoid coincidental single-word matches)
      if (exactWordMatches > 1) {
        matchScore *= 2;
      }
      
      if (matchScore > 0) {
        candidateMatches.push({ code: parseInt(code, 10), score: matchScore });
      }
    }
    
    // Sort by match score (highest first)
    candidateMatches.sort((a, b) => b.score - a.score);
    
    if (candidateMatches.length > 0 && candidateMatches[0].score > 2) {
      return candidateMatches[0].code;
    }
  }
  
  return null;
}

/**
 * Returns the human-readable meaning of an HTTP status code
 * @param {number|string} code - The HTTP status code or its description
 * @param {string} [language='en'] - The language for the response
 * @returns {string} The human-readable meaning of the status code
 */
function getStatusMeaning(code, language = "en") {
  // Try to parse as a status code first
  let statusCode = normalizeStatusCode(code);
  
  // If not a valid number, try to find by description
  if (statusCode === null && typeof code === 'string') {
    statusCode = findStatusCodeByDescription(code);
  }
  
  // If still not found, return unknown
  if (statusCode === null) {
    return "Unknown status code";
  }
  
  if (language === "en" || !availableLanguages.includes(language)) {
    return statusCodes[statusCode] || "Unknown status code";
  }

  return (
    statusCodeTranslations[language]?.[statusCode] ||
    statusCodes[statusCode] ||
    "Unknown status code"
  );
}

/**
 * Returns the category of an HTTP status code
 * @param {number|string} code - The HTTP status code or its description
 * @param {string} [language='en'] - The language for the response
 * @returns {string} The category of the status code
 */
function getStatusCategory(code, language = "en") {
  // Try to parse as a status code first
  let statusCode = normalizeStatusCode(code);
  
  // If not a valid number, try to find by description
  if (statusCode === null && typeof code === 'string') {
    statusCode = findStatusCodeByDescription(code);
  }
  
  // If still not found, return unknown
  if (statusCode === null) {
    return language === "en" || !availableLanguages.includes(language) 
      ? "Unknown" 
      : categoryTranslations[language]["Unknown"] || "Unknown";
  }
  
  let category;

  if (statusCode >= 100 && statusCode < 200) category = "Informational";
  else if (statusCode >= 200 && statusCode < 300) category = "Success";
  else if (statusCode >= 300 && statusCode < 400) category = "Redirection";
  else if (statusCode >= 400 && statusCode < 500) category = "Client Error";
  else if (statusCode >= 500 && statusCode < 600) category = "Server Error";
  else category = "Unknown";

  if (language === "en" || !availableLanguages.includes(language)) {
    return category;
  }

  return categoryTranslations[language][category] || category;
}

/**
 * Checks if a status code is in the Informational category (1xx)
 * @param {number|string} code - The HTTP status code or its description
 * @returns {boolean} True if the code is in the Informational category
 */
function isInformational(code) {
  // Try to parse as a status code first
  let statusCode = normalizeStatusCode(code);
  
  // If not a valid number, try to find by description
  if (statusCode === null && typeof code === 'string') {
    statusCode = findStatusCodeByDescription(code);
  }
  
  // If still not found, return false
  if (statusCode === null) {
    return false;
  }
  
  return statusCode >= 100 && statusCode < 200;
}

/**
 * Checks if a status code is in the Success category (2xx)
 * @param {number|string} code - The HTTP status code or its description
 * @returns {boolean} True if the code is in the Success category
 */
function isSuccess(code) {
  // Try to parse as a status code first
  let statusCode = normalizeStatusCode(code);
  
  // If not a valid number, try to find by description
  if (statusCode === null && typeof code === 'string') {
    statusCode = findStatusCodeByDescription(code);
  }
  
  // If still not found, return false
  if (statusCode === null) {
    return false;
  }
  
  return statusCode >= 200 && statusCode < 300;
}

/**
 * Checks if a status code is in the Redirection category (3xx)
 * @param {number|string} code - The HTTP status code or its description
 * @returns {boolean} True if the code is in the Redirection category
 */
function isRedirection(code) {
  // Try to parse as a status code first
  let statusCode = normalizeStatusCode(code);
  
  // If not a valid number, try to find by description
  if (statusCode === null && typeof code === 'string') {
    statusCode = findStatusCodeByDescription(code);
  }
  
  // If still not found, return false
  if (statusCode === null) {
    return false;
  }
  
  return statusCode >= 300 && statusCode < 400;
}

/**
 * Checks if a status code is in the Client Error category (4xx)
 * @param {number|string} code - The HTTP status code or its description
 * @returns {boolean} True if the code is in the Client Error category
 */
function isClientError(code) {
  // Try to parse as a status code first
  let statusCode = normalizeStatusCode(code);
  
  // If not a valid number, try to find by description
  if (statusCode === null && typeof code === 'string') {
    statusCode = findStatusCodeByDescription(code);
  }
  
  // If still not found, return false
  if (statusCode === null) {
    return false;
  }
  
  return statusCode >= 400 && statusCode < 500;
}

/**
 * Checks if a status code is in the Server Error category (5xx)
 * @param {number|string} code - The HTTP status code or its description
 * @returns {boolean} True if the code is in the Server Error category
 */
function isServerError(code) {
  // Try to parse as a status code first
  let statusCode = normalizeStatusCode(code);
  
  // If not a valid number, try to find by description
  if (statusCode === null && typeof code === 'string') {
    statusCode = findStatusCodeByDescription(code);
  }
  
  // If still not found, return false
  if (statusCode === null) {
    return false;
  }
  
  return statusCode >= 500 && statusCode < 600;
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
 * @param {number|string} code - The HTTP status code or its description
 * @returns {string[]} Array of common use cases or empty array if none defined
 */
function getStatusCodeUseCases(code) {
  // Try to parse as a status code first
  let statusCode = normalizeStatusCode(code);
  
  // If not a valid number, try to find by description
  if (statusCode === null && typeof code === 'string') {
    statusCode = findStatusCodeByDescription(code);
  }
  
  // If still not found, return empty array
  if (statusCode === null) {
    return [];
  }
  
  return statusCodeUseCases[statusCode] || [];
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
  findStatusCodeByDescription,
};

// This is a simple wrapper for browser compatibility
// You'll need to use a bundler like webpack, rollup, or esbuild to build this


// Attach to window object for browser usage
if (typeof window !== "undefined") {
  window.httpStatusMeaning = httpStatusMeaning;
}

export { httpStatusMeaning as default };
//# sourceMappingURL=http-status-meaning.esm.js.map
