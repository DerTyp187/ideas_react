/* Express Backend for my React Notes App */
const express = require('express');
const app = express();
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database("database.db")
const port = process.env.PORT || 5000;

// body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods","POST","GET")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,authorization,Accept");
  
    res.header('Access-Control-Allow-Credentials', 'true'); 
    next();
  });  

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/idea/:id', (req, res) => {

    db.all(`SELECT * FROM ideas WHERE id = ${req.params.id}`, (err, rows) => {
        if (err) {
            res.send({title: "Error", content: "Error fetching idea"});
        }else{
            if(rows.length > 0){
            res.json(rows[0]);
            }else{
                res.send({title: "Error", content: "Idea not found"});
            }
        }
    });
});

app.get('/ideas', (req, res) => {
    db.all(`SELECT * FROM ideas`, (err, rows) => {
        if (err) {
            res.send({title: "Error", content: "Error fetching ideas"});
        }else{
            res.json(rows);
        }
    });
});


app.post('/idea/update/:id', (req, res) => {
    db.run(`UPDATE ideas SET title = '${req.body.title}', content = '${req.body.content}' WHERE id = ${req.params.id}`, (err) => {
        if (err) {
            res.send({title: "Error", content: "Error updating idea"});
        }else{
            res.send({title: "Success", content: "Idea updated"});
        }
    });
});