const express = require('express');
const bodyParser = require('body-parser');
const registerRoute = require('./routes/registerRoute');
const loginRoute = require('./routes/loginRoute');
const dotenv = require('dotenv').config();
const logoutRoute = require('./routes/logoutRoute');
const session = require('express-session');
const MongoStore = require('connect-mongo');  // Import connect-mongo
const productRoutes = require('./routes/productRoutes'); 
const cartRoute = require('./routes/cartRoute');
const cors = require('cors');

const app = express();
const PORT = 8080;
app.use(cors());

app.use(express.json());

// Use connect-mongo to store sessions in MongoDB
app.use(session({
    secret: 'your-session-secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI || "mongodb+srv://demonking:demon123@cluster0.pmncnmh.mongodb.net/?retryWrites=true&w=majority", // Store session data in MongoDB
        ttl: 14 * 24 * 60 * 60 // Session expiration time (14 days)
    })
}));

app.use(bodyParser.json());
app.use('/api', productRoutes);
app.use('/api', cartRoute);
app.use(registerRoute);
app.use(loginRoute);
app.use(logoutRoute);

app.get('/', (req, res) => {
    res.send('Welcome to the home page!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const mongoose = require('mongoose');

const mongoUrl = process.env.MONGODB_URI || "mongodb+srv://demonking:demon123@cluster0.pmncnmh.mongodb.net/?retryWrites=true&w=majority";

const config = {
    connectTimeoutMS: 30000,
    socketTimeoutMS: 30000,
    useNewUrlParser: true,  // Keep only the useNewUrlParser option
    // Remove useUnifiedTopology
};

// Connect to MongoDB using Mongoose
mongoose.connect(mongoUrl, config)
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

module.exports = mongoose.connection;
