export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'js'],
    rootDir: 'src',
    testMatch: ['**/*.test.ts'],
    coverageDirectory: '../coverage',
};