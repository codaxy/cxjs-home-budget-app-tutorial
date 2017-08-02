// TODO: set to false and use UIState.init once the user authentication is implemented
let stateKey = 'cx-home-budget';

export class UIState {
    static init(userId) {
        stateKey = `cx-home-budget/user/${userId}`;
    }

    static set(key, value) {
        if (!stateKey)
            return;

        let cacheKey = `${stateKey}:${key}`;

        if (value != null)
            localStorage.setItem(cacheKey, JSON.stringify(value));
        else
            localStorage.removeItem(cacheKey);
    }

    static get(key) {

        if (!stateKey)
            return null;

        let cacheKey = `${stateKey}:${key}`;

        let json = localStorage.getItem(cacheKey);
        if (json) {
            try {
                return JSON.parse(json);
            }
            catch (e) {
                console.error('Error occurred while parsing UI state key.', key);
            }
        }
        return null;
    }
}
