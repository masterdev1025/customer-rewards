import { mockTransactions } from "../__mock__/mockTransactions";
export function configureFakeBackend() {
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        console.log(url)
        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(handleRoute, 500);

            function handleRoute() {
                switch (true) {
                    case url.endsWith('/transactions'):
                        return getTransactions();
                    default:
                        // pass through any requests not handled above
                        return realFetch(url, opts)
                            .then(response => resolve(response))
                            .catch(error => reject(error));
                }
            }

            // route functions

            function getTransactions() {
                return ok({
                    data: mockTransactions,
                    token: 'fake-jwt-token'
                });
            }


            // helper functions
            function ok(body) {
                resolve({ ...body });
            }

        });
    }
}