require('dotenv').config();
let PORT = process.env.PORT || 3000;

let express = require('express');
let app = express();
app.use(express.json());
let bodyParser = require('body-parser');
app.use(bodyParser.json());

let dBconnect = require('./config/database');
dBconnect();

const cors = require("cors");

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
}));


// importing routes
let node_js_project_routes = require('./routes/node_js_project_routes');

// using routes
app.use('/api/v1/node_js_project_routes', node_js_project_routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

app.get('/', (req, res) => {
    res.send('Welcome to the Node.js Project API');
})