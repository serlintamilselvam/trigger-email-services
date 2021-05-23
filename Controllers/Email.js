import { initResponse, getSuccessResponse, getExceptionResponse , 
    addJSONResponseWrapper, sendSimpleEmail, initValidationResponse, fromAddressInEmail } from '../Helpers/index.js'

export const sendInformationEmailToAdmin = async (req,res) => {

    let response = initResponse()
    let statusCode = 500

    const data = {
        from: fromAddressInEmail(),
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.text
    }

    try {
        const result = await sendSimpleEmail(data)
        if(result == 1) {
            response.msg = 'Email sent successfully'
            response = getSuccessResponse(response)
            statusCode = 201
        } else {
            response = initValidationResponse('Auth Failed')
            statusCode = 403
        }
    } catch(err) {
        response = getExceptionResponse(err)
        statusCode = 401
    }
    res.status(statusCode).send(addJSONResponseWrapper(response))
}