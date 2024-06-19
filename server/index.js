const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./models');
const dotenv = require('dotenv'); 



app.use(cors());
dotenv.config();
app.use(express.json());

const authRoute = require('./route/auth.route');
app.use('/auth', authRoute);




const PORT = process.env.PORT || 5000;
db.sequelize.sync().then(() => {
    console.log(`Using port ${PORT}`);
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});
