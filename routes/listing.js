const express=require("express");
const router=express.Router();
const Listing=require("../models/listing.js");
const wrapAsync=require("../utils/wrapAsync.js");
const {listingSchema}=require("../schema.js");
const ExpressError=require("../utils/ExpressError.js");
const {isLoggedin}=require("../middleware.js");


const validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
        throw new ExpressError(400, error)
    }else{
        next();
    }
};

router.get("/", wrapAsync(async (req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index.ejs", {allListings})
}));
 
//New Listing
router.get("/new",isLoggedin, (req,res)=>{
    res.render("listings/new.ejs");
});

//create Route
router.post("/",isLoggedin,  validateListing, wrapAsync(async(req,res)=>{
    const newListing=new Listing(req.body.listing);
    newListing.owner=req.user._id;
    await newListing.save();
    req.flash("success" , "New Listing Created")
    res.redirect("/listings")
}));


//show individual listing
router.get("/:id", wrapAsync(async(req,res)=>{
    let {id}=req.params;
    const listing= await Listing.findById(id).populate("reviews").populate("owner");
    if(!listing){
       req.flash("error" , "Listing doesn't exist"); 
       return res.redirect("/listings");
    };
    res.render("listings/show.ejs", {listing});
}));

//edit 
router.get("/:id/edit", isLoggedin, wrapAsync(async (req,res)=>{
    let{id}=req.params;
    const listing= await Listing.findById(id);
     if(!listing){
       req.flash("error" , "Listing doesn't exist"); 
       return res.redirect("/listings");
    };
    res.render("listings/edit.ejs", {listing});
}));
//edit update route
router.put("/:id",isLoggedin, validateListing, wrapAsync(async(req, res)=>{
    let {id}= req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    req.flash("success" , "Listing Updated");
    res.redirect(`/listings/${id}`); 
}));

//delete route
router.delete("/:id", isLoggedin, wrapAsync(async(req,res)=>{
    let{id}=req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("del" , "Listing Deleted")
    res.redirect("/listings");
}));

module.exports=router;