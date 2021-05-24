const Review = require("../models/reviews");
const Campground = require('../models/campground');
const {campgroundSchema, reviewSchema} = require('../Schemas');
const express = require('express');
const router = express.Router();
const AppError = require("../utilities/appError");
const catchAsync = require("../utilities/catchAsync");

const validateReview = (req, res, next) => {
    reviewSchema;
    const {error} = reviewSchema.validate(req.body);
    console.log(error)
    if(error){
        const msg = error.details.map(el => el.message).join(",")
        throw new AppError(msg, 400)}
    else{
        next()
    } 
}

router.post("/campgrounds/:id/reviews", validateReview, catchAsync(async(req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id)
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save(); 
    // console.log(campground);
    req.flash("success", "successfully posted a new review");
    res.redirect(`/campgrounds/${id}`);
}))

router.delete("/campgrounds/:id/reviews/:reviewsId", catchAsync(async(req, res) => {
    const {id, reviewsId} = req.params;
     await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewsId}})
     await Review.findByIdAndDelete(reviewsId);
     req.flash("success", "successfully deleted your review");
     res.redirect(`/campgrounds/${id}`);
}))



module.exports = router;