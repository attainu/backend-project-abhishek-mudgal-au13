import mongoose from 'mongoose'

const telemetery = mongoose.Schema({
    link: String,
    originalLink: String,
    creator: {
        type: mongoose.Schema.Types.ObjectId
    },
    browerType: {
        Firefox: Number,
        Chrome: Number,
        Edge: Number,
        IE: Number,
        Safari: Number,
        Other: Number
    },
    OSType: {
        Linux: Number,
        Windows: Number,
        Mac: Number,
        ChromeOS: Number,
        Other: Number
    },
    deviceType: {
        Android: Number,
        IPad: Number,
        IPhone: Number,
        Desktop: Number,
        Other: Number
    },
    location: String,

})

export default mongoose.model('Telemetery', telemetery)