if(process.env.NODE_ENV != "production"){
require('dotenv').config();
}


const express = require("express");
const app=express();
const mongoose = require("mongoose");


const Listing=require("./models/listing.js");
const methodOverride= require("method-override");
const ejsMate=require("ejs-mate");
const path=require("path");
const ExpressError=require("./utils/ExpressError.js");

const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter=require("./routes/user.js");


const wrapAsync=require("./utils/wrapAsync.js");


const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");

const MONGO_URL ="mongodb://localhost:27017/E-ALUMNI";

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

const store = MongoStore.create({
  //change
  mongoUrl: MONGO_URL,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24*3600.
 
});

store.on("error" , ()=>{
  console.log("error in mongo session store", err);
});

const sessionOptions ={
  store,
  secret :  process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7*24*60*60*1000,//milliseconds
    maxAge: 7*24*60*60*1000,
    httpOnly:true,
  }
}; 

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


const { error } = require("console");



//const dbUrl = process.env.ATLASDB_URL;

async function main(){
  //change
  await mongoose.connect(MONGO_URL);
}

main()
  .then(()=>{
    console.log("connected to DB");
  })
  .catch((err)=>{
    console.log(err);
  });
 










/* app.get("/", wrapAsync(async (req, res) => {
    
    res.send("hii i am the root");
  }));
*/
 /* app.get("/homepage", wrapAsync(async (req, res) => {
    res.render("homepage.ejs");
  }));
*/


 

 

  app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    console.log(res.locals.success);
    res.locals.error=req.flash(error);
    res.locals.currUser = req.user;
     next();
  });

  app.get("/",(req,res,next)=>{
    //res.redirect("/listings");
    res.render("homepage.ejs");
  })

app.use("/listings",listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/",userRouter);

app.all("*",(req,res,next)=>{
  next(new ExpressError(404,"Page Not Found!"));
});


app.use((err,req,res,next)=>{
  let { statusCode=500, message="something went wrong" }=err;
  res.status(statusCode).render("error.ejs",{message});
  
});

  app.listen(8080,()=>{
    console.log("server is listening on port 8080");
  });
