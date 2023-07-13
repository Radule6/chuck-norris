module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/test/**/*.ts'],
  setupFiles: ['dotenv/config'],
};
