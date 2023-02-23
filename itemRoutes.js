const { Router } = require('express')
const router = Router();
const { Item } = require('./item')

router.get("/", function (req, res, next) {
    try {
        //gets all items from fake database
        const items = Item.getAll()
        return res.json({ items: items });
    } catch (e) {
        next(e)
    }
});

router.post("/", function (req, res, next) {
    //save item to fake data base
    try {
        const { item_name, item_price } = req.body;
        const item = new Item(item_name, item_price);
        item.save()
        return res.json({ created: item });
    } catch (e) {
        next(e)
    }

});

router.get("/:name", function (req, res, next) {
    try {
        const { name } = req.params;
        const item = Item.searchByName(name);
        return res.json({ item: item });
    } catch (e) {
        next(e)
    }
});
router.patch("/:name", function (req, res, next) {
    try {
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
        if (item.delete()) {
            return res.json({ delted_item: item });
        } else {
            return res.json({ error: "item not found" })
        }
    } catch (e) {
        e.msg = e.message;
        e.status = 400;
        next(e)
    }
});


//if you try to make a delete request to / you get a 404
//how should you handle request methods that you have not defined? 
module.exports = router;