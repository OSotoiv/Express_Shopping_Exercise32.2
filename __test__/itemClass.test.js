const { ExpressError } = require('./custom_errors');


describe('Item Class instance methods', () => {
    let test_DB;
    beforeEach(() => {
        test_DB = [
            { name: "jam", price: 3.40 },
            { name: "water", price: 3.99 },
            { name: "pizza", price: 6.40 },
            { name: "cookies", price: 5.40 },
            { name: "milk", price: 4.50 }
        ];
    })
})