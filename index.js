import express from 'express';
import cookieParser from 'cookie-parser';
import colors from 'colors';

// Load local exports
import { PORT } from './config/env.config.js';
import { connectDB } from './config/db.config.js';
import { AuthRoutes } from './routes/auth.routes.js';
import errorMiddleware from './middleware/error.middleware.js';
import { errorLogger, routeLogger } from './middleware/logger.middleware.js'
import { arcjetSecurity } from './middleware/arcjet.middleware.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Arcjet protection
app.use(arcjetSecurity)

// Routes
app.use('/api/v1', AuthRoutes);

//  middleware    
app.use(errorLogger)
app.use(errorMiddleware)
app.use(routeLogger);

app.listen(PORT ,async () => {
    await connectDB();
    console.log(`Connected to the database`.green.bold);
    console.log(`Server is running on port ${PORT}`.yellow.bold);
});

