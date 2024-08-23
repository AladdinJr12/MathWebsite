const express = require('express');
const cors = require('cors');
const app = require('./routes/app');

const hostname = 'localhost';
const port = 8000;


app.listen(port, hostname, () => {
    console.log(`Server started and accessible via http://${hostname}:${port}`);
});