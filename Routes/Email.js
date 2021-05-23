import express from 'express'

//Import Controller
import {sendInformationEmailToAdmin} from '../Controllers/Email.js'

//Import middleware
import { emailForm } from '../Middleware/validation-middleware.js'

const router = express.Router()

router.post('/send/info', emailForm, sendInformationEmailToAdmin)

export default router