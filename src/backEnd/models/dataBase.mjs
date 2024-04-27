import mongoose from 'mongoose'
import * as dotenv from 'dotenv'

export const database = {}

dotenv.config()
console.log(process.env.MONGO_URI)
mongoose.Promise = global.Promise

database.connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 3000
    })
    console.log('Connected to MongoDB')
    console.log('Mongoose version', mongoose.version)
    console.log('Mongoose connection state', mongoose.connection.readyState)
    console.log('Mongoose connection host', mongoose.connection.host)
    console.log('Mongoose connection port', mongoose.connection.port)
    console.log('Mongoose connection name', mongoose.connection.name)
  } catch (err) {
    console.error('Error connecting to MongoDB', err)
  }
}

database.disconnectDatabase = async () => {
  try {
    await mongoose.disconnect()
    console.log('Disconnected from MongoDB')
  } catch (err) {
    console.error('Error disconnecting from MongoDB', err)
  }
}

database.getDatabase = () => {
  return mongoose.connection
}
