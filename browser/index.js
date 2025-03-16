// This is a simple wrapper for browser compatibility
// You'll need to use a bundler like webpack, rollup, or esbuild to build this

// Import everything from the main module
import httpStatusMeaning from "../src/index.mjs";

// Attach to window object for browser usage
if (typeof window !== "undefined") {
  window.httpStatusMeaning = httpStatusMeaning;
}

export default httpStatusMeaning;
