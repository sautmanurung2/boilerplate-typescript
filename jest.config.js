module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/src/tests/setupTest.ts"],
  testMatch: ["<rootDir>/src/tests/**/*.integration.test.ts", "<rootDir>/src/tests/**/*.test.ts"],
  transform: {
    "^.+\\.ts$": [
      "ts-jest",
      {
        isolatedModules: true,
      },
    ],
  },
};
