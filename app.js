import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'

//Import Paths
import BasePaths from './Routes/BasePaths.js'

//Import custom routers
import emailRouter from './Routes/Email.js'

dotenv.config()

const PORT = process.env.PORT

const app = express()

const corsOptions = {
    origin: [process.env.ALLOWED_FRONT_END_URL_1, process.env.ALLOWED_FRONT_END_URL_2, process.env.ALLOWED_FRONT_END_URL_3],
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

app.use(bodyParser.json())

app.use(BasePaths.emailServices, emailRouter)

app.listen(PORT, () => console.log(`Server running on port :${PORT}`))