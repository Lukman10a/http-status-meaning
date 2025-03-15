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
});

describe("getStatusCategory", () => {
  test("returns 'Informational' for 1xx codes", () => {
    expect(getStatusCategory(100)).toBe("Informational");
    expect(getStatusCategory(101)).toBe("Informational");
  });

  test("returns 'Success' for 2xx codes", () => {
    expect(getStatusCategory(200)).toBe("Success");
  });
});
