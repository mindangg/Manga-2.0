require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')

const Manga = require('./models/mangaModel')
const User = require('./models/userModel')
const Employee = require('./models/employeeModel')
const initializerArray1 = require('./initializer1')
const initializerArray2 = require('./initializer2')
const initializerArray3 = require('./initializer3')

const mangaRoutes = require('./routes/mangaRoutes')
const userRoutes = require('./routes/userRoutes')
const cartRoutes = require('./routes/cartRoutes')
const orderRoutes = require('./routes/orderRoutes')
const employeeRoutes = require('./routes/employeeRoutes')
const supplierRoutes = require('./routes/supplierRoutes')
const stockRoutes = require('./routes/stockRoutes')
const pdfRoutes = require('./routes/pdfRoutes')
const userStatisticRoutes = require('./routes/userStatisticRoutes')
const orderStatisticRoutes = require('./routes/orderStatisticRoutes')
const stockStatisticRoutes = require('./routes/stockStatisticRoutes')
const roleRoutes = require('./routes/roleRoutes')

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
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// print pdf files
app.use('/api/pdf', pdfRoutes)

// routes
app.use('/api/manga', mangaRoutes)
app.use('/api/user', userRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/employee', employeeRoutes)
app.use('/api/supplier', supplierRoutes)
app.use('/api/stock', stockRoutes)
app.use('/api/user-statistic', userStatisticRoutes)
app.use('/api/order-statistic', orderStatisticRoutes)
app.use('/api/stock-statistic', stockStatisticRoutes)
app.use('/api/role', roleRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Connected to db and listening to port', process.env.PORT)
        })

        Manga.countDocuments().then(count => {
            if (count === 0) {
                Manga.insertMany(initializerArray1)
                .then(() => console.log('Manga data initialized.', initializerArray1.length))
                .catch(err => console.error('Error initializing manga data:', err))
            }
            else {
            console.log('Manga data already exists.')
          }
        })

        User.countDocuments().then(async count => {
            if (count === 0) {
                const hashedUsers = await initializerArray2
                await User.insertMany(hashedUsers)
                console.log('Initialized users.')
            } else {
                console.log('Users already exist.')
            }
        })

        Employee.countDocuments().then(async count => {
            if (count === 0) {
                const hashedEmployees = await initializerArray3
                await Employee.insertMany(hashedEmployees)
                console.log('Initialized employees.')
            } else {
                console.log('Employees already exist.')
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

