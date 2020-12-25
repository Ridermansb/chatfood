/* eslint-disable jest/no-hooks,jest/require-top-level-describe */
/* eslint-env jest */

import { server } from './mocks/server';
import fetch from 'cross-fetch';

global.fetch = fetch;

beforeAll(() => {
    server.listen();
});

afterEach(() => {
    server.resetHandlers();
});

afterAll(() => {
    server.close();
});
