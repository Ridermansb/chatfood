module.exports = {
    runner: 'jest-runner-eslint',
    displayName: 'lint',
    rootDir: '.',
    testMatch: ['<rootDir>/**/*.ts?(x)', '<rootDir>/**/*.js?(x)'],
    testPathIgnorePatterns: [
        '/node_modules/',
        '/dist/',
        '/coverage/',
        '/.vercel/',
    ],
    errorOnDeprecated: true,
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
