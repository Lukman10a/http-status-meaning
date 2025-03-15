// jest.config.cjs
module.exports = {
  // Remove the extensionsToTreatAsEsm since .mjs is already treated as ESM
  testMatch: ["**/?(*.)+(spec|test).mjs"],
  transform: {},
};
