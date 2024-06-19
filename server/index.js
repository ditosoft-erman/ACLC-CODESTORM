const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./models');
const dotenv = require('dotenv'); 
const cookieParser = require('cookie-parser');

const corsOptions = {
    origin: '*',
    credentials: true,
};

app.use(cors(corsOptions));
dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use('/public', express.static('public'));

const authRoute = require('./route/auth.route');
app.use('/auth', authRoute);

const productsRoute = require('./route/product.route');
app.use('/product', productsRoute);

const merchantRoute = require('./route/merchant.route');
app.use('/user', merchantRoute);

const categoryRoute = require('./route/category.route');
app.use('/category', categoryRoute);


const PORT = process.env.PORT || 5000;
db.sequelize.sync().then(() => {
    console.log(`Using port ${PORT}`);
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});
