import express from 'express';
import cookieParser from 'cookie-parser';
import colors from 'colors';

// Import routes
import { AuthRoutes } from './routes/auth.routes.js';
import { AdminBlogRoutes } from './routes/AdminBlog.routes.js';
import { BlogRoutes } from './routes/blog.routes.js';

// Load local exports
import { PORT } from './config/env.config.js';
import { connectDB } from './config/db.config.js';
import { errorLogger, routeLogger } from './middleware/logger.middleware.js'
import { arcjetSecurity } from './middleware/arcjet.middleware.js';
import errorMiddleware from './middleware/error.middleware.js';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Arcjet protection
app.use(arcjetSecurity);

// Routes
app.use('/api/v1', AuthRoutes);
app.use('/api/v1/blogs', AdminBlogRoutes );
app.use('/api/v1/blogs', BlogRoutes );

//  middleware    
app.use(errorLogger)
app.use(errorMiddleware)
app.use(routeLogger);

app.listen(PORT ,async () => {
    await connectDB();
    console.log(`Connected to the database`.green.bold);
    console.log(`Server is running on port ${PORT}`.yellow.bold);
});

