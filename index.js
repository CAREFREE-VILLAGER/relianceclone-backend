
const express = require('express');
const bodyParser = require('body-parser');
const registerRoute = require('./routes/registerRoute');
const loginRoute = require('./routes/loginRoute');
const dotenv = require('dotenv').config();
const logoutRoute = require('./routes/logoutRoute');
const session = require('express-session');
const productRoutes = require('./routes/productRoutes'); 
const cartRoute = require('./routes/cartRoute');
const cors = require('cors');

const app = express();
const PORT = 8080;
app.use(cors());


app.use(express.json());

app.use(session({
    secret: 'your-session-secret',
    resave: false,
    saveUninitialized: false
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
app.listen(8080, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
