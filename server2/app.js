const express = require('express')
const app = express()
const PORT = 5000
const mongoose = require('mongoose')
const { MONGOURI } = require('./keys')
const cors = require('cors')

app.use(cors())
require('./models/user')
require('./models/post')
require('./models/admin')
app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log("Connected to mongo db successfully");
})

mongoose.connection.on('error', (err) => {
    console.log(err);
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})