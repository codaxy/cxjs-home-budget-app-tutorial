export const categories = [
    {
        id: 'cat1',
        name: 'Category1'
    }, {
        id: 'cat2',
        name: 'Category2'
    },{
        id: 'cat3',
        name: 'Category3'
    },{
        id: 'cat4',
        name: 'Category4'
    },{
        id: 'cat5',
        name: 'Category5'
    }
];

export const categoryNames = {};

categories.forEach(c => {
    categoryNames[c.id] = c.name;
});

export const subCategories = [
    {
        id: 11,
        name: 'Subcategory 1',
        catId: 'cat1'
    },
    {
        id: 12,
        name: 'Subcategory 2',
        catId: 'cat1'
    },
    {
        id: 13,
        name: 'Subcategory 3',
        catId: 'cat1'
    },
    {
        id: 14,
        name: 'Subcategory 4',
        catId: 'cat1'
    },
    {
        id: 21,
        name: 'Subcategory 2',
        catId: 'cat2'
    },
    {
        id: 22,
        name: 'Subcategory 3',
        catId: 'cat2'
    }
];

export const subCategoryNames = {};

subCategories.forEach(c => {
    subCategoryNames[c.id] = c.name;
});
