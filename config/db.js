import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/';

mongoose.connect(mongoURI, {
    /* tls: true, */ /* If needed, enable TLS for SSL connections (https) for production */
    serverSelectionTimeoutMS: 30000, /* Increasing timeout to handle network latency */
}).then(() => {
    console.log('MongoDB connected');
    initializeDatabase(); 
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to DB');
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection is disconnected');
});

async function initializeDatabase() {
    const db = mongoose.connection.db;

    // Check if 'users' collection exists
    const collections = await db.listCollections({ name: 'users' }).toArray();
    if (collections.length === 0) {
        await db.createCollection('users');
        console.log('Created "users" collection');
    }

    // Check if 'referrals' collection exists
    const referralsCollections = await db.listCollections({ name: 'referrals' }).toArray();
    if (referralsCollections.length === 0) {
        await db.createCollection('referrals');
        console.log('Created "referrals" collection');
    }
}