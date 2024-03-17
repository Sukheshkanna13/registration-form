const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
const uri = "mongodb+srv://sukhesh13:MONGO_PASSWORD@20013@manga-database.hnzyrzh.mongodb.net/?retryWrites=true&w=majority&appName=Manga-Database";
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

const db = mongoose.connection;
db.on('error', () => console.log("Error in Connecting to Database"));

// Define schema and model for users
const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    phno: String,
    gender: String,
    password: String
});

const User = mongoose.model('User', userSchema);

// Route to handle user registration
app.post("/sign_up", (req, res) => {
    const { name, age, email, phno, gender, password } = req.body;

    const newUser = new User({
        name,
        age,
        email,
        phno,
        gender,
        password
    });

    newUser.save((err, user) => {
        if (err) {
            console.error("Error inserting record:", err);
            return res.status(500).send("Error inserting record");
        }
        console.log("Record Inserted Successfully");
        // Redirect to signup_successful.html after successful save
        res.sendFile(path.join(__dirname, "signup_successful.html"));
    });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
