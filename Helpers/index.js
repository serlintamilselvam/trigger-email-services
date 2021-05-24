import mailGun from 'mailgun.js'
import formData from 'form-data'
import dotenv from 'dotenv'

dotenv.config()

const mailgun = new mailGun(formData)
const mainGunApi = mailgun.client({username: 'api', key: process.env.MAIL_GUN_API_KEY, public_key: process.env.MAILGUN_API_PUBLIC_KEY})

export function initResponse(errorMsg = "invalid_method") {
    return {
        'result': 'error',
        'errors': {
            'msg': errorMsg
        }
    }
}

export function getSuccessResponse(response) {
    response.result = 'success';
    delete response.errors
    return response
}

export function getExceptionResponse(error) {
    return {
        'result': 'error',
        'errors': {
            'msg': error.message
        }
    }
}    

export function initValidationResponse(errorMsg) {
    return {
        'result': 'error',
        'errors': errorMsg
    }
}

export function addJSONResponseWrapper(response) {
    return {
        'response': response
    }
}

export const fromAddressInEmail = () => {
    return process.env.MAIL_GUN_FROM;
}

export const sendSimpleEmail = async (data) => {
    try {
        await mainGunApi.messages.create(process.env.MAIL_GUN_DOMAIN, data)
        return 1
    } catch(err) {
        return 0
    }
}