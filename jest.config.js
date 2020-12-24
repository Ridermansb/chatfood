module.exports = {
    projects: ['./jest.config.test.js', './jest.config.eslint.js'],
    watchPlugins: [
        'jest-watch-typeahead/filename',
        'jest-watch-typeahead/testname',
        'jest-watch-select-projects',
    ],
};
