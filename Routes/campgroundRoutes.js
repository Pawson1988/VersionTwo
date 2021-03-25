const Campground = require('../models/campground');
const {campgroundSchema} = require('../Schemas');
const express = require('express');
const router = express.Router();
const AppError = require("../utilities/appError");
const catchAsync = require("../utilities/catchAsync");
const Review = require("../models/reviews");

    const validateCampground = (req, res, next) => {
        campgroundSchema;
        const {error} = campgroundSchema.validate(req.body);
        console.log(error)
        if(error){
            const msg = error.details.map(el => el.message).join(",")
            throw new AppError(msg, 400)}
        else{
            next()
        } 
    }

        // The home/landing page
    router.get("/", catchAsync(async (req, res, next) => {
            res.render("landing"); 
    }))

    router.post("/campgrounds", validateCampground, catchAsync(async (req, res, next) => {
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

    router.put("/campgrounds/:id", validateCampground, catchAsync(async (req, res, next) => {
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

    router.post("/campgrounds/:id/reviews", catchAsync(async(req, res) => {
        const { id } = req.params;
        const campground = await Campground.findById(id)
        const review = new Review(req.body.review);
        campground.reviews.push(review);
        await review.save();
        await campground.save(); 
        console.log(campground);
        res.redirect(`/campgrounds/${id}`);
    }))


    //to export the routes to the app.js
module.exports = router;
