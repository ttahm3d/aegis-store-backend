import express from "express";
import "dotenv/config";
import cors from "cors";
import { connect } from "./configs/mongoDbConfig.js";

// Defining Routes
import categoryRoutes from "./routes/category.routes.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

connect();

app.get("/", (req, res) => {
  res.send("message");
});

app.use("/api/v1", categoryRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`[index.js] Application is running on ${port} `);
});
