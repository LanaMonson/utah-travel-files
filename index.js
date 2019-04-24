const express = require('express')
const app = express()
const port = 4000
const bodyParser = require('body-parser')
const monk = require('monk')
const url = 'mongodb://lanamonson:September20$@cluster0-shard-00-00-9jv93.mongodb.net:27017,cluster0-shard-00-01-9jv93.mongodb.net:27017,cluster0-shard-00-02-9jv93.mongodb.net:27017/utah?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true'
const db = monk(url)
    db.then(() => {
            console.log('connected')
    })
const images = db.get('images')

app.use(bodyParser.json())

//GET
app.get('/', async (req, res) => {
    const results = await images.find();
    res.status(200).send(results);
})

//POST
app.post("/images", async (req, res) => {
    const results = await images.insert(req.body);
    res.status(200).send(results);
});

//DELETE
app.delete("/images/:_id", async(req, res) => {
    const results = await images.findOneAndDelete(req.params._id);
    res.send("Delete Completed");
});

//PUT


//LISTEN
app.listen(port, () => console.log(`listening on a port ${port}!`))
