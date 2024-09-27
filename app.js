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
const axios = require('axios');
const MONGO_URL ="mongodb://localhost:27017/E-ALUMNI";
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
const feedbackRoutes = require("./routes/feedback");
const Chat=require("./models/chat.js");

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

const sessionOptions = {
  store: store, // Ensure `store` is properly defined elsewhere
  secret: process.env.SECRET || 'defaultSecret', // Fallback in case `process.env.SECRET` is undefined
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' // Ensure cookies are only sent over HTTPS in production
  }
};
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use("/feedback", feedbackRoutes);


const { error } = require("console");

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
  app.use("/feedback",feedbackRoutes);
  app.use("/",userRouter); 

  app.get("/helpbot",(req,res,next)=>{
    //res.redirect("/listings");
    res.render("listings/helpbot.ejs");
  })

  app.get("/donation",(req,res,next)=>{
    
    res.render("listings/donation.ejs");
  })

  app.get("/feedback",(req,res,next)=>{
    
    res.render("listings/feedback.ejs");
  })



  function asyncWrap(fn){
    return function (req,res,next){
      fn(req,res,next).catch((err)=>next(err));
    };
  }
  
  app.get("/chats", asyncWrap(async (req, res) => {
   
    let chats = await Chat.find();
    console.log(chats); // Check the retrieved data in the console
    res.render("chatPost.ejs", { chats });
  })
  );
  
  
  //New Route
  app.get("/chats/new",asyncWrap(async (req,res)=>{
    let chats = await Chat.find();
        console.log(chats);
    res.render("newChatPost.ejs",{ chats });
  })
  );
  
  
  //CREATE Route
  app.post("/chats",asyncWrap(async (req, res) => {
  
  // Handle the data from the POST request (e.g., save it to the database)
  const { from, message, to } = req.body;
  
  // Save the chat message to the database using the Chat model
  const newChat = new Chat({ from, message, to });
  await newChat.save();
  
  // After handling the data, redirect the user to the "/chats" page to see the updated list of chats
  res.redirect("/chats");
  })
  );
  
  //Edit Route
  
  app.get("/chats/:id/edit",asyncWrap(async(req,res)=>{
  let {id}=req.params;
  let chat= await Chat.findById(id);
  res.render("edit.ejs",{ chat: chat });
  })
  );
  
  //updata route
  app.put("/chats/:id",asyncWrap(async(req,res)=>{
  let {id}=req.params;
  let {message : newMessage}=req.body;
  let updatedChat=await Chat.findByIdAndUpdate(id,{message : newMessage},{runValidators:true,new:true});
  console.log(updatedChat);
  res.redirect("/chats");
  })
  );
  
  //destroy route
  app.delete("/chats/:id",asyncWrap(async(req,res)=>{
  let {id}=req.params;
  let deletedChat=await Chat.findByIdAndDelete(id);
  console.log(deletedChat);
  res.redirect("/chats");
  })
  );
  
  app.get("/chats/:messageMate", asyncWrap(async (req, res) => {
    let chats = await Chat.find();
    console.log(chats); // Check the retrieved data in the console
    res.render("new.ejs", { chats });
  })
  );
  
















app.all("*",(req,res,next)=>{
  next(new ExpressError(404,"Page Not Found!"));
});


app.use((err,req,res,next)=>{
  let { statusCode=500, message="something went wrong" }=err;
  res.status(statusCode).render("error.ejs",{message});
  
});

  app.listen(3000,()=>{
    console.log("server is listening on port 3000");
  });
