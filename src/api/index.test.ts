import api from '@api';

describe('@api', () => {
    describe('dishes', () => {
        it('should have get method', function () {
            expect.hasAssertions();
            expect(typeof api.dishes.get).toBe('function');
        });
        it('should get method be resolved', function () {
            expect.hasAssertions();
            // eslint-disable-next-line jest/no-test-return-statement
            return expect(api.dishes.get()).resolves.toBeTruthy();
        });
    });
});
