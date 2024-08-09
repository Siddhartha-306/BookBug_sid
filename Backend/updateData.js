const { MongoClient } = require('mongodb');

async function main() {
    
    const uri = "mongodb+srv://bookbug:bookbug%40123@cluster0.n2q9hfj.mongodb.net/sid_Book_Bug";

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const database = client.db('sid_Book_Bug'); // Replace with your database name
        const collection = database.collection('books'); // Replace with your collection name

        // Define the filter for the document you want to update
        const filter = {}; // Replace with your specific document identifier

        // Define the update operation
        const updateDoc = {
            $set: {
                // Replace with the fields and values you want to update
                url: "https://i.pinimg.com/236x/f4/5b/43/f45b43c471538dc141be19363964245a.jpg"
            },
        };

        // Update the document
        const result = await collection.updateMany(filter, updateDoc);

        console.log(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`);
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

main().catch(console.error);
