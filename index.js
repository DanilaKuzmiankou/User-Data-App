require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const cors = require('cors')
const router = require('./routes')

const path = require('path');
const PORT = process.env.PORT || 5000

const app = express()

if(process.env.NODE_ENV === "production"){
    app.use(express.static('client/build'));
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
    app.get('/userPage', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}



app.use(cors({origin: true}))
app.use(express.json())

app.use('/api', router)

const start = async () => {
    try {

        await sequelize.authenticate()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

    } catch (e) {
        console.log(e)
    }
}

start()