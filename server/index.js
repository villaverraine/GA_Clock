require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const uri = process.env.MONGO_URI;
const secretKey = process.env.SECRET_KEY;
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
      if (db) {
        console.log("Connected to MongoDB successfully.");
      }
    } catch (error) {
      console.error("Failed to connect to the MongoDB", error);
    }
    

    function verifyToken(req, res, next) {
      if (req.path === '/api/create/user' && req.method === 'POST') {
          return next(); 
      }
      const token = req.headers['access_token'];
  
      // console.log('Received token:', token);
  
      if (!token) {
          return res.status(403).send("A token is required for authentication");
      }
  
      try {
          const decoded = jwt.verify(token, secretKey);
          req.user = decoded;
          // console.log('Decoded token:', decoded);
      } catch (err) {
          console.error('Token verification failed:', err);
          return res.status(401).send("Invalid Token");
      }
      next();
    }

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
      if (modelName === 'users' && updates.password) {
        
        // Fetch the selected user data
        const currentUser = await db.collection(modelName).findOne({ _id: new ObjectId(id) });
        if (!currentUser) {
          return res.status(404).send('User not found');
        }

        // Check if the new password is different from the current password
        const isSamePassword = await bcrypt.compare(updates.password, currentUser.password);
        if (!isSamePassword) {
          // Hash the new password
          updates.password = await bcrypt.hash(updates.password, saltRounds);
          // Commented for dev debugging
          // console.log("!!!!!!!!!New Hashed Password: " + updates.password)
        } else {
          // If the password hasn't changed, remove it from updates
          delete updates.password;
        }
      }
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

  app.get('/api/get/:modelName/:id', async (req, res) => {
      const { modelName, id } = req.params;

      try {
          const document = await db.collection(modelName).findOne({ _id: new ObjectId(id) });
          res.json({ success: true, message: "Document fetched successfully", result: document });
      } catch (error) {
          console.error(error);
          res.json({ success: false, message: "get error" });
      }
  });

  app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await db.collection('users').findOne({ username: username });
  
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ username }, secretKey, { expiresIn: '24h' });
      res.status(200).json({ success: true, message: "Success Token", result: { profile: user, token: token } });
      // console.log("User Found.");
      // console.log(user);
      // console.log(token);
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  });

  
  
  app.post('/api/register', async (req, res) => {
    const { firstName, lastName, username, password, email, internID, role, timeRendered, timeRequired } = req.body;
  
    if (!(firstName && lastName && username && email && password && internID && role && timeRendered && timeRequired)) {
      res.status(400).send('All inputs are required.');
      return;
    }
  
    const userCheck = await db.collection('users').findOne({ username: username });
  
    if (userCheck) {
      res.status(409).send('User Already Exist.');
      return;
    }
  
    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      const result = await db.collection('users').insertOne({
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: hashedPassword,
        email: email,
        internID: internID,
        role: role,
        timeRendered: timeRendered,
        timeRequired: timeRequired
      });
      res.json({ success: true, message: "create succeeded.", result: result });
    } catch (error) {
      console.error(error);
      res.json({ success: false, message: "create failed." });
    }
  });

app.post('/api/total-time/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const timeEntries = await db.collection('time').find({ userID: userId }).toArray();
    let totalMinutes = 0;
    timeEntries.forEach(entry => {
      const [hours, minutes] = entry.timeRendered.split(':').map(Number);
      totalMinutes += (hours * 60) + minutes;
    });
    res.json({ success: true, totalTimeRendered: totalMinutes });
  } catch (error) {
    res.status(500).send('Error calculating time rendered.');
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