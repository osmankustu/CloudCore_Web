/** @type {import('jest').Config} */
const nodeVersion = process.env.NODE_VERSION || "unknown";
module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.test.json", // Teste özel tsconfig
    },
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.svg$": "<rootDir>/__mocks__/svgMock.ts",
    "^@/(.*)$": "<rootDir>/src/$1", // ALIAS buraya eklenmeli
  },
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  coverageDirectory: `coverage/node${nodeVersion}`,
  reporters: [
    "default",
    [
      "jest-junit",
      {
        outputDirectory: `test-results/jest-stare-reports/node${nodeVersion}`,
        outputName: `results-node${nodeVersion}.xml`,
      },
    ],
    [
      "jest-stare",
      {
        resultDir: `test-results/jest-stare-reports/node${nodeVersion}`,
        filename: "jest-stare.html",
        reportTitle: `CloudCore Web Test Results - Node ${nodeVersion}`,
        enableWebOutput: true,
      },
    ],
  ],
  collectCoverage: true,
};
