import fetch from 'node-fetch';
import dotenv from 'dotenv'
import crypto from 'crypto'

dotenv.config()

const [message, ...args] = process.argv.slice(2)

const getCourierOptions = message => ({
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.COURIER_API_KEY}`,
    },
    body: JSON.stringify({
        "message": {
            "to": {
                "email": process.env.EMAIL,
                "phone_number": process.env.PHONE_NUMBER
            },
            "content": {
                "title": `New secret message ${Date.now()}`,
                "body": message
            },
            "routing": {
                "method": "single",
                "channels": ["sms", "email"]
            },
        }
    })
})

const sendCourierNotification = async ({ message }) => {
    await fetch('https://api.courier.com/send', getCourierOptions(message))
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}


const convertToSecretMessage = ({ originalMessage = '' } = {}) => {
    const algorithm = 'aes-256-ctr'
    const secretKey = process.env.CRYPTO_SECRET_KEY
    const cipher = crypto.createCipher(algorithm, secretKey)
    let encrypted = cipher.update(originalMessage, 'utf8', 'hex')
    encrypted += cipher.final('hex');
    return  encrypted;
}

await sendCourierNotification({message: convertToSecretMessage({ originalMessage: message })})
process.exit(0)


