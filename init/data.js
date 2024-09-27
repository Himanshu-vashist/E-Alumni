// data insertion file (seed.js)
const mongoose = require("mongoose");
const Listing = require("./models/listings.js");

main()
    .then(() => {
        console.log("connection successful");
    })
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/E-ALUMNI");
}






const sampleListings = [
  // ... existing profiles
  {
    name: "Nina Patel",
    bio: "Nina is a cybersecurity expert with a focus on protecting digital infrastructures. She has worked with both government agencies and private sector firms to improve their security measures.",
    image: {
      filename: "alumniimage",
      url: "https://www.imgacademy.com/news/img-academy-has-two-alumni-selected-2024-nba-draft"  },
    graduationYear: 2018,
    degree: "M.S. in Cybersecurity",
    location: "Austin, Texas",
    country: "United States",
  },
  {
    name: "Liam O'Reilly",
    bio: "Liam is a renewable energy consultant dedicated to helping companies transition to sustainable energy sources. He has implemented successful projects across Europe.",
    image: {
      filename: "alumniimage",
      url: "https://images.unsplash.com/photo-1555489257-8b93a1f2eb50?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmVzc29yfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    graduationYear: 2012,
    degree: "M.S. in Environmental Science",
    location: "Dublin",
    country: "Ireland",
  },
  {
    name: "Aisha Bakari",
    bio: "Aisha is a social entrepreneur focused on empowering women through education and vocational training. Her NGO has helped thousands of women in East Africa.",
    image: {
      filename: "alumniimage",
      url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmVzc29yfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    graduationYear: 2014,
    degree: "M.A. in International Development",
    location: "Nairobi",
    country: "Kenya",
  },
  {
    name: "Hiroshi Tanaka",
    bio: "Hiroshi is a robotics engineer with a passion for developing advanced robotic systems for medical applications. His innovations are revolutionizing surgical procedures.",
    image: {
      filename: "alumniimage",
      url: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZmVzc29yfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    graduationYear: 2016,
    degree: "Ph.D. in Robotics",
    location: "Tokyo",
    country: "Japan",
  },
  {
    name: "Fatima Al-Mansouri",
    bio: "Fatima is a diplomat specializing in Middle Eastern politics. She has represented her country in numerous international forums and is an advocate for peace and stability in the region.",
    image: {
      filename: "alumniimage",
      url: "https://images.unsplash.com/photo-1564565246091-1a224b09b482?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHByb2Zlc3NvcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    graduationYear: 2011,
    degree: "M.A. in International Relations",
    location: "Abu Dhabi",
    country: "United Arab Emirates",
  },
  {
    name: "Andreas Müller",
    bio: "Andreas is an architect known for his innovative designs that blend sustainability with modern aesthetics. His work is widely recognized across Europe.",
    image: {
      filename: "alumniimage",
      url: "https://images.unsplash.com/photo-1519399242393-b53e11d7e142?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2Zlc3NvcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    graduationYear: 2013,
    degree: "M.Arch.",
    location: "Berlin",
    country: "Germany",
  },
  {
    name: "Mei Lin",
    bio: "Mei is a geneticist who has made significant contributions to the study of human genetics. Her research is helping to unlock new treatments for genetic disorders.",
    image: {
      filename: "alumniimage",
      url: "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2Zlc3NvcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    graduationYear: 2017,
    degree: "Ph.D. in Genetics",
    location: "Beijing",
    country: "China",
  },
  {
    name: "Santiago Rivera",
    bio: "Santiago is a climate scientist dedicated to studying the impacts of climate change on ecosystems. His work is crucial in shaping environmental policies worldwide.",
    image: {
      filename: "alumniimage",
      url: "https://images.unsplash.com/photo-1527465430476-5a5fdc34dcdd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmVzc29yfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    graduationYear: 2015,
    degree: "M.S. in Climate Science",
    location: "Buenos Aires",
    country: "Argentina",
  },
  {
    name: "Anastasia Ivanova",
    bio: "Anastasia is an economist with a focus on emerging markets. She has worked with various governments and international organizations to promote economic growth.",
    image: {
      filename: "alumniimage",
      url: "https://images.unsplash.com/photo-1592482465760-c4b8907304d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2Zlc3NvcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    graduationYear: 2010,
    degree: "Ph.D. in Economics",
    location: "Moscow",
    country: "Russia",
  },
  {
    name: "Jamal Ahmed",
    bio: "Jamal is a tech innovator with a background in software engineering. He co-founded a successful fintech startup that is transforming the financial services industry.",
    image: {
      filename: "alumniimage",
      url: "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fHByb2Zlc3NvcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    graduationYear: 2019,
    degree: "B.S. in Software Engineering",
    location: "Cairo",
    country: "Egypt",
  }
];

module.exports = { data: sampleListings };
