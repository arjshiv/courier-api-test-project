# courier-api-test-project

This is a test project for the [Courier API](https://docs.courier.com/reference).

This script imports the fetch module from node-fetch, dotenv for loading environment variables, and crypto for encryption. It then uses the dotenv module to load environment variables from a .env file in the root directory.

The script then extracts the message to be sent from the command line arguments passed to the script using const [message, ...args] = process.argv.slice(2).

The function getCourierOptions takes a message as its argument and returns an object with options for a POST request to the https://api.courier.com/send endpoint, including headers with an Authorization token and a JSON-formatted body containing the message to be sent.

The sendCourierNotification function is an async function that takes an object with a message property as its argument and sends a request to the https://api.courier.com/send endpoint with the options returned by the getCourierOptions function and logs the response.

The convertToSecretMessage function takes an object with an optional originalMessage property and uses the crypto module to encrypt the original message using the AES-256-CTR algorithm and a secret key from the environment variables. It then returns the encrypted message.

Finally, the script calls sendCourierNotification function with the message passed as a function of convertToSecretMessage function, and then exits the process.
