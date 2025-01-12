import express from "express";
import bookRoutes from "./routes/bookRoutes";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api", bookRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the Library API");
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
