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
    },{
        id: 12,
        name: 'Rent',
        catId: 'cat1'
    },{
        id: 13,
        name: 'Association fee',
        catId: 'cat1'
    },{
        id: 14,
        name: 'Property tax',
        catId: 'cat1'
    },{
        id: 21,
        name: 'Electricity',
        catId: 'cat2'
    },{
        id: 22,
        name: 'Gas/Heating',
        catId: 'cat2'
    },{
        id: 23,
        name: 'Telephone',
        catId: 'cat2'
    },{
        id: 24,
        name: 'Cellphone',
        catId: 'cat2'
    },{
        id: 25,
        name: 'Internet',
        catId: 'cat2'
    },{
        id: 26,
        name: 'Cable/Dish',
        catId: 'cat2'
    },{
        id: 27,
        name: 'Water',
        catId: 'cat2'
    },{
        id: 28,
        name: 'Garbage',
        catId: 'cat2'
    },{
        id: 31,
        name: 'Groceries',
        catId: 'cat3'
    },{
        id: 32,
        name: 'Restaurant/Fast food',
        catId: 'cat3'
    },{
        id: 41,
        name: 'Clothing',
        catId: 'cat4'
    },{
        id: 42,
        name: 'Personal items',
        catId: 'cat4'
    },{
        id: 43,
        name: 'Kids/Toys',
        catId: 'cat4'
    },{
        id: 44,
        name: 'Books/Magazines',
        catId: 'cat4'
    },{
        id: 51,
        name: 'Movies',
        catId: 'cat5'
    },{
        id: 52,
        name: 'Music',
        catId: 'cat5'
    },{
        id: 61,
        name: 'Gasoline',
        catId: 'cat6'
    },{
        id: 62,
        name: 'Auto Loan',
        catId: 'cat6'
    },{
        id: 63,
        name: 'Oil change',
        catId: 'cat6'
    },{
        id: 71,
        name: 'Insurance - Auto',
        catId: 'cat7'
    },{
        id: 72,
        name: 'Insurance - Home',
        catId: 'cat7'
    },{
        id: 73,
        name: 'Insurance - Medical',
        catId: 'cat7'
    },{
        id: 74,
        name: 'Medical Expenses - Co-pay',
        catId: 'cat7'
    },{
        id: 81,
        name: 'Air tickets',
        catId: 'cat8'
    },{
        id: 82,
        name: 'Hotel/Lodging',
        catId: 'cat8'
    },{
        id: 83,
        name: 'Gifts/Charity',
        catId: 'cat8'
    },{
        id: 84,
        name: 'Other',
        catId: 'cat8'
    }
];

export const subCategoryNames = {};

subCategories.forEach(c => {
    subCategoryNames[c.id] = c.name;
});
