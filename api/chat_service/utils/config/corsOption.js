const acceptList = [
    '*'
];
const corsOptions = {
    origin: (origin, callback) => {
        if (acceptList.includes(origin) || !origin) {
            callback(null, true)
        }
        else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionSuccessStatus: 200
}

module.exports = corsOptions