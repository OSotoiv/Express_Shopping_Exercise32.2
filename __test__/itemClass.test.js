const { Item } = require('../itemClass');
const { ExpressError } = require('../custom_errors');
const items_DB = require('../fakeDb');

describe('Item Class instance methods', () => {
    test('Test Creating new Item instance', () => {
        const item = new Item('coffee', 3.65);
        expect(item).toBeInstanceOf(Item);
        expect(item.name).toEqual('coffee');
        expect(item.price).toEqual(3.65);
    });
    //why do you have to wrap the expect in a function?????
    test('Test for Error when new Item properties omitted', () => {
        expect(() => new Item('Error', "")).toThrow(ExpressError);
        expect(() => new Item('', "4.00")).toThrow(expect.any(ExpressError));
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

describe('Item Class static methods', () => {
    let item;
    beforeEach(() => {
        item = new Item('coffee', 3.65);
        item.save();
    })
    afterEach(() => {
        item.delete()
    })
    test('.getAll() should return all items from the database', () => {
        expect(Item.getAll()).toEqual(items_DB);
    })
    test('.getAll() after saving new item', () => {
        expect(Item.getAll()).toContainEqual(item)
        expect(Item.getAll()).toContainEqual({ name: item.name, price: item.price })
    })
    test('.searchByName() should return Item instance if found', () => {
        expect(Item.searchByName(item.name)).toBeInstanceOf(Item);
        //found this code online for testing errors. not really sure how this work.
        //ask mentor for help...
        expect(() => Item.searchByName('NotItem')).toThrow(ExpressError);
        expect(() => Item.searchByName('NotItem')).toThrow(expect.any(ExpressError));
        expect(() => Item.searchByName('NotItem')).toThrowError(new ExpressError(`'NotItem' not found`, 400));
    })

    test('.updateByName should return updated item if item exist and is updated', () => {
        const updatedItem = Item.updateByName(item.name, 'NewItem!', '99.99')
        expect(updatedItem).toBeInstanceOf(Item);
        expect(updatedItem.name).toEqual('NewItem!');
        expect(updatedItem.price).toEqual(99.99);
        //you have to manual delete this item because the item in afterEach function has changed
        updatedItem.delete();
    })
    test('.updateByName Errors', () => {
        //name not found throws error
        expect(() => Item.updateByName('notFound', 'New Name!', '99.99')).toThrow(ExpressError);
        expect(() => Item.updateByName('notFound', 'New Name!', '99.99')).toThrow(expect.any(ExpressError));
        expect(() => Item.updateByName('notFound', 'New Name!', '99.99')).toThrowError(new ExpressError(`'NotItem' not found`, 400));
        //new name can not be blank
        expect(() => Item.updateByName(item.name, '', '99.99')).toThrow(ExpressError);
        //blank price with default to original price
        const updatedItem = Item.updateByName(item.name, 'NewItem!', '')
        expect(updatedItem).toBeInstanceOf(Item);
        //you have to point item to the updated item because call item.delete afterEach
        item = updatedItem;
    })
})
