const express = require("express")
const amqp = require('amqplib')
const app = express()

const amqpUrl = "amqp://localhost:5672"

const orderData = {
    customerId: 34,
    orderId: 9900,
    number: '990099009'
}

app.get('/', async (req, res) => {
    try {
        const connection = await amqp.connect(amqpUrl)
        const channel = await connection.createChannel()
        await channel.assertQueue('order.shipped')
        channel.sendToQueue("order.shipped", Buffer.from(JSON.stringify(orderData))) // convert to string and send as a buffer
        res.send("ORDERS API")
    } catch (error) {
        console.log(error);
    }
})

app.listen(8000, () => {
    console.log("ORDERS API listening on port 8000")
})