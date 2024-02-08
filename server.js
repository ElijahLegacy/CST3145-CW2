// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB connection URI
const mongoURI = 'mongodb+srv://ElijahLegacy:uA1yXRRQfvgScQox@cluster0.mkhsgyb.mongodb.net/';

// Create MongoDB client
const client = new MongoClient(mongoURI);

// Connect to MongoDB
async function connectToMongo() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        // Define MongoDB collections
        const db = client.db('MongoCLoud');
        const ordersCollection = db.collection('orders');
        const lessonsCollection = db.collection('lessons');

        // Define POST route to save orders
        app.post('/orders', (req, res) => {
            const orderData = req.body;
            ordersCollection.insertOne(orderData)
                .then(result => {
                    console.log('Order saved:', result.ops[0]);
                    // Call function to update lesson inventory
                    updateLessonInventory(orderData.lessonIds);
                    res.status(201).json({ message: 'Order saved successfully' });
                })
                .catch(err => {
                    console.error('Error saving order:', err);
                    res.status(500).json({ error: 'An error occurred while saving the order' });
                });
        });

        // Define PUT route to update lesson inventory
        app.put('/lessons/:id', (req, res) => {
            const lessonId = parseInt(req.params.id);
            const lessonUpdate = { $inc: { availableInventory: -1 } }; // Decrease available inventory by 1
            lessonsCollection.updateOne({ id: lessonId }, lessonUpdate)
                .then(result => {
                    console.log('Lesson inventory updated for lesson ID:', lessonId);
                    res.status(200).json({ message: 'Lesson inventory updated successfully' });
                })
                .catch(err => {
                    console.error('Error updating lesson inventory:', err);
                    res.status(500).json({ error: 'An error occurred while updating lesson inventory' });
                });
        });

        // Start the server
        app.listen(3000, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

// Call the function to connect to MongoDB
connectToMongo();

// Function to update lesson inventory
function updateLessonInventory(lessonIds) {
    lessonIds.forEach(lessonId => {
        app.put(`/lessons/${lessonId}`, (req, res) => {
            // Call the PUT route defined above to update lesson inventory
            // This function is called after an order is placed
            // It will update the inventory for each lesson ID in the order
            // You can add more error handling or validation here if needed
            fetch(`/lessons/${lessonId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ lessonId })
            })
            .then(response => response.json())
            .then(data => console.log('Lesson inventory updated for lesson ID:', lessonId))
            .catch(error => console.error('Error updating lesson inventory:', error));
        });
    });
}
