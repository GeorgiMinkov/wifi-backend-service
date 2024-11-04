const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

// Endpoint to handle login and check user status
app.post('/api/login', (req, res) => {
  const { username } = req.body;

  const randomNumber = Math.floor(Math.random() * 100);

  const status = randomNumber % 2 === 0 ? 'Platinum' : 'Gold';

  if (status === 'Platinum') {
    const cmd = `chilli_query authorize_user ${username}`;
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.error(`Authorization error: ${stderr}`);
        return res.status(500).json({ status: 'Error', message: 'Failed to authorize user' });
      }
      console.log(`User ${username} authorized successfully.`);
      res.json({ status: 'Platinum', message: 'Access granted. Enjoy your internet!' });
    });
  } else {
    res.json({ status: 'Gold', message: 'Access denied. Gold users cannot access internet.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
