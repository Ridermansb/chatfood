module.exports = {
    displayName: 'test',
    rootDir: 'src/',
    clearMocks: true,
    errorOnDeprecated: true,
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
        '<rootDir>/**/*.{ts,tsx}',
        '!**/__mocks__/**',
        '!**/@types/**',
    ],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: -10,
        },
    },
    setupFilesAfterEnv: ['../jest.setup.ts'],
    testMatch: ['<rootDir>/**/*.test.ts?(x)'],
    notify: true,
    notifyMode: 'failure-change',
    preset: 'ts-jest',
    // transform: {
    //     '^.+\\.tsx?$': 'ts-jest',
    // },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/__mocks__/fileMock.ts',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
};
