const express=require("express");
const router=express.Router();
const Listing=require("../models/listing.js");
const wrapAsync=require("../utils/wrapAsync.js");
const {isLoggedin, isOwner, validateListing}=require("../middleware.js");
const listingController=require("../controllers/listing.js");


router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedin,  validateListing, wrapAsync(listingController.createPost));

//New Listing
router.get("/new",isLoggedin, listingController.renderNewForm);

router.route("/:id")
.get(wrapAsync(listingController.showIndividual))
.put(isLoggedin, isOwner, validateListing, wrapAsync(listingController.editPost))
.delete(isLoggedin, isOwner, wrapAsync(listingController.deletePost));
 

//edit 
router.get("/:id/edit", isLoggedin, isOwner, wrapAsync(listingController.renderEdit));

module.exports=router;