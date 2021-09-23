//reccuperer les donnees de profil
app.get("/employees", (req, res) => {
    db.query("SELECT * FROM contact", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//reccuperer les donnees de profil
app.get("/profil/:id", (req, res) => {
    const id = req.params.id;
    db.query("SELECT fullName, username, email FROM comptes  WHERE id = ? ", id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.get("/article", (req, res) => {
    db.query("SELECT * FROM articles WHERE deleted = 0 ORDER BY modify_at DESC", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.get("/article/:id", (req, res) => {
    console.log(req.params.id);
    const id = req.params.id;
    db.query("SELECT * FROM articles WHERE id_article = ? AND deleted = 0", id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result[0]);
            //ghadi t3sal ga3 hadouk li 3andhoum deleted = 0 et id_article = ""
            //{title:"......", id_article:"1", descriptin:""}
        }
    });
});

app.get("/question/:id", (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM questions WHERE id_article = ?", id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.get("/reponse/:id_user/:id_quest", (req, res) => {
    const id_user = req.params.id_user;
    const id_quest = req.params.id_quest;

    db.query("SELECT * FROM reponses WHERE id_user = ? AND id_quest = ?", [id_user, id_quest], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//get image by id
app.get("/single-article/:id", (req, res) => {
    db.query("SELECT * FROM articles WHERE id_article = ?", req.params.id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result[0]);
        }
    });
});
//get image without id
app.get("/single-article", (req, res) => {
    db.query("SELECT * FROM articles WHERE id_article = ?", req.params.id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result[0]);
        }
    });
});