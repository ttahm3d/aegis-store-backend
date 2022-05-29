import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("[mongoDbClient] Connected to DB");
  } catch (e) {
    console.error("[mongoDbClient] Not able to connect to Database");
  }
};

export { connect };
