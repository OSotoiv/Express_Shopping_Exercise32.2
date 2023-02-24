const { Router } = require('express');
const router = Router();
const { Item } = require('./itemClass');
const { ExpressError } = require('./custom_errors')

router.get("/", function (req, res, next) {
    try {//gets all items from fake database
        const items = Item.getAll()
        return res.json({ items: items });
    } catch (e) {
        next(e)
    }
});

router.post("/", function (req, res, next) {
    try {//save item to fake database
        const { item_name, item_price } = req.body;
        const item = new Item(item_name, item_price);
        item.save()
        return res.json({ created: item });
    } catch (e) {
        next(e)
    }

});

router.get("/:name", function (req, res, next) {
    try {//gets item by name
        const { name } = req.params;
        const item = Item.searchByName(name);
        return res.json({ item: item });
    } catch (e) {
        next(e)
    }
});
router.patch("/:name", function (req, res, next) {
    try {//update an item by name...price will default to original price if omitted
        const { name: original_name } = req.params;
        const { new_name, new_price } = req.body;
        const item = Item.updateByName(original_name, new_name, new_price);
        return res.json({ updated_item: item });
    } catch (e) {
        next(e)
    }
});

router.delete("/:name", function (req, res, next) {
    try {
        const { name } = req.params;
        const item = Item.searchByName(name);
        item.delete()
        return res.json({ delted_item: item });
        // if (item.delete()) {
        //     return res.json({ delted_item: item });
        // } else {
        //     return res.json({ error: "item not found" })
        // }
    } catch (e) {
        next(e)
    }
});
//this error is for routes that start with /items but doesnt match any other part of the request
router.use((req, res, next) => {
    return next(new ExpressError('I dont know that Item', 404))
})

//Express has a default error handler
//if you try to make a delete request to / you get a 404
//how should you handle request methods that you have not defined? 
//can you make it so that the route acepts a list of items to add? 
//error handling needs work

module.exports = router;