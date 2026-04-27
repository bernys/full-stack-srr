import mongoose from 'mongoose'

const uri = process.env.MONGODB_URI!
const devUri = process.env.DEV_MONGODB_URI!

declare global {
	var __mongooseConnection: Promise<typeof mongoose> | undefined
}

let dbPromise: Promise<typeof mongoose>

if (process.env.NODE_ENV === 'development') {
	if (!global.__mongooseConnection) {
		global.__mongooseConnection = mongoose.connect(devUri, {
			bufferCommands: false,
		})
	}
	dbPromise = global.__mongooseConnection
} else {
	dbPromise = mongoose.connect(uri, {
		bufferCommands: false,
	})
}

export default dbPromise
