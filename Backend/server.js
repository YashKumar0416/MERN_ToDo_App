const express = require('express');
const app = express();
require('./db/db');
const User = require('./Model/User');
const PORT = process.env.PORT || 8000;

app.use(express.json())
app.use(require('./Router/routes'))

app.listen(PORT, ()=> {
    console.log(`Server listening to port ${PORT}`)
})
