const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Posts
router.get('/', async(req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
})

// Add Posts
router.post('/', async(req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });

    res.status(201).send();
});

// Delete Posts
router.delete('/:id', async(req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
    res.status(200).send();
});

async function loadPostsCollection() {
    // mongodb 位置
    const url = 'mongodb://192.168.99.100:27017';

    // 資料庫名稱
    const dbName = 'myproject';

    const client = await mongodb.MongoClient.connect(url, { useNewUrlParser: true });

    return client.db(dbName).collection('posts');
}

module.exports = router;