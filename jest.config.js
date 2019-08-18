module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  moduleNameMapper: {
    '@testco/(.*)': '<rootDir>/src/$1',
  },
}
