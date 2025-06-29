import { config } from 'dotenv';

config(  { path: '.env'  } );

// Environment variables
// Default values are provided for some variables


export const { 
    PORT,
    MONGO_URI,
    NODE_ENV,
    JWT_SECRET,
    JWT_EXPIRES_IN,
    ARCJET_ENV,
    ARCJET_API_KEY, 
} = process.env;