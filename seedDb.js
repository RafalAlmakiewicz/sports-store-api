const { Product } = require("./models/product");
const { Activity } = require("./models/activity");
//const mongoose = require("mongoose");

const data = [
  {
    name: "Golf",
    products: [
      {
        name: "golf ball",
        price: 25,
        stock: 98,
        description: "description...",
      },
      {
        name: "golf bat",
        price: 200,
        stock: 5,
        description: "description...",
      },
    ],
  },
  {
    name: "Football",
    products: [
      {
        name: "goalkeeper gloves",
        price: 70,
        stock: 3,
        description: "description...",
      },
      {
        name: "soccer shoes",
        price: 330,
        stock: 6,
        description: "description...",
      },
    ],
  },
  {
    name: "Bowling",
    products: [
      {
        name: "10 bowling pins set",
        price: 100,
        stock: 13,
        description: "description...",
      },
      {
        name: "bowling ball",
        price: 115,
        stock: 17,
        description: "description...",
      },
    ],
  },
];

async function seedDb() {
  //await mongoose.connect("mongodb://localhost/sports-store");

  await Activity.deleteMany({});
  await Product.deleteMany({});

  for (let activity of data) {
    const { _id } = await new Activity({ name: activity.name }).save();
    const products = activity.products.map((product) => ({
      ...product,
      activity: _id,
    }));
    await Product.insertMany(products);
  }

  //mongoose.disconnect();
  console.log("Database seeded with default data.");
}

module.exports = seedDb;
