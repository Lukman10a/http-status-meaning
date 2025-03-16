import terser from "@rollup/plugin-terser";

export default {
  input: "browser/index.js",
  output: [
    {
      file: "dist/http-status-meaning.js",
      format: "umd",
      name: "httpStatusMeaning",
      sourcemap: true,
    },
    {
      file: "dist/http-status-meaning.min.js",
      format: "umd",
      name: "httpStatusMeaning",
      plugins: [terser()],
      sourcemap: true,
    },
    {
      file: "dist/http-status-meaning.esm.js",
      format: "es",
      sourcemap: true,
    },
  ],
};
