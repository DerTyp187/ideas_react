/* Express Backend for my React Notes App */
const express = require('express');
const app = express();
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database("database.db")
const port = process.env.PORT || 5000;
const securePostData = require('./securePostData');
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

app.get('/idea/get/:id', (req, res) => {
    let id = securePostData.secureId(req.params.id)
    db.all(`SELECT * FROM ideas WHERE id = ${id}`, (err, rows) => {
        if (err) {
            res.send({title: "Error", content: "Error fetching idea"});
        }else{
            if(rows.length > 0){
                // De-Formatting
                rows[0].title = securePostData.decode(rows[0].title);
                rows[0].content = securePostData.decode(rows[0].content);

                res.json(rows[0]);
            }else{
                res.send({title: "Error", content: "Idea not found"});
            }
        }
    });
});

app.get('/ideas', (req, res) => {
    db.all(`SELECT * FROM ideas ORDER BY id DESC`, (err, rows) => {
        if (err) {
            res.send({title: "Error", content: "Error fetching ideas"});
        }else{
            for (let i = 0; i < rows.length; i++) {
                // De-Formatting
                rows[i].title = securePostData.decode(rows[i].title);
                rows[i].content = securePostData.decode(rows[i].content);
            }
            res.json(rows);
        }
    });
});


app.post('/idea/update/:id', (req, res) => {
    let id = securePostData.secureId(req.params.id)

    // Validate POST
    if(!req.body.title || req.body.title.replace(/\s/g, '').length === 0){
        res.send({title: "Error", type:"title", message: "Title is required"});
        return;
    }else if(!req.body.content || req.body.content.replace(/\s/g, '').length === 0){
        res.send({title: "Error", type:"content", message: "Content is required"});
        return;
    }

    let regexPattern = /^[a-zA-ZÀ-úÀ-ÿÀ-ÿÀ-ÖØ-öø-ÿ0-9ßäöüÄÖÜ!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`´\s]*$/;

    
    if(!regexPattern.test(req.body.title)){
        res.send({title: "Error", type:"title", message: "Title contains invalid characters"});
        return;
    }else if(!regexPattern.test(req.body.content)){
        res.send({title: "Error", type:"content", message: "Content contains invalid characters"});
        return;
    }

    // replace ' with \u0027
    let title = securePostData.secure(req.body.title);
    let content = securePostData.secure(req.body.content);

    db.run(`UPDATE ideas SET title = '${title}', content = '${content}' WHERE id = ${id}`, (err) => {
        if (err) {
            res.send({title: "Error", type:"saving", message: "Error updating idea"});
        }else{
            res.send({title: "Success", type:"saving", message: "Idea updated"});
        }
    });
});

app.get('/idea/create', (req, res) => {
    console.log("CREATE")
    // Create new idea
    db.run(`INSERT INTO ideas (title, content) VALUES ('New Idea', 'New Content')`, (err) => {
        if (err) {
            res.send({title: "Error", type:"create", message: "Error creating new idea"});
        }else{
            // SELECT id from last idea
            db.all(`SELECT * FROM ideas ORDER BY id DESC LIMIT 1`, (err, rows) => {
                if (err) {
                    res.send({title: "Error", type:"create", message: "Error fetching new idea id"});
                }else{
                    res.send({title: "Success", type:"create", id:rows[0].id, message: "New idea created"});
                }
            });
        }
    });
});


// delete idea
app.get('/idea/delete/:id', (req, res) => {
    let id = securePostData.secureId(req.params.id)
    db.run(`DELETE FROM ideas WHERE id = ${id}`, (err) => {
        if (err) {
            res.send({title: "Error", type:"delete", message: "Error deleting idea"});
        }else{
            res.send({title: "Success", type:"delete", message: "Idea deleted"});
        }
    });
});
