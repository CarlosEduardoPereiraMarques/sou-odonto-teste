module.exports = {
    moduleNameMapper: {
        '^@root(.*)$': '<rootDir>/src$1',
        '^@components(.*)$': '<rootDir>/src/components$1',
        '^@styles(.*)$': '<rootDir>/__mocks__/styleMock.js',
        "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
      },
      
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
    bail: 1,
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: ['components/**/*.js', 'pages/**/*.js'],
    coverageReporters: ['lcov', 'text'],
    testEnvironment: 'jsdom',
  };