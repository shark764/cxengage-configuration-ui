module.exports = {
  collectCoverageFrom: ['src/**/*.{js,jsx,mjs}'],
  testMatch: ['<rootDir>/src/**/__tests__/**/*.{js,jsx,mjs}', '<rootDir>/src/**/?(*.)(spec|test).{js,jsx,mjs}'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|svg)$': '<rootDir>/config/jest/fileTransform.js',
    '^.+\\.(css)$': '<rootDir>/config/jest/cssTransform.js'
  },
  setupFiles: ['jest-canvas-mock', '<rootDir>/config/enzymeConfig.js'],
  transform: {
    '^.+\\.(js|jsx|mjs)$': './config/jest/jest-transformer.js'
  },
  transformIgnorePatterns: ['node_modules/(?!(cx-ui-components)/)', 'node_modules/sanitize.css/'],
  snapshotSerializers: ["enzyme-to-json/serializer"]
};
