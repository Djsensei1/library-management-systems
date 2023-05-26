// packages
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
// middlewares
import useError from './middlewares/useError.js';
// routes
import libraryRoutes from './routes/library.js';
import bookRoutes from './routes/book.js';
import userRoutes from './routes/user.js';
import borrowedBookRoutes from './routes/borrowed.js';
// db
import connectDB from './db.js';


// initialize
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(useError);

// routes middlewares
app.use('/libraries', libraryRoutes);
app.use('/books', bookRoutes);
app.use('/users', userRoutes);
app.use('/borrowed-books', borrowedBookRoutes);

// routes
app.get('/', (req, res) => {
    res.status(200).json({ message: "🙋 Hey, I'm your server." });
});

// Connect to MongoDB
connectDB()
    .then(() => {
        // Start the server after successful database connection
        app.listen(PORT, () => console.log(`☕ Server is running on port: http://localhost:${PORT}`));
    })
    .catch((error) => {
        console.error('😞 Error connecting to MongoDB:', error.message);
        process.exit(1); // Exit with failure
    });
