import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000; // Use Render's provided PORT

app.use(cors()); // Allows frontend to access the backend
app.use(express.json()); // Middleware to parse JSON

// Test Route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
