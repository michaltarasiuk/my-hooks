module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  clearMocks: true,
  moduleDirectories: ['.', 'node_modules'],
  moduleNameMapper: {
    '^react(.*)$': '<rootDir>/node_modules/react$1',
  },
}
