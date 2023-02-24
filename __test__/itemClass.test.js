const { Item } = require('../itemClass');
const { ExpressError } = require('../custom_errors');
const items_DB = require('../fakeDb');

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
    });
    test('Test Creating new Item instance', () => {
        const item = new Item('coffee', 3.65);
        expect(item).toBeInstanceOf(Item);
        expect(item.name).toEqual('coffee');
        expect(item.price).toEqual(3.65);
    });
    //why do you have to wrap the expect in a function?????
    test('Test for Error when new Item properties omitted', () => {
        expect(() => (new Item('Error', ""))).toThrow(ExpressError);
        expect(() => (new Item('', "4.00"))).toThrow(expect.any(ExpressError));
    })
    test('Test save instance method', () => {
        const item = new Item('coffee', 3.65);
        //returns true to signal successful save
        expect(item.save()).toEqual(true);
        expect(items_DB.findIndex(obj => obj.name === item.name)).toBeGreaterThanOrEqual(0);
    })
    test('Test delete instance method', () => {
        const item = new Item('delete me', 3.65);
        item.save();
        expect(items_DB.findIndex(obj => obj.name === item.name)).toBeGreaterThanOrEqual(0);
        item.delete()
        expect(items_DB.findIndex(obj => obj.name === item.name)).toBe(-1);
    })
})