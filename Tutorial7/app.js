const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const mongoURI = 'mongodb+srv://navadiyadrashti8049:Mongo@123123@cluster0.jopx0v5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&directConnection=true';

app.use(express.json());

let db;

// Connect to MongoDB and start the serverß\
async function startServer() {
    try {
        const client = await MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');
        db = client.db('Tutorial7');
        
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err);
        process.exit(1); // Exit the process if failed to connect to MongoDB
    }
}

startServer();

// Custom middleware to ensure db is ready before processing requests
app.use((req, res, next) => {
    if (!db) {
        return res.status(500).json({ error: "Database connection not established" });
    }
    next();
});

// POST API
app.post('/add', async (req, res) => {
    try {
        const { firstName, email } = req.body;
        if (!firstName || !email) {
            return res.status(400).json({ error: "Name and email are required" });
        }
        const result = await db.collection('mydb').insertOne({ firstName, email });
        console.log(result)
        res.status(201).json({ message: "User added", success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to add user" });
    }
});


// GET API
app.get('/users', async (req, res) => {
    try {
        const users = await db.collection('mydb').find().toArray();
        res.status(200).json({ message: "Users retrieved", success: true, users: users });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to retrieve users" });
    }
});

// PUT API
app.put('/update/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const { firstName, email } = req.body;
        if (!email && !firstName) {
            return res.status(400).json({ error: "At least email or firstName is required to update" });
        }
        const result = await db.collection('mydb').updateOne(
            { _id: new ObjectId(userId) }, // Using ObjectId() to create ObjectID
            { $set: { firstName, email } }
        );
        if (result.matchedCount === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ message: "User updated", success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update user" });
    }
});

// DELETE API
app.delete('/delete/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const result = await db.collection('mydb').deleteOne({ _id: new ObjectId(userId) });
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ message: "User deleted", success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete user" });
    }
});


// GET single user API
app.get('/user/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await db.collection('mydb').findOne({ _id: new ObjectId(userId) });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ success: true, user: user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to retrieve user" });
    }
});

// Error handling (500 Internal Server Error)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Internal Server Error',
        success: false,
    });
});

module.exports = app;
