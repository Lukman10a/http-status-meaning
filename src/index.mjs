import statusCodes from "./statusCodes.mjs";
import {
  availableLanguages,
  categoryTranslations,
  statusCodeTranslations,
} from "./i18n.mjs";
import statusCodeUseCases from "./useCases.mjs";

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
export function findStatusCodeByDescription(description) {
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
export function getStatusMeaning(code, language = "en") {
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
export function getStatusCategory(code, language = "en") {
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
export function isInformational(code) {
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
export function isSuccess(code) {
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
export function isRedirection(code) {
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
export function isClientError(code) {
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
export function isServerError(code) {
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
export function getStatusCodesByCategory(category, language = "en") {
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
export function getAllStatusCodes(language = "en") {
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
export function getStatusCodeUseCases(code) {
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
export function getSupportedLanguages() {
  return [...availableLanguages];
}

// Export everything for browser usage
export default {
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
