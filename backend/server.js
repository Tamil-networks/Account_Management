const express = require("express");
const cors = require("cors");
require("dotenv").config();


const db = require("./config/database");
const searchRoutes = require("./routes/searchRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Home/API test
app.get("/", (req, res) => {
    res.json({
        message: "Moi Account Management API is running"
    });
});

// Database test
app.get("/api/health", async (req, res) => {
    try {
        const [rows] = await db.query(
            "SELECT 1 AS database_connected"
        );

        res.json({
            server: "OK",
            database: "Connected",
            result: rows[0]
        });

    } catch (error) {
        console.error("Database error:", error);

        res.status(500).json({
            server: "OK",
            database: "Connection failed"
        });
    }
});

app.use("/api", searchRoutes);

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Moi Account Management API running on port ${PORT}`);
});
