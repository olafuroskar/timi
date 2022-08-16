module.exports = {
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleDirectories: ['node_modules', 'packages/timestring/src'],
  moduleNameMapper: {
    '^@/timi/timestring/(.*)$': '<rootDir>/packages/timestring/src/$1'
  },
  transformIgnorePatterns: ['/node_modules/(?!@testing-library)']
};
