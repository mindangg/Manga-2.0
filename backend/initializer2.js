const bcrypt = require('bcrypt')

const initializerArray =
    [
        {
            username: "user1",
            email: "user1@gmail.com",
            password: "user1",
            phone: "0901234561",
            address: "101 Street, An Duong Vuong, Ward 2, District 5, Ho Chi Minh City",
        },
        {
            username: "user2",
            email: "user2@gmail.com",
            password: "user2",
            phone: "0901234562",
            address: "102 Street, An Duong Vuong, Ward 2, District 5, Ho Chi Minh City",
        },
        {
            username: "user3",
            email: "user3@gmail.com",
            password: "user3",
            phone: "0901234563",
            address: "103 Street, An Duong Vuong, Ward 2, District 5, Ho Chi Minh City",
        },
        {
            username: "user4",
            email: "user4@gmail.com",
            password: "user4",
            phone: "0901234564",
            address: "104 Street, An Duong Vuong, Ward 2, District 5, Ho Chi Minh City",
        },
        {
            username: "user5",
            email: "user5@gmail.com",
            password: "user5",
            phone: "0901234565",
            address: "105 Street, An Duong Vuong, Ward 2, District 5, Ho Chi Minh City",
        },
        {
            username: "user6",
            email: "user6@gmail.com",
            password: "user6",
            phone: "0901234566",
            address: "106 Street, An Duong Vuong, Ward 2, District 5, Ho Chi Minh City",
        },
        {
            username: "user7",
            email: "user7@gmail.com",
            password: "user7",
            phone: "0901234567",
            address: "107 Street, An Duong Vuong, Ward 2, District 5, Ho Chi Minh City",
        },
        {
            username: "user8",
            email: "user8@gmail.com",
            password: "user8",
            phone: "0901234568",
            address: "108 Street, An Duong Vuong, Ward 2, District 5, Ho Chi Minh City",
        },
        {
            username: "user9",
            email: "user9@gmail.com",
            password: "user9",
            phone: "0901234569",
            address: "109 Street, An Duong Vuong, Ward 2, District 5, Ho Chi Minh City",
        },
        {
            username: "user10",
            email: "user10@gmail.com",
            password: "user10",
            phone: "0901234570",
            address: "110 Street, An Duong Vuong, Ward 2, District 5, Ho Chi Minh City",
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