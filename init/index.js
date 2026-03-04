const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");

const Mongo_URL="mongodb://127.0.0.1:27017/wanderLust"

main().then(()=>{
    console.log("Connected to database")
}).catch((err)=>{
    console.log(err);
});
 
async function main(){
    await mongoose.connect(Mongo_URL);
}
const initDB=async() =>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj, owner: "69a7826aa6ad25ec9a46b100"}));
    await Listing.insertMany(initData.data);
    console.log("Data was initialized")
}
initDB();