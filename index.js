const express = require('express');
const cookieParser = require('cookie-parser');  // Import cookie-parser
const { apirouter } = require('./routes');
const { connectDB } = require('./config/db.js');  // Correctly import connectdb

const app = express();

app.use(express.json());
app.use(cookieParser());  // Use cookie-parser middleware

const PORT = process.env.PORT || 3000;  // Correct variable name

connectDB();

app.use('/api', apirouter);

app.all("*", (req, res) => {
    res.status(404).json({ message: "Endpoint does not exist" });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);  // Corrected variable name
});
