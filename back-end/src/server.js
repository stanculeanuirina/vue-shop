import express from 'express';
import { MongoClient } from 'mongodb';
import path from 'path';

async function start() {
    const client = new MongoClient(`mongodb+srv://irinaprisacariu:bP73aOK0mKG4zTbp@cluster0.aseab0y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);

    await client.connect();
    const db = client.db('shop-db');
    
    const app = express();
    app.use(express.json());

    app.use('/images', express.static(path.join(__dirname, '../assets')));

    async function populateCartIds(ids) {
        return Promise.all(ids.map(id => db.collection('products').findOne({id: id})));
    }

    app.get('/api/products', async (req, res) => {
        const products = await db.collection('products').find({}).toArray();
        //res.send(products);
        res.json(products);
    });

    app.get('/api/products/:productId', async (req, res) => {
        const productId = req.params.productId;
        const product = await db.collection('products').findOne({id: productId});
        res.json(product);
    });

    app.get('/api/users/:userId/cart', async (req, res) => {
        const userId = req.params.userId;

        const user = await db.collection('users').findOne({id: userId});

        const populatedCart = await populateCartIds(user?.cartItems || []);
        res.json(populatedCart);
    });

    app.post('/api/users/:userId/cart', async (req, res) => {
        const productId = req.body.id;
        const userId = req.params.userId;

        /*
        await db.collection('users').updateOne({id: userId}, {
            $push: {cartItems: productId}
        }); 
        */

        await db.collection('users').updateOne({id: userId}, {
            $addToSet: { cartItems: productId }
        });
        // insertOne - inserts one item
        // insertMany - insert multiple
        const user = await db.collection('users').findOne({id: userId});
        const populatedCart = await populateCartIds(user?.cartItems || []);
        res.json(populatedCart);
    });

    app.delete('/api/users/:userId/cart/:productId', async (req, res) => {
        const productId = req.params.productId;
        const userId = req.params.userId;

        await db.collection('users').updateOne({id: userId}, {
            $pull: { cartItems: productId }
        });
        // deleteOne - delete one item
        const user = await db.collection('users').findOne({id: userId});
        const populatedCart = await populateCartIds(user?.cartItems || []);
        res.json(populatedCart);
    });

    app.listen(8000, () => {
        console.log("Server is listening to 8000");
    });
}

start();