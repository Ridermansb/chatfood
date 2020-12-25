import { rest } from 'msw';

interface MenuResponse {
    items: Array<Dish>;
}

export const handlers = [
    rest.get(/.+\/menu\.json$/, (request, response, context) => {
        const jsonResponse: MenuResponse = {
            items: [],
        };

        return response(context.json(jsonResponse));
    }),
];
