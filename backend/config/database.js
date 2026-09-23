const mysql = require("mysql2/promise");
const fs = require("fs");

require("dotenv").config();

let caCertificate;

if (process.env.DB_SSL_CA) {
    caCertificate = process.env.DB_SSL_CA.replace(/\\n/g, "\n");
} else if (process.env.DB_SSL_CA_PATH) {
    caCertificate = fs.readFileSync(
        process.env.DB_SSL_CA_PATH,
        "utf8"
    );
}

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,

    ssl: process.env.DB_SSL === "true"
        ? {
            rejectUnauthorized: true,
            ca: caCertificate
        }
        : undefined
});

module.exports = pool;