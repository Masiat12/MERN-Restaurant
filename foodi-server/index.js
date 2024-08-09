// const express = require('express')
// const app = express();
// const cors = require('cors');
// const port = process.env.PORT || 6001;
// require('dotenv').config()


// //middleware

// app.use(cors());
// app.use(express.json()); 


// //mongodb config


// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@demo-foodi-cluster.r3vltn4.mongodb.net/?retryWrites=true&w=majority&appName=demo-foodi-cluster`;

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
   
//     await client.connect();

//     //database and collections
//     const menuCollections = client.db("demo-foodi-client").collection("menus");
//     const cartCollections = client.db("demo-foodi-client").collection("cartItems");

//     //all menuItems operations

//     app.get('/menu',async(req,res) => {
//         const result = await menuCollections.find().toArray();
//         res.send(result);

//     })

//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);


// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })



const express = require('express');
const app = express();
const cors = require('cors');
const { ObjectId } = require('mongodb');
const port = process.env.PORT || 6001;
require('dotenv').config();

// Middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@demo-foodi-cluster.r3vltn4.mongodb.net/?retryWrites=true&w=majority&appName=demo-foodi-cluster`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    // Database and collections
    const menuCollections = client.db("demo-foodi-client").collection("menus");
    const cartCollections = client.db("demo-foodi-client").collection("cartItems");

    // All menuItems operations
    app.get('/menu', async (req, res) => {
      console.log("Received request for /menu");
      try {
        const result = await menuCollections.find().toArray();
        console.log("Fetched menu items:", result);
        res.send(result);
      } catch (err) {
        console.error("Error fetching menu items:", err);
        res.status(500).send({ error: 'Failed to fetch menu items' });
      }
    });

    // all carts operations

    //post cart to db

    app.post('/carts', async(req,res) =>{

      const cartItem = req.body;
      const result = await cartCollections.insertOne(cartItem);
      res.send(result)

    })

    //get carts using email

    app.get('/carts', async(req,res) =>{

      const email = req.query.email;
      const filter = {email:email};
      const result = await cartCollections.find(filter).toArray();
      res.send(result);

    })

    
    //get specific carts

    app.get('/carts/:id', async(req,res) =>{
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)};
      const result = await cartCollections.findOne(filter);
      res.send(result);

    })

    //delete method from cart

    // app.delete('/cart/:id', async(req,res) =>{
    //   const id = req.params.id;
    //   const filter = {_id: new ObjectId(id)};
    //   const result = await cartCollections.deleteOne(filter);
    //   res.send(result);

    // })
    app.delete('/carts/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const result = await cartCollections.deleteOne(filter);
        res.send(result);
      } catch (error) {
        console.error("Error deleting item:", error);
        res.status(500).send({ error: "Failed to delete item" });
      }
    });

    //update cart quantity

    app.put('/carts/:id', async (req, res) => {
      const id = req.params.id;
      const {quantity} = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = {upsert: true};
  

      const updateDoc = {
        $set: {

          quantity: parseInt(quantity,10),
          
        },
      };

      const result = await cartCollections.updateOne(filter, updateDoc, options);
    });


    // Other routes and operations can go here

    app.get('/', (req, res) => {
      res.send('Hello World!');
    });

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });

  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit process with a failure code
  }
}

run().catch(console.dir);