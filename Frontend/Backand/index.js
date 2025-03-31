
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Enable CORS for all origins
app.use(cors());
app.use(bodyParser.json());
// app.use(express.json());
app.use(express.static('public'));

// In-memory storage for items (This is where you can integrate a database)
let items = [];

// Create - Add a new item
app.post('/api/items', (req, res) => {
    const { name } = req.body;
    const newItem = { id: Date.now(), name };
    items.push(newItem);
    res.status(201).json(newItem);
});

// Read - Get all items
app.get('/api/items', (req, res) => {
    res.json(items);
});

// Update - Modify an item
app.put('/api/items/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const itemIndex = items.findIndex(item => item.id === parseInt(id));

    if (itemIndex !== -1) {
        items[itemIndex].name = name;
        res.json(items[itemIndex]);
    } else {
        res.status(404).send('Item not found');
    }
});

// Delete - Remove an item
app.delete('/api/items/:id', (req, res) => {
    const { id } = req.params;
    items = items.filter(item => item.id !== parseInt(id));
    res.status(200).send('Item deleted');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});