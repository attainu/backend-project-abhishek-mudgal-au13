import mongoose from 'mongoose'

mongoose.set('useFindAndModify', false)

const telemetery = mongoose.Schema({
    link: String,
    originalLink: String,
    creator: {
        type: mongoose.Schema.Types.ObjectId
    },
    clicks: Number,
    browserType: {
        firefox: Number,
        chrome: Number,
        edge: Number,
        opera: Number,
        ie: Number,
        safari: Number,
        other: Number
    },
    OSType: {
        linux: Number,
        android: Number,
        windows: Number,
        mac: Number,
        chromeOS: Number,
        other: Number
    },
    deviceType: {
        mobile: Number,
        tablet: Number,
        desktop: Number,
        other: Number
    },
    location: String,
    date: Date

})

export default mongoose.model('Telemetery', telemetery)