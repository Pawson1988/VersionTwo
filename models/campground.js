const mongoose       = require("mongoose");
const Reviews        = require("./reviews");


//to set the mongoose.Schema to an easier variable
const Schema = mongoose.Schema; 


// Set the schema
const campgroundSchema = new Schema({
    image: String,
    name: String,
    price: Number,
    description: String,
    location: String,
    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
})

campgroundSchema.post('findOneAndDelete', async function (){
    console.log("middleware executed successfully!");
});

// export to the app.js so the database can read it and define the model
module.exports = mongoose.model("campground", campgroundSchema);
