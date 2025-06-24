// In your main app.js or server.js file
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
require('./src/db/connection'); // Ensure this is the correct path to your connection file

const routes = require('./src/router/routes');
app.use(cors());
app.use('/api', routes);
app.listen(3002, () => console.log('Server running on port 3002'));