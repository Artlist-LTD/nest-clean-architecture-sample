module.exports = {
  roots: ["<rootDir>"],
  testMatch: ["<rootDir>/test/unit/**/?(*.)+(spec|test).+(ts|tsx|jsx|js)"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  //setupFiles: ["jest.setup.js"],
  moduleNameMapper: {
    "@app/(.*)": "<rootDir>/src/$1",
  },
  testEnvironment: "node",
  setupFilesAfterEnv: ["jest-extended"],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  collectCoverageFrom: [
    "<rootDir>/src/infrastructure/repositories/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/src/usecases/**/*.{js,jsx,ts,tsx}",
  ],
};
