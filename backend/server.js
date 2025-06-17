require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(
    cors({
        origin:'*',
        methods:["GET","POST", "PUT", "DELETE"],
        allowedHeaders:["Content-Type", "Authorization"],
    })
);

app.use(express.json());

//routes


//serve uploads folder 
app.use("/uploads",express.static(path.join(__dirname,"uploads"),{}));

app.listen(process.env.PORT || 5000, () => console.log(`Server running`)
)