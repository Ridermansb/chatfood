import reducer, { Creators, SetDishesAction } from './dishes';

describe('dishes', () => {
    it('should reducer be default exported', () => {
        expect.hasAssertions();
        expect(reducer).toBeDefined();
    });

    it('should setAll dispatch as', function () {
        expect.hasAssertions();
        const apiResponse: SetDishesAction = {
            dishes: { items: [], categories: [] },
        };
        const dispath = Creators.setAll(apiResponse);
        expect(dispath).toMatchInlineSnapshot(`
            Object {
              "dishes": Object {
                "dishes": Object {
                  "categories": Array [],
                  "items": Array [],
                },
              },
              "type": "dishes/SET_ALL",
            }
        `);
    });
});
