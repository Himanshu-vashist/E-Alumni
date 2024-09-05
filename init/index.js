const mongoose = require("mongoose");
const MONGO_URL ="mongodb://localhost:27017/E-ALUMNI";
const initData = require("./data.js");
const Listing=require("./models/listing.js");
async function main(){
  await mongoose.connect(MONGO_URL);
}
main()
  .then(()=>{
    console.log("connected to DB");
  })
  .catch((err)=>{
    console.log(err);
  });
  

  const initDB =async () =>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj,owner: "657df8711ea745a0c244caee"}));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
  };
  initDB();
