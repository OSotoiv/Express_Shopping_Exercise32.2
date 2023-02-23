# Express Shopping List
This an an Exercise in useing Express


### Requirements:
* Node.js version 12 or higher
* npm (Node.js package manager)

### Install package.json:
```
npm init
```

### Usage/Routes:
#### GET http://localhost:3000/items
* Will return all items
```
{
	"items": [
		{
			"name": "popsicle",
			"price": 1.45
		},
		{
			"name": "cheerios",
			"price": 1.4
		},
		{
			"name": "snacks",
			"price": 1.4
		}
	]
}
```
#### POST http://localhost:3000/items
* Send the item you want to add to the list
* Accepts JSON or Form URL Encoded
```
{
	"item_name": "Fruit",
	"item_price": 5.99
}
```
* Returns JSON of the item if added to the list successfully.
```
{
	"created": {
		"name": "Fruits",
		"price": 5.99
	}
}
```

#### GET http://localhost:3000/items/:name 
* Search Item by name and Returns the item if found.
```
{
	"item": {
		"name": "Fruits",
		"price": 5.99
	}
}
```
#### PATCH http://localhost:3000/items/:name
* Accepts JSON or Form URL Encoded.
* new_price may be omited. Old price will be default price if new_price is omited.
```
{
	"new_name": "Fits",
	"new_price": ""
}
```
* Update Item by name
* Return the updated item if found.
```
{
    "updated_item:"{
	    "new_name": "Fruit",
	    "new_price": 5.99
    }
}
```

#### DELETE http://localhost:3000/items/:name
* Deletes Item by name and Returns the deleted item if found.
```
{
	"delted_item": {
		"name": "Fruits",
		"price": 5.99
	}
}
```