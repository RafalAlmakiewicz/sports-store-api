const { Product } = require("./models/product");
const { Activity } = require("./models/activity");
const data = require("./default.json");

async function seedDb() {
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

  console.log("Database seeded with default data.");
}

module.exports = seedDb;
