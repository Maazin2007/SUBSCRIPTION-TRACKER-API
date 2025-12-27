import express from 'express';
import cookieParser from 'cookie-parser';
// importing environment variable
import { PORT } from './config/env.js';
// importing routes 
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import arcjetMiddleware from './middlewares/arcjet.middleware.js';
import workflowRouter from './routes/workflow.routes.js';

// creating express app
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(arcjetMiddleware);

// major routing sections
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
app.use('/api/v1/workflows', workflowRouter);

// enabling error middleware
app.use(errorMiddleware);

// main homepage route
app.get('/', (req, res) => {
    res.send('Welcome to the sub-tracker API!');
});

// starting the server to listen for response
app.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`);

    await connectToDatabase();
});

export default app;

