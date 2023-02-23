const items_DB = require('./fakeDb');


class Item {
    constructor(name, price) {
        this.name = name;
        this.price = parseFloat(price);
        if (!this.price || !this.name) {
            throw new Error('name and price are required')
        }
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
            return false;
    }

    static getAll() {
        return items_DB;
    }
    static searchByName(item_name) {
        const item = items_DB.find(obj => obj.name === item_name);
        console.log(item)
        if (!item) {
            throw new Error('item not found!');
        }
        return new Item(item.name, item.price);
    }
    static updateByName(item_name, new_name, new_price = false) {
        //when calling array.find on an array of objects the item variable gets a reference to the obj
        //so when you update the reference you update the actual object in memory. 
        const item = items_DB.find(obj => obj.name === item_name);
        if (!item) {
            return 'Item not Found'
        }
        item.name = new_name;
        item.price = parseFloat(new_price) || item.price
        return item;
    }
}

module.exports = { Item }