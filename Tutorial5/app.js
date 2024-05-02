const express = require('express');
const app = express();
app.use(express.json());

let users = [
  { id: 1, firstName: 'Drashti', email: 'drashti@dal.ca' },
];

// POST API
app.post('/add', (req, res) => {
     const { firstName, email } = req.body;
     if (!firstName || !email) {
         return res.status(400).json({ error: "Name and email are required" });
     }
     const newUser = { id: users.length + 1, firstName, email };
     users.push(newUser);
     res.status(201).json({ message: "User added", success: true });
 });
 
 //GET API
 app.get('/users', (req, res) => {
     res.status(200).json({ message: "Users retrieved", success: true, users: users });
 });

// PUT API
app.put('/update/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const { firstName, email } = req.body;
  const userIndex = users.findIndex(user => user.id === userId);
  
  if (userIndex === -1) {
      return res.status(404).json({ error: "User not found" });
  }

  if (!email && !firstName) {
    return res.status(400).json({ error: "At least email or firstName is required to update" });
}

  if (firstName !== undefined) {
      users[userIndex].firstName = firstName;
  }

  if (email !== undefined) {
      users[userIndex].email = email;
  }

  res.status(200).json({ message: "User updated", success: true });
});


 app.get('/user/:id', (req, res) => {
     const userId = parseInt(req.params.id); 

     const user = users.find(user => user.id === userId);
     if (!user) {
         return res.status(404).json({ error: "User not found" });
     }
 
     res.status(200).json({ success: true, user: user });
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