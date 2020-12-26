module.exports = {
    displayName: 'test',
    rootDir: 'src/',
    clearMocks: true,
    errorOnDeprecated: true,
    testEnvironment: 'jest-environment-jsdom-sixteen',
    coverageDirectory: 'coverage',
    collectCoverageFrom: ['<rootDir>/**/*.{ts,tsx}', '<rootDir>/**/*.{js,jsx}'],
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/__mocks__/',
        '/mocks/',
        '/@types/',
    ],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: -10,
        },
    },
    setupFilesAfterEnv: ['../jest.setup.ts', './setupTests.ts'],
    testMatch: ['<rootDir>/**/*.test.ts?(x)'],
    notify: true,
    notifyMode: 'failure-change',
    preset: 'ts-jest',
    // transform: {
    //     '^.+\\.tsx?$': 'ts-jest',
    // },
    globals: {
        __API_URL__: 'https://localhost:9500/api',
        // __API_URL__:
        //     'https://chatfood-cdn.s3.eu-central-1.amazonaws.com/fe-code-challenge-1',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/__mocks__/fileMock.ts',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '@assets/(.*)': ['<rootDir>/assets/$1'],
        '@components/(.*)': ['<rootDir>/components/$1'],
        '@api': ['<rootDir>/api/index.ts'],
    },
};
