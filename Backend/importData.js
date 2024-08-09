const { MongoClient } = require('mongodb');
const fs = require('fs');

require("dotenv").config;
const uri = process.env.URI;

async function importData() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const database = client.db('sid_Book_Bug');
        const collection = database.collection('books');

        const data = JSON.parse(fs.readFileSync('books.json', 'utf-8'));

        const result = await collection.insertMany(data);
        console.log(`${result.insertedCount} documents were inserted`);
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

importData();
