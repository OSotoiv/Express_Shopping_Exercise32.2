const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const { ExpressError } = require('./custom_errors')

//send all routes that start with items to the itemsRoutes
const itemRoutes = require('./itemRoutes')
app.use("/items", itemRoutes);

app.use((req, res, next) => {
    return next(new ExpressError('I dont know that route', 404))
})

app.use((error, req, res, next) => {
    msg = error.msg || 'something went wrong';
    code = error.code || 500;
    console.log(msg, code)
    return res.status(code).json({ Error: { msg: msg, status_code: code } })
})


app.listen(3000, function () {
    console.log('Ctrl+Click >>>>>', 'http://localhost:3000/items');
})