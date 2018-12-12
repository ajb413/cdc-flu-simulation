const PubNub = require('pubnub');
const cities = require('./usCities.json').cities;
const maxTimeout = 12000;
const minTimeout = 6000;
let randomMillisecondInterval = 0;

const pubnub = new PubNub({
    publishKey : 'pub-c-74a9f89f-039e-47ea-af97-7771cea4d927',
    subscribeKey : 'sub-c-63af100c-fd9d-11e8-8ebf-6a684a5fb351'
});

function randomNumber(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function main() {
    // Random number is inclusive of the min and max
    const max = cities.length - 1;
    const min = 0;
    const randomArrayIndex = randomNumber(max, min);

    pubnub.publish({
        channel : 'cdc-flu-instance-stream',
        message: {
            time: new Date().getTime().toString().substring(0, 10),
            coordinates: cities[randomArrayIndex]
        }
    });

    randomMillisecondInterval = randomNumber(maxTimeout, minTimeout);
    setTimeout(main, randomMillisecondInterval);
}

setTimeout(main, randomMillisecondInterval);
