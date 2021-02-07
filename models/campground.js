const mongoose       = require("mongoose");


//to set the mongoose.Schema to an easier variable
const Schema = mongoose.Schema; 


// Set the schema
const campgroundSchema = new Schema({
    image: String,
    name: String,
    price: Number,
    description: String,
    location: String
})

// export to the app.js so the database can read it
module.exports = mongoose.model("campground", campgroundSchema);
