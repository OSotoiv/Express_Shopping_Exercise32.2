const { ExpressError } = require('./custom_errors');
const items_DB = require('./fakeDb');

//Item class calls the fake Database for getting,adding,updating,deleting items 
class Item {
    constructor(name, price) {
        //input validation
        if (!parseFloat(price) || !name.trim()) {
            throw new ExpressError('name as a string and price as a number are required', 400)
        }
        this.name = name.trim();
        this.price = parseFloat(price);
    }
    save() {
        const item = {
            name: this.name,
            price: this.price
        }
        items_DB.push(item);
        return true;
    }
    delete() {
        const index = items_DB.findIndex(obj => obj.name === this.name);
        if (index !== -1) {
            items_DB.splice(index, 1);
            return true;
        } else
            throw new ExpressError(`'${this.name}' not found`, 404);
    }

    static getAll() {
        //call for items from Database
        return items_DB;
    }
    static searchByName(item_name) {
        const item = items_DB.find(obj => obj.name === item_name);
        if (!item) {
            throw new ExpressError(`'${item_name}' not found`, 400);
        }
        return new Item(item.name, item.price);
    }
    static updateByName(item_name, new_name, new_price = false) {
        //when calling array.find on an array of objects the item variable gets a reference to the obj
        //so when you update the reference you update the actual object in memory.
        item_name = item_name.trim();
        new_name = new_name.trim();
        if (!item_name || !new_name) { throw new ExpressError('name and price are required', 400) }
        const item = items_DB.find(obj => obj.name === item_name);
        if (!item) { throw new ExpressError(`${item_name} not Found`, 400) }

        item.name = new_name;
        item.price = parseFloat(new_price) || item.price
        return item;
    }
}

module.exports = { Item }