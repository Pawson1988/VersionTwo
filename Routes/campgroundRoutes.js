const Campground = require('../models/campground');

const express        = require('express'),
      router         = express.Router();


        // The home/landing page
    router.get("/", async (req, res, next) => {
    try{
        res.render("landing");
    } catch(err) {
        next(err)
    }
    })

    router.post("/campgrounds", async (req, res, next) => {
    try{
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
    } catch(err) {
        next(err)
    }
    })

    router.get("/campgrounds", async (req, res, next) => {
        // Get all campgrounds from database and show on the /campgrounds page 

        //the campgrounds object allows us to use the data in the html file)
    try{
        const campgrounds = await Campground.find({})
        res.render("./campgrounds/index", { campgrounds })
    } catch(err){
        next(err)
    }
    })
    
    // to render the form to input a new campground. form connected to post route /campgrounds
    router.get("/campgrounds/new", async (req, res, next) => {
    try{
        res.render("./campgrounds/new");
    } catch(err){
        next(err)
    }
    })

    router.get("/campgrounds/:id", async (req, res, next) => {
    try{
        const campground = await Campground.findById(req.params.id)
        res.render("./campgrounds/show", { campground });
    } catch(err){
        next(err)
    }
    })

    router.get("/campgrounds/:id/edit", async (req, res, next) => {
    try{
        const campground = await Campground.findById(req.params.id)
        res.render("./campgrounds/edit", { campground });
    } catch(err) {
        next(err)
    }
    })

    router.put("/campgrounds/:id", async (req, res, next) => {
    try{
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
    } catch(err){
        next(err)
    }
    })
    
    router.post("/campgrounds/:id", async (req, res, next) => {
    try{
        const { id } = req.params;
        const campground = await Campground.findOneAndDelete({ _id: id })
        res.redirect("/campgrounds")
    } catch(err){
        next(err)
    }
    })


    //to export the routes to the app.js
module.exports = router;
