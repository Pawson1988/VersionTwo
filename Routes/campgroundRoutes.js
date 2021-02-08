const Campground = require('../models/campground');

const express        = require('express'),
      router         = express.Router(),
      AppError       = require("../appError")

//The catch Async function is used instead of using try and catch on every single route,
//instead we can just wrap the call in a callback function and let the catchAsync function do the work

function catchAsync(fn){
     return function (req, res, next) {
        fn(req, res, next).catch((err) => {
            next(err)
        })}
}

        // The home/landing page
    router.get("/", catchAsync(async (req, res, next) => {
            res.render("landing"); 
    }))

    router.post("/campgrounds", catchAsync(async (req, res, next) => {
        //get data from form and add to campgrounds database
        let name = req.body.name;
        let price = req.body.price;
        let description = req.body.description;
        let location = req.body.location;
        let image = req.body.image;
        
        // Use the above variables to create a record in the database
        let campground = new Campground({
            name: name, 
            price: price,
            description: description,
            location: location,
            image: image
        })
        await campground.save();
        res.redirect(`/campgrounds/${campground._id}`)
    }))

    router.get("/campgrounds", catchAsync(async (req, res, next) => {
        // Get all campgrounds from database and show on the /campgrounds page 

        //the campgrounds object allows us to use the data in the html file)
        const campgrounds = await Campground.find({})
        res.render("./campgrounds/index", { campgrounds })
    }))
    
    // to render the form to input a new campground. form connected to post route /campgrounds
    router.get("/campgrounds/new", catchAsync(async (req, res, next) => {
        res.render("./campgrounds/new");
    }))

    router.get("/campgrounds/:id", catchAsync(async (req, res, next) => {
        const campground = await Campground.findById(req.params.id)
        res.render("./campgrounds/show", { campground });
    }))

    router.get("/campgrounds/:id/edit", catchAsync(async (req, res, next) => {
        const campground = await Campground.findById(req.params.id)
        res.render("./campgrounds/edit", { campground });
   
    }))

    router.put("/campgrounds/:id", catchAsync(async (req, res, next) => {
       const {id} = req.params;
       
       let updatedCampground = {
           name: req.body.name,
           price: req.body.price,
           description: req.body.description,
           location: req.body.location,
           image: req.body.image
       }

       const campground = await Campground.findByIdAndUpdate(id, updatedCampground);
       res.redirect(`/campgrounds/${id}`);
    }))
    
    router.post("/campgrounds/:id", catchAsync(async (req, res, next) => {
        const { id } = req.params;
        const campground = await Campground.findOneAndDelete({ _id: id })
        res.redirect("/campgrounds")
    }))


    //to export the routes to the app.js
module.exports = router;
