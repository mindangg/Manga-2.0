require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')

const Manga = require('./models/mangaModel')
const initializerArray = require('./initializer')

const mangaRoutes = require('./routes/mangaRoutes')
const userRoutes = require('./routes/userRoutes')
const cartRoutes = require('./routes/cartRoutes')
const orderRoutes = require('./routes/orderRoutes')
const employeeRoutes = require('./routes/employeeRoutes')

const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// cors
app.use(cors({origin: 'http://localhost:5173'}))

// serve static files from the '/uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// routes
app.use('/api/manga', mangaRoutes)
app.use('/api/user', userRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/employee', employeeRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Connected to db and listening to port', process.env.PORT)
        })

        Manga.countDocuments().then(count => {
            if (count === 0) {
                Manga.insertMany(initializerArray)
                .then(() => console.log('Manga data initialized.', initializerArray.length))
                .catch(err => console.error('Error initializing manga data:', err));
            }
            else {
            console.log('Manga data already exists. Skipping initialization.');
          }
        })
    })
    .catch((error) => {
        console.log(error)
    })

// mongoose.connect(process.env.MONGO_URI)
//     .then(() => {
//         app.listen(process.env.PORT, () => {
//             console.log('Connected to db and listening to port', process.env.PORT)
//         })
//     })
//     .catch((error) => {
//         console.log(error)
//     })

app.get('/', (req, res) => {
    res.status(200).json({mssg: 'Welcome to the app'})
})

