import moment from 'moment-timezone'
import { mockTransactions } from "../__mock__/mockTransactions";

export const formatDisplayDate = (date) =>
  moment(date, 'YYYY-MM-DD').format('MM/DD/YY')

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

export const calculateRewards = (amount) => {
    if( amount > 100 ) {
        return ( amount % 100 ) * 2 + 50;
    } else if(amount > 50) {
        return amount % 50;
    }
    return 0;
}

export const totalRewards = (data) => {
    console.log(data)
    let total = 0;
    for(let d of data) {
        total += calculateRewards(d.amount)
    }
    return total;
}

export const formatMoney = (v) => {
    if (!v) return '-'
    return `$${Number(v)
      .toFixed(2)
      .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`
}
  