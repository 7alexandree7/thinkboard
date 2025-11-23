import mongoose from "mongoose"
import 'dotenv/config'

const db = async () => {

    const { DATABASE_URL } = process.env

    if (!DATABASE_URL) {
        throw new Error('DATABASE_URL is not defined')
    }

    try {
        await mongoose.connect(DATABASE_URL)
        console.log('Database connected')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}


export default db