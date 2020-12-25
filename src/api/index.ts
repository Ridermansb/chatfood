/**
 * @see https://dev.to/stroemdev/make-fetch-better-and-your-api-request-methods-easier-to-implement-e9i
 */

type HttpDishes = {
    get: () => Promise<Array<Dish>>;
};

class HttpClient {
    private baseUrl: string;
    constructor(_baseUrl?: string) {
        this.baseUrl = _baseUrl || '';
    }

    private async _fetchJSON(endpoint: string, options = {}) {
        const response = await fetch(this.baseUrl + endpoint, {
            ...options,
        });

        return response.json();
    }

    protected get(endpoint: string, options = {}) {
        return this._fetchJSON(endpoint, {
            ...options,
            method: 'GET',
        });
    }
}

export class ApiClient extends HttpClient {
    constructor() {
        super(__API_URL__);
    }

    public get dishes(): HttpDishes {
        return {
            get: () => this.get('/menu.json'),
        };
    }
}

export default new ApiClient();
