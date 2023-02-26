process.env.NODE_ENV = 'test';

const request = require("supertest");
const { app } = require('../app');
const items_DB = require('../fakeDb');
const { Item } = require('../itemClass')

describe('testing CRU for item Routes', () => {
    let item;
    const newItem = { item_name: 'testCAKE', item_price: 1.23 }
    beforeEach(() => {
        item = new Item('coffee', 3.65);
        item.save();
    })
    afterEach(() => {
        item.delete()
    })
    test('GET /items gets all items', async () => {
        const res = await request(app).get('/items');
        expect(res.statusCode).toBe(200);
        //.toContainEqual is deep equality and will search the array for the expected value
        expect(res.body.items).toContainEqual({ name: item.name, price: item.price })
    });
    test('POST /items create new item', async () => {
        const res = await request(app).post('/items').send(newItem);
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({
            created: {
                name: newItem.item_name,
                price: newItem.item_price
            }
        });
        //should be able to search the database for manualy for the crated item
        const foundItem = Item.searchByName(res.body.created.name)
        expect(foundItem.name).toBe(newItem.item_name);
        expect(foundItem.price).toBe(newItem.item_price);
        foundItem.delete();//clear data from database
    });
    test('GET /items/:name gets item by name', async () => {
        const res = await request(app).get(`/items/${item.name}`);
        expect(res.statusCode).toBe(200);
        //.toContainEqual is deep equality and will search the array for the expected value
        //use .toEqual here
        expect(res.body).toEqual({ item: { name: item.name, price: item.price } });
    });
    test('PATCH /items/:name update item by name', async () => {
        //original for reference >> >> >> item = new Item('coffee', 3.65); 
        const res = await request(app).patch(`/items/${item.name}`).send({ new_name: 'coffee Cake', new_price: '' })
        expect(res.statusCode).toBe(200);
        //price should not have changed but the name should have changed from 'coffee' to 'coffee Cake'
        expect(res.body).toEqual({ updated_item: { name: 'coffee Cake', price: item.price } });
        //Temp Fix.... had to reassign the item.name the new name manualy becasue our afterEach() calls item.delete
        //which deletes by name. normaly we would delete by ID.
        item.name = res.body.updated_item.name;
    });

});
//had to move delete to its own describe because beforeEach and afterEach were interfering
describe('testing delete only for item Routes', () => {
    let item;
    const newItem = { item_name: 'testCAKE', item_price: 1.23 }
    beforeEach(() => {
        item = new Item('coffee', 3.65);
        item.save();
    });
    test('DELETE /items/:name delete item by name', async () => {
        //Should be able to GET item info
        const foundRes = await request(app).get(`/items/${item.name}`);
        expect(foundRes.statusCode).toBe(200);
        expect(foundRes.body).toEqual({ item: { name: item.name, price: item.price } });
        //Should successfully deleate item
        const res = await request(app).delete(`/items/${item.name}`);
        expect(res.statusCode).toBe(200)
        //returns the deleted item
        expect(res.body).toEqual({ delted_item: { name: 'coffee', price: 3.65 } })
        //Should return Error msg and 400 when trying to GET the now deleted item
        const notFoundRes = await request(app).get(`/items/${item.name}`);
        expect(notFoundRes.statusCode).toBe(400);
        console.dir(notFoundRes.body)
        expect(notFoundRes.body).toEqual({ Error: { msg: `'${item.name}' not found`, status_code: 400 } })
    });
    //A SIMPLE VERSION OF THE SAME TEST AS ABOVE
    // test('DELETE /items/:name delete item by name', async () => {
    //     const foundItem = Item.searchByName(item.name);
    //     expect(foundItem).toEqual(item)
    //     const res = await request(app).delete(`/items/${item.name}`);
    //     expect(res.statusCode).toBe(200)
    //     console.dir(res.body)
    //     // const notFoundItem = Item.searchByName(item.name);
    //     // console.dir(notFoundItem);
    // });
})