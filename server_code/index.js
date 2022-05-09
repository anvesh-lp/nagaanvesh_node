const http = require("http");
const path = require("path");
const fs = require("fs");

const express = require('express');
const cors = require('cors');
const parser = require("body-parser");
const mongodb = require("mongodb");
const server = express();
const router = express.Router();
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200, // For legacy browser support
    methods: "GET, PUT, POST",
}

server.use(cors(corsOptions));

server.get('/', (req, res) => {
    fs.readFile(path.join(__dirname, 'public', 'index.html'),
        (err, content) => {
            if (err) throw err;
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(content);
        }
    );
});


server.get('/api', cors(), async (req, res) => {
    const details = await loadDetails();
    res.send(await details.find({}).toArray());

});


async function loadDetails() {
    const client = await mongodb.MongoClient.connect(
        "mongodb+srv://anvesh:KQO8mo7VftJF7gcB@healthcare.1ycs5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
        , {useNewUrlParser: true});

    return client.db('healthcare').collection('healthcare');
}

const PORT = process.env.PORT || 5959;

server.listen(PORT, () => console.log(`Great our server is running on port ${PORT} `));
module.exports = router;