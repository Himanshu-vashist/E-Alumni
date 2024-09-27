
const Post = require('../models/post'); // Assuming this is where your Post schema is located

// Sample Post Data
const samplePosts = [
  {
    title: "Annual Alumni Meetup 2024",
    content: "Join us for the Annual Alumni Meetup event this coming March. Connect with former classmates and professors, hear from keynote speakers, and celebrate your alma mater.",
    type: "news",
    createdAt: new Date('2024-01-10')
  },
  {
    title: "Job Opening: Senior Developer at TechCorp",
    content: "TechCorp is looking for a Senior Developer with 5+ years of experience in web development, Node.js, and React. Apply now to work with a dynamic and fast-growing team.",
    type: "blog",
    createdAt: new Date('2024-01-15')
  },
  {
    title: "University Expansion Announcement",
    content: "We are thrilled to announce that the university is expanding its campus with a new state-of-the-art library and research center. This will provide students and faculty with cutting-edge facilities.",
    type: "announcement",
    createdAt: new Date('2024-02-01')
  },
  {
    title: "Alumni Success Story: Jane Doe",
    content: "Jane Doe, a graduate from the class of 2010, has recently been recognized as one of the top 100 entrepreneurs in the tech industry. Her company, GreenTech, has revolutionized renewable energy solutions.",
    type: "event",
    createdAt: new Date('2024-02-05')
  }
];



Post.insertMany(samplePosts);
