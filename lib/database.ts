import mongoose, { Mongoose } from 'mongoose'

type Cached = { conn: null | Mongoose; promise: null | Promise<Mongoose> }

const MONGO_URI = process.env.MONGO_URI

if (!MONGO_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
// @ts-ignore: Unreachable code error
let cached: Cached = global.mongoose

if (!cached) {
    // @ts-ignore: Unreachable code error
    cached = global.mongoose = { conn: null, promise: null }
}

async function database() {
    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        const opts: mongoose.ConnectOptions = {
            bufferCommands: false,
            autoIndex: true,
        }

        cached.promise = mongoose
            .set('strictQuery', false)
            .connect(MONGO_URI!, opts)
            .then((mongoose) => {
                return mongoose
            })
    }

    cached.conn = await cached.promise

    return cached.conn
}

export default database
