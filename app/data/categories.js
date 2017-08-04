export const categories = [
    {
        id: 'cat1',
        name: 'Children'
    }, {
        id: 'cat2',
        name: 'Debt'
    },{
        id: 'cat3',
        name: 'Education'
    },{
        id: 'cat4',
        name: 'Entertainment'
    },{
        id: 'cat5',
        name: 'Everyday'
    },{
        id: 'cat6',
        name: 'Gifts'
    },{
        id: 'cat7',
        name: 'Health/medical'
    },{
        id: 'cat8',
        name: 'Home'
    },{
        id: 'cat9',
        name: 'Insurance'
    },{
        id: 'cat10',
        name: 'Pets'
    },{
        id: 'cat11',
        name: 'Technology'
    },{
        id: 'cat12',
        name: 'Transportation'
    },{
        id: 'cat13',
        name: 'Travel'
    },{
        id: 'cat14',
        name: 'Utilities'
    }
];

export const categoryNames = {};

categories.forEach(c => {
    categoryNames[c.id] = c.name;
});

export const subCategories = [
    {
        id: 11,
        name: 'Activities',
        catId: 'cat1'
    },{
        id: 12,
        name: 'Allowance',
        catId: 'cat1'
    },{
        id: 13,
        name: 'Medical',
        catId: 'cat1'
    },{
        id: 14,
        name: 'Childcare',
        catId: 'cat1'
    },{
        id: 15,
        name: 'Clothing',
        catId: 'cat1'
    },{
        id: 16,
        name: 'School',
        catId: 'cat1'
    },{
        id: 17,
        name: 'Toys',
        catId: 'cat1'
    },{
        id: 18,
        name: 'Other',
        catId: 'cat1'
    },{
        id: 21,
        name: 'Credit cards',
        catId: 'cat2'
    },{
        id: 22,
        name: 'Student loans',
        catId: 'cat2'
    },{
        id: 23,
        name: 'Other loans',
        catId: 'cat2'
    },{
        id: 24,
        name: 'Taxes',
        catId: 'cat2'
    },{
        id: 25,
        name: 'Other',
        catId: 'cat2'
    },{
        id: 31,
        name: 'Tuition',
        catId: 'cat3'
    },{
        id: 32,
        name: 'Books',
        catId: 'cat3'
    },{
        id: 33,
        name: 'Music lessons',
        catId: 'cat3'
    },{
        id: 34,
        name: 'Other',
        catId: 'cat3'
    },{
        id: 41,
        name: 'Books',
        catId: 'cat4'
    },{
        id: 42,
        name: 'Concerts/shows',
        catId: 'cat4'
    },{
        id: 43,
        name: 'Games',
        catId: 'cat4'
    },{
        id: 44,
        name: 'Hobbies',
        catId: 'cat4'
    },{
        id: 45,
        name: 'Movies',
        catId: 'cat4'
    },{
        id: 46,
        name: 'Music',
        catId: 'cat4'
    },{
        id: 47,
        name: 'Outdoor activities',
        catId: 'cat4'
    },{
        id: 48,
        name: 'Photography',
        catId: 'cat4'
    },{
        id: 49,
        name: 'Sports',
        catId: 'cat4'
    },{
        id: 410,
        name: 'Theater/plays',
        catId: 'cat4'
    },{
        id: 411,
        name: 'TV',
        catId: 'cat4'
    },{
        id: 412,
        name: 'Other',
        catId: 'cat4'
    },{
        id: 51,
        name: 'Groceries',
        catId: 'cat5'
    },{
        id: 52,
        name: 'Restaurants',
        catId: 'cat5'
    },{
        id: 53,
        name: 'Personal supplies',
        catId: 'cat5'
    },{
        id: 54,
        name: 'Clothes',
        catId: 'cat5'
    },{
        id: 55,
        name: 'Laundry/dry cleaning',
        catId: 'cat5'
    },{
        id: 56,
        name: 'Hair/beauty',
        catId: 'cat5'
    },{
        id: 57,
        name: 'Subscriptions',
        catId: 'cat5'
    },{
        id: 58,
        name: 'Other',
        catId: 'cat5'
    },{
        id: 61,
        name: 'Gifts',
        catId: 'cat6'
    },{
        id: 62,
        name: 'Donations (charity)',
        catId: 'cat6'
    },{
        id: 63,
        name: 'Other',
        catId: 'cat6'
    },{
        id: 71,
        name: 'Doctors/dental/vision',
        catId: 'cat7'
    },{
        id: 72,
        name: 'Specialty care',
        catId: 'cat7'
    },{
        id: 73,
        name: 'Pharmacy',
        catId: 'cat7'
    },{
        id: 74,
        name: 'Emergency',
        catId: 'cat7'
    },{
        id: 75,
        name: 'Other',
        catId: 'cat7'
    },{
        id: 81,
        name: 'Rent/mortgage',
        catId: 'cat8'
    },{
        id: 82,
        name: 'Property taxes',
        catId: 'cat8'
    },{
        id: 83,
        name: 'Furnishings',
        catId: 'cat8'
    },{
        id: 84,
        name: 'Lawn/garden',
        catId: 'cat8'
    },{
        id: 85,
        name: 'Supplies',
        catId: 'cat8'
    },{
        id: 86,
        name: 'Maintenance',
        catId: 'cat8'
    },{
        id: 87,
        name: 'Improvements',
        catId: 'cat8'
    },{
        id: 88,
        name: 'Moving',
        catId: 'cat8'
    },{
        id: 89,
        name: 'Other',
        catId: 'cat8'
    },{
        id: 91,
        name: 'Car',
        catId: 'cat9'
    },{
        id: 92,
        name: 'Health',
        catId: 'cat9'
    },{
        id: 93,
        name: 'Home',
        catId: 'cat9'
    },{
        id: 94,
        name: 'Life',
        catId: 'cat9'
    },{
        id: 95,
        name: 'Other',
        catId: 'cat9'
    },{
        id: 101,
        name: 'Food',
        catId: 'cat10'
    },{
        id: 102,
        name: 'Vet/medical',
        catId: 'cat10'
    },{
        id: 103,
        name: 'Toys',
        catId: 'cat10'
    },{
        id: 104,
        name: 'Supplies',
        catId: 'cat10'
    },{
        id: 105,
        name: 'Other',
        catId: 'cat10'
    },{
        id: 111,
        name: 'Domains & hosting',
        catId: 'cat11'
    },{
        id: 112,
        name: 'Online services',
        catId: 'cat11'
    },{
        id: 113,
        name: 'Hardware',
        catId: 'cat11'
    },{
        id: 114,
        name: 'Software',
        catId: 'cat11'
    },{
        id: 115,
        name: 'Other',
        catId: 'cat11'
    },{
        id: 121,
        name: 'Fuel',
        catId: 'cat12'
    },{
        id: 122,
        name: 'Car payments',
        catId: 'cat12'
    },{
        id: 123,
        name: 'Repairs',
        catId: 'cat12'
    },{
        id: 124,
        name: 'Registration/license',
        catId: 'cat12'
    },{
        id: 125,
        name: 'Supplies',
        catId: 'cat12'
    },{
        id: 126,
        name: 'Public transit',
        catId: 'cat12'
    },{
        id: 127,
        name: 'Other',
        catId: 'cat12'
    },{
        id: 131,
        name: 'Airfare',
        catId: 'cat13'
    },{
        id: 132,
        name: 'Hotels',
        catId: 'cat13'
    },{
        id: 133,
        name: 'Food',
        catId: 'cat13'
    },{
        id: 134,
        name: 'Transportation',
        catId: 'cat13'
    },{
        id: 135,
        name: 'Entertainment',
        catId: 'cat13'
    },{
        id: 136,
        name: 'Other',
        catId: 'cat13'
    },{
        id: 141,
        name: 'Phone',
        catId: 'cat14'
    },{
        id: 142,
        name: 'TV',
        catId: 'cat14'
    },{
        id: 143,
        name: 'Internet',
        catId: 'cat14'
    },{
        id: 144,
        name: 'Electricity',
        catId: 'cat14'
    },{
        id: 145,
        name: 'Heat/gas',
        catId: 'cat14'
    },{
        id: 146,
        name: 'Water',
        catId: 'cat14'
    },{
        id: 147,
        name: 'Trash',
        catId: 'cat14'
    },{
        id: 148,
        name: 'Other',
        catId: 'cat14'
    }
];

export const subCategoryNames = {};

subCategories.forEach(c => {
    subCategoryNames[c.id] = c.name;
});
