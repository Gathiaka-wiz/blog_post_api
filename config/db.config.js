import { connect } from 'mongoose';
import colors from 'colors';

import { MONGO_URI } from './env.config.js';


export const connectDB  = async () => {
    try {
        const conn = await connect(MONGO_URI);
        console.log(`MongoDB Connected ${conn.connection.host} `.green.bold);
    } catch (error) {
        console.log(`Error connecting to MongoDB Server: ${error.message}`.red.bold);
        process.exit(1); // if 1 failure , 0 status code is success
    }
} 