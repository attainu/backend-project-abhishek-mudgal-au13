import mongo from 'mongoose'

const MONGOURI = `mongodb://localhost:27017/skindle`

export const InitMongo = async ()=>{
    try {
        await mongo.connect(MONGOURI, {useNewUrlParser: true, useUnifiedTopology: true})
        console.log(`Connected to database at mongodb://localhost:27017/skindle`);
    } catch (error) {
        console.log("Couldn't connect to the database")
        throw error
    }
}