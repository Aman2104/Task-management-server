const mongoConnection = require('./db');
const express = require('express')
var cors = require('cors')
const bodyParser = require('body-parser');


mongoConnection();
const app = express()
const port = 5000


// Middlewares 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
app.use(express.json()) 

app.use('/api/', require('./routes/task'))

 
app.listen(port, () => {
    console.log(`Server start at http://localhost:${port}`)
})