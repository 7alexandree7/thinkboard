import express from "express";
import cors from "cors";
import notesRoutes from "./routes/notesRoutes";
import db from "./db/config";
import rateLimiter from "./middlewares/rateLimiter";
import 'dotenv/config'

const app: express.Application = express();
const PORT =  process.env.PORT || 3000

app.use(cors({
    origin: 'https://thinkboard-gray.vercel.app',
    credentials: true,
}))

app.use(express.json())
app.use(rateLimiter)
app.use('/api/notes', notesRoutes)


db().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    })
})


