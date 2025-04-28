const initializerArray = [
    {
        name: "Manager",
        permissions: [
            {
                function: 'Product',
                actions: ['Create', 'Read', 'Update', 'Delete']
            },
            {
                function: 'Supplier',
                actions: ['Create', 'Read', 'Update', 'Delete']
            },
            {
                function: 'User',
                actions: ['Create', 'Read', 'Update', 'Delete']
            },
            {
                function: 'Order',
                actions: ['Create', 'Read', 'Update', 'Delete']
            },
            {
                function: 'Employee',
                actions: ['Create', 'Read', 'Update', 'Delete']
            },
            {
                function: 'User Statistic',
                actions: ['Create', 'Read', 'Update', 'Delete']
            },
            {
                function: 'Order Statistic',
                actions: ['Create', 'Read', 'Update', 'Delete']
            },
            {
                function: 'Stock Statistic',
                actions: ['Create', 'Read', 'Update', 'Delete']
            }
        ]
    },

    {
        name: "Admin",
        permissions: [
            {
                function: 'User',
                actions: ['Create', 'Read', 'Update', 'Delete']
            },
            {
                function: 'Employee',
                actions: ['Create', 'Read', 'Update', 'Delete']
            },
            {
                function: 'User Statistic',
                actions: ['Create', 'Read', 'Update', 'Delete']
            },
        ]
    },

    {
        name: "Seller",
        permissions: [
            {
                function: 'Product',
                actions: ['Read']
            },
            {
                function: 'Supplier',
                actions: ['Read']
            },
            {
                function: 'Order',
                actions: ['Create', 'Read', 'Update', 'Delete']
            },
            {
                function: 'User Statistic',
                actions: ['Create', 'Read', 'Update', 'Delete']
            },
            {
                function: 'Order Statistic',
                actions: ['Create', 'Read', 'Update', 'Delete']
            },
        ]
    },

    {
        name: "Stocker",
        permissions: [
            {
                function: 'Product',
                actions: ['Create', 'Read', 'Update', 'Delete']
            },
            {
                function: 'Supplier',
                actions: ['Create', 'Read', 'Update', 'Delete']
            },
            {
                function: 'Stock Statistic',
                actions: ['Create', 'Read', 'Update', 'Delete']
            }
        ]
    },
]

module.exports = initializerArray;
