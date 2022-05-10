const express = require('express');
const app = express()
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

// middleWare
app.use(cors())
app.use(express.json())

// user: BookHouse
// Password: cLkRbyB1qzkFgK7c



const uri = "mongodb+srv://<username>:<password>@cluster0.agg0z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    console.log('Mongo db connected');
    // perform actions on the collection object
    client.close();
});


app.get('/', (req, res) => {
    res.send('Server for Assignment')
})

app.listen(port, () => {
    console.log('Listening', port);
})