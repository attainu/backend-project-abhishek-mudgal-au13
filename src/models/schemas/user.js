import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
    name: String,
    email: String,
    joinDate: Date,
    password: String
})

export default mongoose.model('User', UserSchema)