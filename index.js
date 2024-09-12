const express = require('express');
const cookieParser = require('cookie-parser');  // Import cookie-parser
const { apirouter } = require('./routes');
const { connectdb } = require('./config/db.js');  // Correctly import connectdb

const app = express();

app.use(express.json());
app.use(cookieParser());  // Use cookie-parser middleware

const port = 3000;

connectdb();

app.use('/api', apirouter);

app.all("*", (req, res) => {
    res.status(404).json({ message: "Endpoint does not exist" });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
