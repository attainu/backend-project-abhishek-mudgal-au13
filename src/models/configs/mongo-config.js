import mongo from 'mongoose'


//Connecting to mongodb database
export const InitMongo = async ()=>{
    try {
        await mongo.connect(process.env.MONGOURI, {useNewUrlParser: true, useUnifiedTopology: true})
        console.log(`Connected to database the the database`);
    } catch (error) {
        console.log("Couldn't connect to the database")
        throw error
    }
}