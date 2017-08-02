export const categories = [
    {
        id: 'cat1',
        name: 'Home/Rent'
    }, {
        id: 'cat2',
        name: 'Utilities'
    },{
        id: 'cat3',
        name: 'Food/Groceries'
    },{
        id: 'cat4',
        name: 'Departmental'
    },{
        id: 'cat5',
        name: 'Entertainment'
    },{
        id: 'cat6',
        name: 'Car'
    },{
        id: 'cat7',
        name: 'Insurance/Medical'
    },{
        id: 'cat8',
        name: 'Misc/One-time'
    }
];

export const categoryNames = {};

categories.forEach(c => {
    categoryNames[c.id] = c.name;
});

export const subCategories = [
    {
        id: 11,
        name: 'Mortgage',
        catId: 'cat1'
    },
    {
        id: 12,
        name: 'Rent',
        catId: 'cat1'
    },
    {
        id: 13,
        name: 'Association fee',
        catId: 'cat1'
    },
    {
        id: 14,
        name: 'Property tax',
        catId: 'cat1'
    },
    {
        id: 21,
        name: 'Electricity',
        catId: 'cat2'
    },
    {
        id: 22,
        name: 'Gas/Heating',
        catId: 'cat2'
    },
    {
        id: 23,
        name: 'Telephone',
        catId: 'cat2'
    },
    {
        id: 24,
        name: 'Cellphone',
        catId: 'cat2'
    },
    {
        id: 25,
        name: 'Internet',
        catId: 'cat2'
    },
    {
        id: 26,
        name: 'Cable/Dish',
        catId: 'cat2'
    },
    {
        id: 27,
        name: 'Water',
        catId: 'cat2'
    },
    {
        id: 28,
        name: 'Garbage',
        catId: 'cat2'
    },
    {
        id: 31,
        name: 'Groceries',
        catId: 'cat3'
    },
    {
        id: 32,
        name: 'Restaurant/Fast food',
        catId: 'cat3'
    },
    {
        id: 41,
        name: 'Clothing',
        catId: 'cat4'
    },
    {
        id: 42,
        name: 'Personal items',
        catId: 'cat4'
    },
    {
        id: 43,
        name: 'Kids/Toys',
        catId: 'cat4'
    },
    {
        id: 44,
        name: 'Books/Magazines',
        catId: 'cat4'
    }
];

export const subCategoryNames = {};

subCategories.forEach(c => {
    subCategoryNames[c.id] = c.name;
});
