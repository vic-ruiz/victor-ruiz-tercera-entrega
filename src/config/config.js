import "dotenv/config";

export default {
  mongoDB: {
    URL: process.env.MONGO_PASS,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
};
