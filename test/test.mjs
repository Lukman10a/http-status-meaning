import { expect, describe, test } from "@jest/globals";
import {
  getStatusMeaning,
  getStatusCategory,
  // isInformational,
  // isSuccess,
  // isRedirection,
  // isClientError,
  // isServerError,
  // getStatusCodesByCategory,
  // getAllStatusCodes,
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

// NPM RECOVERY CODE

// da12fc3ed4c4a9a512e201ffd4b7d039ac245cb3a462262f6f69fc8b21e0d44f
// dd5bd39e975a4a2628f833a3f4d5d12d77a9144d8766c9b17310a80b8bd83f20
// b060d77847941a11e8bec749ede9929fe55eb525d2f7a17940f9ca3483ca5239
// f5c10ceaa7ae514fdd05f86faac146cbc106f2346fe880ce72b9c775c60b0281
// 78333a33d45dc5e72b1522a56d43f5bc635f301ab5eb180b4bbe1944cd2b8f62
