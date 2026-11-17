const mongoose = require('mongoose')
const Product = require('./models/Product');

mongoose.connect('mongodb://127.0.0.1:27017/E-Commerce')
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log("DB Not Connected" + err))

const sampleProducts = [
    {
        name: "Wooden 3-Seater Fabric Sofa",
        price: 14500,
        category: "Living Room",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80"
    },
    {
        name: "Modern Wooden Coffee Table",
        price: 3200,
        category: "Living Room",
        image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=500&q=80"
    },
    {
        name: "Queen Size Solid Wood Bed",
        price: 18000,
        category: "Bedroom",
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&q=80"
    },
    {
        name: "2-Door Wooden Wardrobe",
        price: 11500,
        category: "Bedroom",
        image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=500&q=80"
    },
    {
        name: "Bedside Nightstand Table",
        price: 2400,
        category: "Bedroom",
        image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=500&q=80"
    },
    {
        name: "Engineered Wood Study Table",
        price: 4500,
        category: "Study & Office",
        image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=500&q=80"
    },
    {
        name: "Comfortable Mesh Office Chair",
        price: 3800,
        category: "Study & Office",
        image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=500&q=80"
    },
    {
        name: "4-Seater Wooden Dining Table Set",
        price: 15500,
        category: "Dining",
        image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=500&q=80"
    },
    {
        name: "5-Tier Open Wooden Bookshelf",
        price: 3600,
        category: "Storage",
        image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=500&q=80"
    },
    {
        name: "Compact Wooden Shoe Rack",
        price: 2100,
        category: "Storage",
        image: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=500&q=80"
    }
];

async function seedDB() {
    try {
        await Product.deleteMany({});
        await Product.insertMany(sampleProducts);
        console.log("Furniture products inserted successfully!");
        mongoose.connection.close();
    } catch (err) {
        console.log("Error inserting products:", err);
    }
}

seedDB();