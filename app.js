const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//send all routes that start with items to the itemsRoutes
const itemRoutes = require('./itemRoutes')
app.use("/items", itemRoutes);

app.use((error, req, res, next) => {
    msg = error.msg || 'something went wrong';
    code = error.status || 500;
    console.log(msg, code)
    return res.status(code).json({ Error: { msg: msg, status_code: code } })
})

app.listen(3000, function () {
    console.log('App on port 3000');
})