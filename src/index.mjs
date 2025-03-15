import statusCodes from "./statusCodes.mjs";

/**
 * Returns the human-readable meaning of an HTTP status code
 * @param {number} code - The HTTP status code
 * @returns {string} The human-readable meaning of the status code
 */
export function getStatusMeaning(code) {
  return statusCodes[code] || "Unknown status code";
}

/**
 * Returns the category of an HTTP status code
 * @param {number} code - The HTTP status code
 * @returns {string} The category of the status code
 */
export function getStatusCategory(code) {
  if (code >= 100 && code < 200) return "Informational";
  if (code >= 200 && code < 300) return "Success";
  if (code >= 300 && code < 400) return "Redirection";
  if (code >= 400 && code < 500) return "Client Error";
  if (code >= 500 && code < 600) return "Server Error";
  return "Unknown";
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
 * @returns {Object} An object containing the filtered status codes and their meanings
 */
export function getStatusCodesByCategory(category) {
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
      result[code] = statusCodes[code];
    }
  }

  return result;
}

/**
 * Returns all status codes
 * @returns {Object} An object containing all status codes and their meanings
 */
export function getAllStatusCodes() {
  return { ...statusCodes };
}
