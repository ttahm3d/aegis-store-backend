import express from "express";
import "dotenv/config";
import cors from "cors";
import { connect } from "./configs/mongoDbConfig.js";

// Defining Routes
import categoryRoutes from "./routes/category.js";
import productRoutes from "./routes/product.js";
import userRoutes from "./routes/user.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

connect();

app.get("/", (req, res) => {
  res.send("message");
});

app.use("/api/v1", categoryRoutes);
app.use("/api/v1", productRoutes);
app.use("/api/v1", userRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`[index.js] Application is running on ${port} `);
});
