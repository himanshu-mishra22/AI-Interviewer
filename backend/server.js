require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const authRoutes = require("./routes/authRoute")
const sessionRoutes = require("./routes/sessionRoute")
const questionRoutes = require('./routes/questionRoutes');
const {protect} = require("./middlewares/authMiddleware");
const { generateInterviewQuestions, generateExplanation } = require('./controllers/aiController');

const app = express();

app.use(cors({
    origin:"*",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());
connectDB();

//routes
app.use("/api/auth",authRoutes);
app.use("/api/questions",questionRoutes);
app.use("/api/sessions",sessionRoutes);

app.use("/api/ai/generate-questions",protect,generateInterviewQuestions);
app.use("/api/ai/generate-explanations",protect,generateExplanation);



//serve uploads folder 
app.use("/uploads",express.static(path.join(__dirname,"uploads"),{}));

app.listen(process.env.PORT || 5000, () => console.log(`Server running`)
)