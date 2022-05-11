const express = require('express');
require('dotenv').config()
const app = express()
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

// middleWare
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.agg0z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        const bookCollection = client.db("bookHouse").collection("books")

        // Get all data from Mongodb
        app.get('/inventory', async(req, res)=>{
            const query = {};
            const cursor = bookCollection.find(query);
            const book = await cursor.toArray();
            res.send(book)
        })

        app.post('/inventory', async(req, res)=>{
            const newBook = req.body;
            const result = await bookCollection.insertOne(newBook);
            res.send(result)
        })
    
    }
    finally {
        // await client.close();
    }
}

run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Server for Assignment')
})

app.listen(port, () => {
    console.log('Listening', port);
})