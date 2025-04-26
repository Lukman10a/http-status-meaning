import { expect, describe, test } from "@jest/globals";
import {
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
  findStatusCodeByDescription
} from "../src/index.mjs";

describe("getStatusMeaning", () => {
  test("returns correct meaning for 200", () => {
    expect(getStatusMeaning(200)).toBe("OK - The request was successful.");
  });

  test("returns correct meaning for 404", () => {
    expect(getStatusMeaning(404)).toBe(
      "Not Found - The requested resource does not exist."
    );
  });

  test("returns 'Unknown status code' for an invalid code", () => {
    expect(getStatusMeaning(999)).toBe("Unknown status code");
  });

  test("returns translated meaning for supported languages", () => {
    expect(getStatusMeaning(404, "fr")).toContain("Non trouvé");
    expect(getStatusMeaning(200, "es")).toContain("éxito");
  });

  test("falls back to English for unsupported languages", () => {
    expect(getStatusMeaning(200, "xyz")).toBe("OK - The request was successful.");
  });

  test("handles non-numeric inputs", () => {
    expect(getStatusMeaning("200")).toBe("OK - The request was successful.");
    expect(getStatusMeaning(null)).toBe("Unknown status code");
    expect(getStatusMeaning(undefined)).toBe("Unknown status code");
    expect(getStatusMeaning("not-a-number")).toBe("Unknown status code");
  });
  
  test("handles fuzzy description matching", () => {
    expect(getStatusMeaning("Not Found")).toBe("Not Found - The requested resource does not exist.");
    expect(getStatusMeaning("Bad Request")).toBe("Bad Request - The request could not be understood.");
    expect(getStatusMeaning("internal server error")).toBe("Internal Server Error - A generic error message for server issues.");
  });
});

describe("getStatusCategory", () => {
  test("returns 'Informational' for 1xx codes", () => {
    expect(getStatusCategory(100)).toBe("Informational");
    expect(getStatusCategory(101)).toBe("Informational");
  });

  test("returns 'Success' for 2xx codes", () => {
    expect(getStatusCategory(200)).toBe("Success");
    expect(getStatusCategory(201)).toBe("Success");
    expect(getStatusCategory(204)).toBe("Success");
  });

  test("returns 'Redirection' for 3xx codes", () => {
    expect(getStatusCategory(301)).toBe("Redirection");
    expect(getStatusCategory(302)).toBe("Redirection");
    expect(getStatusCategory(307)).toBe("Redirection");
  });

  test("returns 'Client Error' for 4xx codes", () => {
    expect(getStatusCategory(400)).toBe("Client Error");
    expect(getStatusCategory(404)).toBe("Client Error");
    expect(getStatusCategory(429)).toBe("Client Error");
  });

  test("returns 'Server Error' for 5xx codes", () => {
    expect(getStatusCategory(500)).toBe("Server Error");
    expect(getStatusCategory(503)).toBe("Server Error");
  });

  test("returns 'Unknown' for invalid codes", () => {
    expect(getStatusCategory(600)).toBe("Unknown");
    expect(getStatusCategory(0)).toBe("Unknown");
    expect(getStatusCategory(-100)).toBe("Unknown");
  });

  test("returns translated category for supported languages", () => {
    expect(getStatusCategory(200, "fr")).toBe("Succès");
    expect(getStatusCategory(404, "es")).toBe("Error del Cliente");
  });

  test("handles non-numeric inputs", () => {
    expect(getStatusCategory("200")).toBe("Success");
    expect(getStatusCategory(null)).toBe("Unknown");
    expect(getStatusCategory(undefined)).toBe("Unknown");
    expect(getStatusCategory("not-a-number")).toBe("Unknown");
  });
  
  test("handles fuzzy description matching for category detection", () => {
    expect(getStatusCategory("Not Found")).toBe("Client Error");
    expect(getStatusCategory("OK")).toBe("Success");
    expect(getStatusCategory("Internal Server Error")).toBe("Server Error");
  });
});

describe("Category check functions", () => {
  describe("isInformational", () => {
    test("returns true for 1xx codes", () => {
      expect(isInformational(100)).toBe(true);
      expect(isInformational(101)).toBe(true);
    });

    test("returns false for non-1xx codes", () => {
      expect(isInformational(200)).toBe(false);
      expect(isInformational(404)).toBe(false);
      expect(isInformational(500)).toBe(false);
    });

    test("handles edge cases", () => {
      expect(isInformational(99)).toBe(false);
      expect(isInformational(200)).toBe(false);
      expect(isInformational("100")).toBe(true);
      expect(isInformational(null)).toBe(false);
    });
    
    test("handles fuzzy description matching", () => {
      expect(isInformational("Continue")).toBe(true);
      expect(isInformational("not an informational code")).toBe(false);
    });
  });

  describe("isSuccess", () => {
    test("returns true for 2xx codes", () => {
      expect(isSuccess(200)).toBe(true);
      expect(isSuccess(201)).toBe(true);
      expect(isSuccess(204)).toBe(true);
    });

    test("returns false for non-2xx codes", () => {
      expect(isSuccess(100)).toBe(false);
      expect(isSuccess(404)).toBe(false);
      expect(isSuccess(500)).toBe(false);
    });

    test("handles edge cases", () => {
      expect(isSuccess(199)).toBe(false);
      expect(isSuccess(300)).toBe(false);
      expect(isSuccess("200")).toBe(true);
      expect(isSuccess(null)).toBe(false);
    });
    
    test("handles fuzzy description matching", () => {
      expect(isSuccess("OK")).toBe(true);
      expect(isSuccess("Created")).toBe(true);
      expect(isSuccess("not a success code")).toBe(false);
    });
  });

  describe("isRedirection", () => {
    test("returns true for 3xx codes", () => {
      expect(isRedirection(300)).toBe(true);
      expect(isRedirection(301)).toBe(true);
      expect(isRedirection(307)).toBe(true);
    });

    test("returns false for non-3xx codes", () => {
      expect(isRedirection(200)).toBe(false);
      expect(isRedirection(404)).toBe(false);
      expect(isRedirection(500)).toBe(false);
    });

    test("handles edge cases", () => {
      expect(isRedirection(299)).toBe(false);
      expect(isRedirection(400)).toBe(false);
      expect(isRedirection("300")).toBe(true);
      expect(isRedirection(null)).toBe(false);
    });
    
    test("handles fuzzy description matching", () => {
      expect(isRedirection("Moved Permanently")).toBe(true);
      expect(isRedirection("Redirect")).toBe(true);
      expect(isRedirection("not a redirection code")).toBe(false);
    });
  });

  describe("isClientError", () => {
    test("returns true for 4xx codes", () => {
      expect(isClientError(400)).toBe(true);
      expect(isClientError(404)).toBe(true);
      expect(isClientError(429)).toBe(true);
    });

    test("returns false for non-4xx codes", () => {
      expect(isClientError(200)).toBe(false);
      expect(isClientError(300)).toBe(false);
      expect(isClientError(500)).toBe(false);
    });

    test("handles edge cases", () => {
      expect(isClientError(399)).toBe(false);
      expect(isClientError(500)).toBe(false);
      expect(isClientError("400")).toBe(true);
      expect(isClientError(null)).toBe(false);
    });
    
    test("handles fuzzy description matching", () => {
      expect(isClientError("Not Found")).toBe(true);
      expect(isClientError("Bad Request")).toBe(true);
      expect(isClientError("not a client error code")).toBe(false);
    });
  });

  describe("isServerError", () => {
    test("returns true for 5xx codes", () => {
      expect(isServerError(500)).toBe(true);
      expect(isServerError(503)).toBe(true);
      expect(isServerError(504)).toBe(true);
    });

    test("returns false for non-5xx codes", () => {
      expect(isServerError(200)).toBe(false);
      expect(isServerError(300)).toBe(false);
      expect(isServerError(400)).toBe(false);
    });

    test("handles edge cases", () => {
      expect(isServerError(499)).toBe(false);
      expect(isServerError(600)).toBe(false);
      expect(isServerError("500")).toBe(true);
      expect(isServerError(null)).toBe(false);
    });
    
    test("handles fuzzy description matching", () => {
      expect(isServerError("Internal Server Error")).toBe(true);
      expect(isServerError("Service Unavailable")).toBe(true);
      expect(isServerError("not a server error code")).toBe(false);
    });
  });
});

describe("findStatusCodeByDescription", () => {
  test("returns correct code for exact match", () => {
    expect(findStatusCodeByDescription("Not Found - The requested resource does not exist.")).toBe(404);
  });
  
  test("returns correct code for partial match", () => {
    expect(findStatusCodeByDescription("Not Found")).toBe(404);
    expect(findStatusCodeByDescription("OK")).toBe(200);
    expect(findStatusCodeByDescription("Internal Server Error")).toBe(500);
  });
  
  test("returns correct code for case-insensitive match", () => {
    expect(findStatusCodeByDescription("not found")).toBe(404);
    expect(findStatusCodeByDescription("ok")).toBe(200);
    expect(findStatusCodeByDescription("internal server error")).toBe(500);
  });
  
  test("returns null for non-matching descriptions", () => {
    expect(findStatusCodeByDescription("This is not a status code")).toBe(null);
    expect(findStatusCodeByDescription("")).toBe(null);
    expect(findStatusCodeByDescription(null)).toBe(null);
    expect(findStatusCodeByDescription(undefined)).toBe(null);
  });
  
  test("handles word-based fuzzy matching", () => {
    expect(findStatusCodeByDescription("resource not found")).toBe(404);
    expect(findStatusCodeByDescription("server internal error")).toBe(500);
  });
});

describe("Collection functions", () => {
  describe("getStatusCodesByCategory", () => {
    test("returns all status codes in the informational category", () => {
      const informationalCodes = getStatusCodesByCategory("informational");
      expect(informationalCodes["100"]).toBeTruthy();
      expect(informationalCodes["101"]).toBeTruthy();
      expect(Object.keys(informationalCodes).every(code => parseInt(code) >= 100 && parseInt(code) < 200)).toBe(true);
    });

    test("returns all status codes in the success category", () => {
      const successCodes = getStatusCodesByCategory("success");
      expect(successCodes["200"]).toBeTruthy();
      expect(successCodes["201"]).toBeTruthy();
      expect(Object.keys(successCodes).every(code => parseInt(code) >= 200 && parseInt(code) < 300)).toBe(true);
    });

    test("returns all status codes in the redirection category", () => {
      const redirectionCodes = getStatusCodesByCategory("redirection");
      expect(redirectionCodes["301"]).toBeTruthy();
      expect(redirectionCodes["302"]).toBeTruthy();
      expect(Object.keys(redirectionCodes).every(code => parseInt(code) >= 300 && parseInt(code) < 400)).toBe(true);
    });

    test("returns all status codes in the client error category", () => {
      const clientErrorCodes = getStatusCodesByCategory("clientError");
      expect(clientErrorCodes["400"]).toBeTruthy();
      expect(clientErrorCodes["404"]).toBeTruthy();
      expect(Object.keys(clientErrorCodes).every(code => parseInt(code) >= 400 && parseInt(code) < 500)).toBe(true);
    });

    test("returns all status codes in the server error category", () => {
      const serverErrorCodes = getStatusCodesByCategory("serverError");
      expect(serverErrorCodes["500"]).toBeTruthy();
      expect(serverErrorCodes["503"]).toBeTruthy();
      expect(Object.keys(serverErrorCodes).every(code => parseInt(code) >= 500 && parseInt(code) < 600)).toBe(true);
    });

    test("returns empty object for invalid category", () => {
      const invalidCategory = getStatusCodesByCategory("invalid");
      expect(Object.keys(invalidCategory).length).toBe(0);
    });

    test("returns translated descriptions for supported languages", () => {
      const frenchSuccessCodes = getStatusCodesByCategory("success", "fr");
      expect(frenchSuccessCodes["200"]).toContain("réussi");
    });
  });

  describe("getAllStatusCodes", () => {
    test("returns all status codes", () => {
      const allCodes = getAllStatusCodes();
      expect(Object.keys(allCodes).length).toBeGreaterThan(50); // There should be at least 50 status codes
      expect(allCodes["200"]).toBeTruthy();
      expect(allCodes["404"]).toBeTruthy();
      expect(allCodes["500"]).toBeTruthy();
    });

    test("returns translated codes for supported languages", () => {
      const spanishCodes = getAllStatusCodes("es");
      expect(spanishCodes["404"]).toContain("No encontrado");
    });
  });

  describe("getStatusCodeUseCases", () => {
    test("returns use cases for common status codes", () => {
      const notFoundUseCases = getStatusCodeUseCases(404);
      expect(Array.isArray(notFoundUseCases)).toBe(true);
      expect(notFoundUseCases.length).toBeGreaterThan(0);
      expect(notFoundUseCases.some(useCase => useCase.includes("URL") || useCase.includes("resource"))).toBe(true);
    });

    test("returns empty array for status codes without defined use cases", () => {
      const unusualCode = getStatusCodeUseCases(418); // I'm a teapot
      expect(Array.isArray(unusualCode)).toBe(true);
    });

    test("returns empty array for invalid status codes", () => {
      expect(getStatusCodeUseCases(999)).toEqual([]);
      expect(getStatusCodeUseCases(null)).toEqual([]);
      expect(getStatusCodeUseCases("invalid")).toEqual([]);
    });
    
    test("works with descriptions instead of codes", () => {
      expect(getStatusCodeUseCases("Not Found")).toEqual(getStatusCodeUseCases(404));
      expect(getStatusCodeUseCases("Internal Server Error")).toEqual(getStatusCodeUseCases(500));
    });
  });

  describe("getSupportedLanguages", () => {
    test("returns array of supported languages", () => {
      const languages = getSupportedLanguages();
      expect(Array.isArray(languages)).toBe(true);
      expect(languages.length).toBeGreaterThan(1);
      expect(languages).toContain("en");
      expect(languages).toContain("fr");
    });

    test("returns a copy of the languages array", () => {
      const languages = getSupportedLanguages();
      const originalLength = languages.length;
      
      languages.push("test");
      
      expect(getSupportedLanguages().length).toBe(originalLength);
    });
  });
});

// NPM RECOVERY CODE

// da12fc3ed4c4a9a512e201ffd4b7d039ac245cb3a462262f6f69fc8b21e0d44f
// dd5bd39e975a4a2628f833a3f4d5d12d77a9144d8766c9b17310a80b8bd83f20
// b060d77847941a11e8bec749ede9929fe55eb525d2f7a17940f9ca3483ca5239
// f5c10ceaa7ae514fdd05f86faac146cbc106f2346fe880ce72b9c775c60b0281
// 78333a33d45dc5e72b1522a56d43f5bc635f301ab5eb180b4bbe1944cd2b8f62
