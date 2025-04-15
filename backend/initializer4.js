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
        }
    ]

module.exports = hashPasswords(initializerArray)