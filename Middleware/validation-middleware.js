import { initResponse, addJSONResponseWrapper, initValidationResponse } from '../Helpers/index.js'

import { validateForm } from '../Helpers/validate.js'

export const emailForm = (req, res, next) => {

    let response = initResponse()

    const validationRule = {
        "to": "required|email",
        "subject": "required|string",
        "text": "required|string"
    }

    validateForm(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            response = initValidationResponse('Please fill all details')
            return res.status(412).send(addJSONResponseWrapper(response))
        } else {
            next()
        }
    })
}