import mailgun from 'mailgun-js'
import dotenv from 'dotenv'

dotenv.config()

const mainGunApi = mailgun({apiKey: process.env.MAIL_GUN_API_KEY, domain: process.env.MAIL_GUN_DOMAIN})

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
        await mainGunApi.messages().send(data)
        return 1
    } catch(err) {
        return 0
    }
}