const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const listingSchema= new Schema({
    title: {
        type: String,
        required: true,
    },   
    description: String,
    image: {
        url: {
            type:String,
            default:"https://images.pexels.com/photos/1862402/pexels-photo-1862402.jpeg",
            set: (v)=> v===""?"https://images.pexels.com/photos/1862402/pexels-photo-1862402.jpeg": v,
        },
        filename: {
         type: String,
        default: "listingimage",
        }
    },
    price: Number,
    location: String,
    country: String,
});

const Listing=mongoose.model("Listing", listingSchema);
module.exports=Listing;
