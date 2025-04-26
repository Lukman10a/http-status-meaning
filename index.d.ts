declare module 'http-status-meaning' {
  export type SupportedLanguage = 'en' | 'es' | 'fr' | 'de' | 'pt' | 'it' | 'ru' | 'zh' | 'ja' | 'ar';
  export type StatusCategory = 'informational' | 'success' | 'redirection' | 'clientError' | 'serverError';
  
  /**
   * Returns the human-readable meaning of an HTTP status code
   * @param code The HTTP status code
   * @param language The language for the response
   * @returns The human-readable meaning of the status code
   */
  export function getStatusMeaning(code: number | string, language?: SupportedLanguage): string;
  
  /**
   * Returns the category of an HTTP status code
   * @param code The HTTP status code
   * @param language The language for the response
   * @returns The category of the status code
   */
  export function getStatusCategory(code: number | string, language?: SupportedLanguage): string;
  
  /**
   * Checks if a status code is in the Informational category (1xx)
   * @param code The HTTP status code
   * @returns True if the code is in the Informational category
   */
  export function isInformational(code: number | string): boolean;
  
  /**
   * Checks if a status code is in the Success category (2xx)
   * @param code The HTTP status code
   * @returns True if the code is in the Success category
   */
  export function isSuccess(code: number | string): boolean;
  
  /**
   * Checks if a status code is in the Redirection category (3xx)
   * @param code The HTTP status code
   * @returns True if the code is in the Redirection category
   */
  export function isRedirection(code: number | string): boolean;
  
  /**
   * Checks if a status code is in the Client Error category (4xx)
   * @param code The HTTP status code
   * @returns True if the code is in the Client Error category
   */
  export function isClientError(code: number | string): boolean;
  
  /**
   * Checks if a status code is in the Server Error category (5xx)
   * @param code The HTTP status code
   * @returns True if the code is in the Server Error category
   */
  export function isServerError(code: number | string): boolean;
  
  /**
   * Returns all status codes in a specific category
   * @param category The category to filter by ('informational', 'success', 'redirection', 'clientError', 'serverError')
   * @param language The language for the response
   * @returns An object containing the filtered status codes and their meanings
   */
  export function getStatusCodesByCategory(category: StatusCategory, language?: SupportedLanguage): Record<string, string>;
  
  /**
   * Returns all status codes
   * @param language The language for the response
   * @returns An object containing all status codes and their meanings
   */
  export function getAllStatusCodes(language?: SupportedLanguage): Record<string, string>;
  
  /**
   * Returns common use cases for a given status code
   * @param code The HTTP status code
   * @returns Array of common use cases or empty array if none defined
   */
  export function getStatusCodeUseCases(code: number | string): string[];
  
  /**
   * Returns all supported languages
   * @returns Array of language codes
   */
  export function getSupportedLanguages(): SupportedLanguage[];
  
  /**
   * Default export containing all functions
   */
  declare const httpStatusMeaning: {
    getStatusMeaning: typeof getStatusMeaning;
    getStatusCategory: typeof getStatusCategory;
    isInformational: typeof isInformational;
    isSuccess: typeof isSuccess;
    isRedirection: typeof isRedirection;
    isClientError: typeof isClientError;
    isServerError: typeof isServerError;
    getStatusCodesByCategory: typeof getStatusCodesByCategory;
    getAllStatusCodes: typeof getAllStatusCodes;
    getStatusCodeUseCases: typeof getStatusCodeUseCases;
    getSupportedLanguages: typeof getSupportedLanguages;
  };
  
  export default httpStatusMeaning;
} 