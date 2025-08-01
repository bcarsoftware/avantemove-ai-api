import express from "express";
import * as dotenv from "dotenv";
import inspireRoutes from "./src/routes/InspireRoute";

dotenv.config();
const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());

app.use("/api/v1/ai/inspire", inspireRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
