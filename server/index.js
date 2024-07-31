require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const uri = process.env.MONGO_URI;
const secretKey = process.env.SECRET_KEY;

async function startApp() {
    const port = process.env.PORT;
    const app = express();
    app.use(cors());
    app.use(express.json());
    
    const client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
      });

    let db;
    try {
      await client.connect();
      db = client.db("ClockApp");
      console.log("Connected to MongoDB successfully.");
    } catch (error) {
      console.error("Failed to connect to the MongoDB", error);
    }
    

    function verifyToken(req, res, next) {
      const token = req.headers['access_token'];

      if (!token) {
        res.status(403).send("A token is required for authentication.");
      }

      try{
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
      } catch (error) {
        return res.status(401).send("Invalid Token.");
      }
      next();
    }

    app.post('/api/login', async (req, res) => {
      const { username, password } = req.body;
      const user = await db.collection('users').findOne({username: username, password: password});
      
      if(user) {
        const token = jwt.sign({ username }, secretKey, {expiresIn: '24h'});
        res.status(200).json({ success:true, message:"Success Token", result: {profile: user, token: token}});
        console.log("User Found.");
        console.log(user);
        console.log(token);
      } else {
        res.status(401).json({success:false, message:"Access Denied"});
      }
    });

    app.post('/api/register', async (req, res) => {
      const { firstname, lastname, username, password, email } = req.body;

      if(!(firstname && lastname && username && email && password)){
        res.status(400).send('All inputs are required.');
        return;
      }

      const userCheck = await db.collection('users').findOne({username: username, password: password});

      if(userCheck){
        res.status(409).send('User Already Exist.');
        return;
      }

      try {
        const result = await db.collection('users').insertOne({firstname: firstname, lastname: lastname, username: username, password: password, email: email});
        res.json({success: true, message: "create succeeded.", result: result});
      } catch (error) {
        console.error(error);
        res.json({success: false, message: "create failed."});
      }
    })

    app.post('/api/create/:modelName', verifyToken, async (req, res) => {
      const { modelName } = req.params;
      const document = req.body;
  
      try {
        const result = await db.collection(modelName).insertOne(document);
        res.json({ success: true, message: "success create", result: result });
      } catch (error) {
        console.error(error);
        res.json({ success: false, message: "create error" });
      }
    });

    app.post('/api/update/:modelName/:id', verifyToken, async (req, res) => {
      const { modelName, id } = req.params;
      let updates = req.body;
  
      if (!ObjectId.isValid(id)) {
        return res.status(400).send('Invalid ID format');
      }
  
      try {
        delete updates._id;
        const result = await db.collection(modelName).updateOne(
          { _id: new ObjectId(id) },
          { $set: updates }
        );
  
        if (result.matchedCount === 0) {
          return res.status(404).send('Document not found');
        }
  
        res.json({ success: true, message: "success update", result: result });
      } catch (error) {
        console.error(error);
        res.json({ success: false, message: "update error", error: error.message });
      }
    });

    app.post('/api/search/:modelName', verifyToken, async (req, res) => {
      const { modelName } = req.params;
  
      try {
        const searchResult = await db.collection(modelName).find(req.body).toArray();
  
        res.json({ success: true, message: "success search", result: searchResult });
      } catch (error) {
        console.error(error);
        res.json({ success: false, message: "search error" });
      }
    });
  
    app.get('/api/employees', async (req, res) => {
      try {
        const employees = await db.collection('users').find({}).toArray();
        // console.log("Employees fetched from DB:", employees); // Debugging line
        res.json({ success: true, message: "Employees fetched successfully", result: employees });
      } catch (error) {
        console.error("Error fetching employees:", error);
        res.json({ success: false, message: "Error fetching employees" });
      }
    });



    app.post('/api/delete/:modelName/:id', verifyToken, async (req, res) => {
      const { modelName, id } = req.params;
  
      if (!ObjectId.isValid(id)) {
        return res.status(400).send('Invalid ID format');
      }
  
      try {
        const result = await db.collection(modelName).deleteOne({ _id: new ObjectId(id) });
  
        if (result.deletedCount === 0) {
          return res.status(404).send('Document not found or already deleted');
        }
  
        res.json({ success: true, message: "Document deleted successfully", result: result });
      } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Delete Failed", error: error.message });
      }
    });

    app.get('/api/status', async (req, res) => {
      res.json({status: "Server is up and running."});
    });

    
    app.listen(port, () => {
        console.log(`Server is running on Port: ${port}`);
    })
}

startApp();