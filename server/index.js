//////////////////////////
// Imports
//////////////////////////
require('dotenv').config();
const path = require('path');
const express = require('express');
const handleFetch = require('./handleFetch');
//////////////////////////
// Constants
//////////////////////////
const port = 8080;
const pathToDistFolder = path.join(__dirname, '../frontend/dist');
const app = express();

//////////////////////////
// Middleware/Controllers
//////////////////////////

const serveStatic = express.static(pathToDistFolder);
const getTrendingGifs = (req, res) => {

    const fetchTrendingGifs = async () => {
        const [data,error]= await handleFetch(`https://api.giphy.com/v1/gifs/trending?limit=3&rating=g&api_key=${process.env.API_KEY}`)
        if(data) {
            res.send(data)
        } else {
            res.status(503).send(error);
        }
    }
    fetchTrendingGifs();
}

app.use(serveStatic);

//////////////////////////
// Listener
//////////////////////////
app.get('/api/gifs', getTrendingGifs)
app.listen(port, () => console.log(`listening at http://localhost:${port}`)); 