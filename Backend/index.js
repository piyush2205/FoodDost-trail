const FoodData = require("./models/restaurantsModel")
const mongoose = require('mongoose');
const express = require('express');
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(cors())
require("dotenv").config()


const connection = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("database Connected")
    } catch (err) {
        console.log(err)
    }

}

app.get('/', (req, res) => {
    res.send('Hello Worldd!')
})

app.post('/addFoodandRes/restaurants', async (req, res) => {
    try {

        const newFood = new FoodData(req.body)
        await newFood.save()
        res.status(200).send({ "msg": "new food is added" })

    } catch (err) {
        res.status(400).send({ "msg": err.message })
    }

})



app.get('/foodapidata', async (req, res) => {
    try {
        const AllFood = await FoodData.find()
        res.status(200).send(AllFood)


    } catch (err) {
        res.status(400).send({ "msg": err.message })
    }

})



app.get('/foodapidata/singleData/:id', async (req, res) => {

    try {
        // const documentId = req.params.id;
        // console.log(req.params.id)

        // Find a single document by its ObjectId
        // const query = { _id: ObjectId(documentId) };
        const OneFood = await FoodData.findById(req.params.id)


        res.status(200).send(OneFood)


    } catch (err) {
        res.status(400).send({ "msg": err.message })
    }

})




app.listen(process.env.PORT, () => {
    connection()
    console.log(`Example app listening on port ${process.env.PORT}`)
})



