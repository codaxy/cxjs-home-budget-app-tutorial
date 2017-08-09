export const categories = [
    {
        id: 'exp1',
        name: 'Children'
    }, {
        id: 'exp2',
        name: 'Debt'
    },{
        id: 'exp3',
        name: 'Education'
    },{
        id: 'exp4',
        name: 'Entertainment'
    },{
        id: 'exp5',
        name: 'Everyday'
    },{
        id: 'exp6',
        name: 'Gifts'
    },{
        id: 'exp7',
        name: 'Health/medical'
    },{
        id: 'exp8',
        name: 'Home'
    },{
        id: 'exp9',
        name: 'Insurance'
    },{
        id: 'exp10',
        name: 'Pets'
    },{
        id: 'exp11',
        name: 'Technology'
    },{
        id: 'exp12',
        name: 'Transportation'
    },{
        id: 'exp13',
        name: 'Travel'
    },{
        id: 'exp14',
        name: 'Utilities'
    },{
        id: 'inc1',
        name: 'Wages'
    }, {
        id: 'inc2',
        name: 'Other'
    },
];

export const categoryNames = {};

categories.forEach(c => {
    categoryNames[c.id] = c.name;
});

export const subCategories = [
    {
        id: 1,
        name: 'Activities',
        catId: 'exp1'
    },{
        id: 2,
        name: 'Allowance',
        catId: 'exp1'
    },{
        id: 3,
        name: 'Medical',
        catId: 'exp1'
    },{
        id: 4,
        name: 'Childcare',
        catId: 'exp1'
    },{
        id: 5,
        name: 'Clothing',
        catId: 'exp1'
    },{
        id: 6,
        name: 'School',
        catId: 'exp1'
    },{
        id: 7,
        name: 'Toys',
        catId: 'exp1'
    },{
        id: 8,
        name: 'Other',
        catId: 'exp1'
    },{
        id: 9,
        name: 'Credit cards',
        catId: 'exp2'
    },{
        id: 10,
        name: 'Student loans',
        catId: 'exp2'
    },{
        id: 11,
        name: 'Other loans',
        catId: 'exp2'
    },{
        id: 12,
        name: 'Taxes',
        catId: 'exp2'
    },{
        id: 13,
        name: 'Other',
        catId: 'exp2'
    },{
        id: 14,
        name: 'Tuition',
        catId: 'exp3'
    },{
        id: 15,
        name: 'Books',
        catId: 'exp3'
    },{
        id: 16,
        name: 'Music lessons',
        catId: 'exp3'
    },{
        id: 17,
        name: 'Other',
        catId: 'exp3'
    },{
        id: 18,
        name: 'Books',
        catId: 'exp4'
    },{
        id: 19,
        name: 'Concerts/shows',
        catId: 'exp4'
    },{
        id: 20,
        name: 'Games',
        catId: 'exp4'
    },{
        id: 21,
        name: 'Hobbies',
        catId: 'exp4'
    },{
        id: 22,
        name: 'Movies',
        catId: 'exp4'
    },{
        id: 23,
        name: 'Music',
        catId: 'exp4'
    },{
        id: 24,
        name: 'Outdoor activities',
        catId: 'exp4'
    },{
        id: 25,
        name: 'Photography',
        catId: 'exp4'
    },{
        id: 26,
        name: 'Sports',
        catId: 'exp4'
    },{
        id: 27,
        name: 'Theater/plays',
        catId: 'exp4'
    },{
        id: 28,
        name: 'TV',
        catId: 'exp4'
    },{
        id: 29,
        name: 'Other',
        catId: 'exp4'
    },{
        id: 30,
        name: 'Groceries',
        catId: 'exp5'
    },{
        id: 31,
        name: 'Restaurants',
        catId: 'exp5'
    },{
        id: 32,
        name: 'Personal supplies',
        catId: 'exp5'
    },{
        id: 33,
        name: 'Clothes',
        catId: 'exp5'
    },{
        id: 34,
        name: 'Laundry/dry cleaning',
        catId: 'exp5'
    },{
        id: 35,
        name: 'Hair/beauty',
        catId: 'exp5'
    },{
        id: 36,
        name: 'Subscriptions',
        catId: 'exp5'
    },{
        id: 37,
        name: 'Other',
        catId: 'exp5'
    },{
        id: 38,
        name: 'Gifts',
        catId: 'exp6'
    },{
        id: 39,
        name: 'Donations (charity)',
        catId: 'exp6'
    },{
        id: 40,
        name: 'Other',
        catId: 'exp6'
    },{
        id: 41,
        name: 'Doctors/dental/vision',
        catId: 'exp7'
    },{
        id: 42,
        name: 'Specialty care',
        catId: 'exp7'
    },{
        id: 43,
        name: 'Pharmacy',
        catId: 'exp7'
    },{
        id: 44,
        name: 'Emergency',
        catId: 'exp7'
    },{
        id: 45,
        name: 'Other',
        catId: 'exp7'
    },{
        id: 46,
        name: 'Rent/mortgage',
        catId: 'exp8'
    },{
        id: 47,
        name: 'Property taxes',
        catId: 'exp8'
    },{
        id: 48,
        name: 'Furnishings',
        catId: 'exp8'
    },{
        id: 49,
        name: 'Lawn/garden',
        catId: 'exp8'
    },{
        id: 50,
        name: 'Supplies',
        catId: 'exp8'
    },{
        id: 51,
        name: 'Maintenance',
        catId: 'exp8'
    },{
        id: 52,
        name: 'Improvements',
        catId: 'exp8'
    },{
        id: 53,
        name: 'Moving',
        catId: 'exp8'
    },{
        id: 54,
        name: 'Other',
        catId: 'exp8'
    },{
        id: 55,
        name: 'Car',
        catId: 'exp9'
    },{
        id: 56,
        name: 'Health',
        catId: 'exp9'
    },{
        id: 57,
        name: 'Home',
        catId: 'exp9'
    },{
        id: 58,
        name: 'Life',
        catId: 'exp9'
    },{
        id: 59,
        name: 'Other',
        catId: 'exp9'
    },{
        id: 60,
        name: 'Food',
        catId: 'exp10'
    },{
        id: 61,
        name: 'Vet/medical',
        catId: 'exp10'
    },{
        id: 62,
        name: 'Toys',
        catId: 'exp10'
    },{
        id: 63,
        name: 'Supplies',
        catId: 'exp10'
    },{
        id: 64,
        name: 'Other',
        catId: 'exp10'
    },{
        id: 65,
        name: 'Domains & hosting',
        catId: 'exp11'
    },{
        id: 66,
        name: 'Online services',
        catId: 'exp11'
    },{
        id: 67,
        name: 'Hardware',
        catId: 'exp11'
    },{
        id: 68,
        name: 'Software',
        catId: 'exp11'
    },{
        id: 69,
        name: 'Other',
        catId: 'exp11'
    },{
        id: 70,
        name: 'Fuel',
        catId: 'exp12'
    },{
        id: 71,
        name: 'Car payments',
        catId: 'exp12'
    },{
        id: 72,
        name: 'Repairs',
        catId: 'exp12'
    },{
        id: 73,
        name: 'Registration/license',
        catId: 'exp12'
    },{
        id: 74,
        name: 'Supplies',
        catId: 'exp12'
    },{
        id: 75,
        name: 'Public transit',
        catId: 'exp12'
    },{
        id: 76,
        name: 'Other',
        catId: 'exp12'
    },{
        id: 77,
        name: 'Airfare',
        catId: 'exp13'
    },{
        id: 78,
        name: 'Hotels',
        catId: 'exp13'
    },{
        id: 79,
        name: 'Food',
        catId: 'exp13'
    },{
        id: 80,
        name: 'Transportation',
        catId: 'exp13'
    },{
        id: 81,
        name: 'Entertainment',
        catId: 'exp13'
    },{
        id: 82,
        name: 'Other',
        catId: 'exp13'
    },{
        id: 83,
        name: 'Phone',
        catId: 'exp14'
    },{
        id: 84,
        name: 'TV',
        catId: 'exp14'
    },{
        id: 85,
        name: 'Internet',
        catId: 'exp14'
    },{
        id: 86,
        name: 'Electricity',
        catId: 'exp14'
    },{
        id: 87,
        name: 'Heat/gas',
        catId: 'exp14'
    },{
        id: 88,
        name: 'Water',
        catId: 'exp14'
    },{
        id: 89,
        name: 'Trash',
        catId: 'exp14'
    },{
        id: 90,
        name: 'Other',
        catId: 'exp14'
    },{
        id: 91,
        name: 'Paycheck',
        catId: 'inc1'
    },{
        id: 92,
        name: 'Tips',
        catId: 'inc1'
    },{
        id: 93,
        name: 'Bonus',
        catId: 'inc1'
    },{
        id: 94,
        name: 'Comission',
        catId: 'inc1'
    },{
        id: 95,
        name: 'Other',
        catId: 'inc1'
    },{
        id: 96,
        name: 'Transfer from savings',
        catId: 'inc2'
    },{
        id: 97,
        name: 'Interest income',
        catId: 'inc2'
    },{
        id: 98,
        name: 'Dividends',
        catId: 'inc2'
    },{
        id: 99,
        name: 'Gifts',
        catId: 'inc2'
    },{
        id: 100,
        name: 'Refunds',
        catId: 'inc2'
    },{
        id: 101,
        name: 'Other',
        catId: 'inc2'
    }
];

export const subCategoryNames = {};

subCategories.forEach(c => {
    subCategoryNames[c.id] = c.name;
});
