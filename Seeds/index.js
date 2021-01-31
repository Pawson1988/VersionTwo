const campground                = require('../models/campground'),
      mongoose                  = require("mongoose"),
      cities                    = require("./cities"),
{ places, descriptors }         = require('./seedHelpers');

mongoose.connect("mongodb+srv://James1988:Lisburn21@cluster0.3wcla.mongodb.net/ProjectYelpCamp?retryWrites=true&w=majority", { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true});

//to tell us if there's a connection problem with the database
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


const sample = array => 
    array[Math.floor(Math.random() * array.length)]




const seedDB = async () => {
   await campground.deleteMany({});
   for(let i = 0; i < 50; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            name: `${sample(descriptors)} ${sample(places)}`,
            image: "https://images.unsplash.com/photo-1495395226200-8fbf6b720b8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxfDB8MXxyYW5kb218fHx8fHx8fA&ixlib=rb-1.2.1&q=80&w=1080&utm_source=unsplash_source&utm_medium=referral&utm_campaign=api-credit",
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit, vitae dolorem optio magni commodi dolore facilis, nobis deleniti corporis, architecto minus alias quod et vel hic? Voluptas reprehenderit sapiente maiores.",
            price: parseInt(`${price}:00`)
        })
        await camp.save();
   }
};

seedDB();





