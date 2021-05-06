// Set your app credentials
const credentials = {
    apiKey:'2df78db079cfc900b496dc34deea7f76e76aa4c54962a3ab75e712ae1c69fec2',
    username:'anchorlandsolutions'
}

// Initialize the SDK
const AfricasTalking = require('africastalking')(credentials);
// Get the application service
const app = AfricasTalking.APPLICATION;
// Get the SMS service
const sms = AfricasTalking.SMS;

function getApplicationData() {
    // Fetch the application data
    let doge = app.fetchApplicationData()
        .then((data) => {
            console.log(`The account balance for user anchorlandsolutions is ${data.UserData.balance}`);
            return data
        }).catch(console.log);
        return doge
}
function sendMessage(contacts,message) {
    const options = {
        // Set the numbers you want to send to in international format
        to: contacts,
        // Set your message
        message: message,
        // Set your shortCode or senderId
        from: 'ANCHORLANDS'
    }

    // That’s it, hit send and we’ll take care of the rest
    sms.send(options)
        .then(data => console.log("data.................",data))
        .catch(console.log);
}

module.exports={
    sendMessage
}