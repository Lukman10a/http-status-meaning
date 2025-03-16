import statusCodes from "./statusCodes.mjs";
import {
  availableLanguages,
  categoryTranslations,
  statusCodeTranslations,
} from "./i18n.mjs";
import statusCodeUseCases from "./useCases.mjs";

/**
 * Returns the human-readable meaning of an HTTP status code
 * @param {number} code - The HTTP status code
 * @param {string} [language='en'] - The language for the response
 * @returns {string} The human-readable meaning of the status code
 */
export function getStatusMeaning(code, language = "en") {
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
export function getStatusCategory(code, language = "en") {
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
export function isInformational(code) {
  return code >= 100 && code < 200;
}

/**
 * Checks if a status code is in the Success category (2xx)
 * @param {number} code - The HTTP status code
 * @returns {boolean} True if the code is in the Success category
 */
export function isSuccess(code) {
  return code >= 200 && code < 300;
}

/**
 * Checks if a status code is in the Redirection category (3xx)
 * @param {number} code - The HTTP status code
 * @returns {boolean} True if the code is in the Redirection category
 */
export function isRedirection(code) {
  return code >= 300 && code < 400;
}

/**
 * Checks if a status code is in the Client Error category (4xx)
 * @param {number} code - The HTTP status code
 * @returns {boolean} True if the code is in the Client Error category
 */
export function isClientError(code) {
  return code >= 400 && code < 500;
}

/**
 * Checks if a status code is in the Server Error category (5xx)
 * @param {number} code - The HTTP status code
 * @returns {boolean} True if the code is in the Server Error category
 */
export function isServerError(code) {
  return code >= 500 && code < 600;
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
 * @param {number} code - The HTTP status code
 * @returns {string[]} Array of common use cases or empty array if none defined
 */
export function getStatusCodeUseCases(code) {
  return statusCodeUseCases[code] || [];
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
};
