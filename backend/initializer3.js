const bcrypt = require('bcrypt')
const hashedData = require('./initializer2')

const initializerArray =
    [
        {
            fullname: "employee1",
            email: "employee1@gmail.com",
            phone: "0901234561",
            password: "employee1",
            role: "Manager",
        },
        {
            fullname: "employee2",
            email: "employee2@gmail.com",
            phone: "0901234562",
            password: "employee2",
            role: "Manager",
        },
        {
            fullname: "employee3",
            email: "employee3@gmail.com",
            phone: "0901234563",
            password: "employee3",
            role: "Admin",
        },
        {
            fullname: "employee4",
            email: "employee4@gmail.com",
            phone: "0901234564",
            password: "employee4",
            role: "Admin",
        },
        {
            fullname: "employee5",
            email: "employee5@gmail.com",
            phone: "0901234565",
            password: "employee5",
            role: "Seller",
        },
        {
            fullname: "employee6",
            email: "employee6@gmail.com",
            phone: "0901234566",
            password: "employee6",
            role: "Seller",
        },
        {
            fullname: "employee7",
            email: "employee7@gmail.com",
            phone: "0901234567",
            password: "employee7",
            role: "Stocker",
        },
        {
            fullname: "employee8",
            email: "employee8@gmail.com",
            phone: "0901234568",
            password: "employee8",
            role: "Stocker",
        }
    ]

const hashPasswords = async (array) => {
    const hashedArray = await Promise.all(array.map(async (item) => {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(item.password, salt)
        return { ...item, password: hash }
    }))
    return hashedArray
}

module.exports = hashPasswords(initializerArray)