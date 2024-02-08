const fs = require('fs');

// Products data
const products = [
    {
        id: 1001,
        title: "Math",
        Location: "Dubai",
        price: 2000,
        Image: "images/calculator.png",
        availableInventory: 10,
        rating: 4,
    },
    {
        id: 1002,
        title: "Advanced Math",
        Location: "Dubai",
        price: 4000,
        Image: "images/calculator.png",
        availableInventory: 11,
        rating: 5,
    },
    {
        id: 1003,
        title: "First Language English",
        Location: "Abu Dhabi",
        price: 3000,
        Image: "images/eng.png",
        availableInventory: 12,
        rating: 3,
    },
    {
        id: 1004,
        title: "Second Language English",
        Location: "Sharjah",
        price: 1800,
        Image: "images/eng.png",
        availableInventory: 13,
        rating: 3,
    },
    {
        id: 1005,
        title: "Music",
        Location: "Dubai",
        price: 6000,
        Image: "images/musical-note.png",
        availableInventory: 14,
        rating: 4,
    },
    {
        id: 1006,
        title: "Advanced Music",
        Location: "Dubai",
        price: 10000,
        Image: "images/musical-note.png",
        availableInventory: 10,
        rating: 5,
    },
    {
        id: 1007,
        title: "History",
        Location: "Ajman",
        price: 4000,
        Image: "images/history.png",
        availableInventory: 14,
        rating: 5,
    },
    {
        id: 1008,
        title: "Programming (HTML)",
        Location: "Dubai",
        price: 4000,
        Image: "images/html-5.png",
        availableInventory: 14,
        rating: 5,
    },
    {
        id: 1009,
        title: "Programming (CSS)",
        Location: "Dubai",
        price: 4000,
        Image: "images/css-3.png",
        availableInventory: 14,
        rating: 5,
    },
    {
        id: 1010,
        title: "Programming (JS)",
        Location: "Dubai",
        price: 4000,
        Image: "images/java-script.png",
        availableInventory: 14,
        rating: 5,
    },
];

// Convert products to JSON string
const productsJSON = JSON.stringify(products, null, 2);

// Write JSON string to a new file
fs.writeFileSync('products.json', productsJSON, 'utf8');

console.log('Products converted to JSON and saved as products.json');
