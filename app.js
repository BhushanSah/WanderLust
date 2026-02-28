const express=require('express');
const app=express();
const mongoose=require('mongoose');
const path=require("path");
const methodOverride=require("method-override")
const ejsMate=require("ejs-mate");
const ExpressError=require("./utils/ExpressError.js");

const listings=require("./routes/listing.js");
const review=require("./routes/review.js");

const Mongo_URL="mongodb://127.0.0.1:27017/wanderLust"

main().then(()=>{
    console.log("Connected to database")
}).catch((err)=>{
    console.log(err);
});
 
async function main(){
    await mongoose.connect(Mongo_URL);
};

app.set("view engine","ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req,res)=>{
    res.send("Working....")
});

app.use("/listings", listings);
app.use("/listings/:id/reviews", review)


app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found!!!"));
});

app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong";
    res.status(statusCode).render("listings/error.ejs", {message})
});
app.listen(8080, ()=>{
    console.log("Server is listening to port 8080");
});

