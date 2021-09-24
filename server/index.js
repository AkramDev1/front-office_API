const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const moment = require("moment");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const multer = require("multer");
const path = require("path")

app.use(cors({
    origin: true,
    methods: ["GET", "POST", "PUT"],
    credentials: true,
}));
app.use("/uploads", express.static(__dirname + "/uploads"))
app.use(express.json());

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    session({
        key: "userId",
        secret: "subscribe",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60 * 60 * 24,
        },
    })
);

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "contact",
});
db.connect((error) => {
    if (error) throw error;
    else console.log("DATABASE connected")
})

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function(req, file, cb) {
        cb(
            null,
            file.fieldname + "__" + Date.now() + path.extname(file.originalname)
        );
    },
});
var upload = multer({ storage: storage });



app.post("/image", upload.any('image'), (req, res, err) => {
    console.log(req.body);
    console.log(req.file);
    console.log(req.files);

    if (!req.file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        res.send({ msg: 'Only image files (jpg, jpeg, png) are allowed!' })
    } else {
        const image = req.file.filename;
        const sqlInsert = "UPDATE images SET `image` = ?;"
        db.query(sqlInsert, [image], (err, result) => {
            if (err) {
                console.log(err)
                res.send({ msg: err })
            }
            if (result) {
                res.send({
                    data: result,
                    msg: 'Your image has been updated'
                });
            }
        });
    }
});



// app.post("/single", upload.single("image"), (req, res) => {
//     console.log(req.file);
//     res.send("Single File upload success")
// })

app.post("/", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "SELECT * FROM comptes WHERE username=? AND password=?", [username, password], (err, result) => {
            if (err) {
                res.send(err);
            }
            if (result.length > 0) {

                bcrypt.compare(password, result[0].password, (error, response) => {
                    if (response) {
                        req.session.user = result;
                        console.log(req.session.user);
                        res.send(result);
                        res.redirect("/home")
                    } else {
                        res.send({ message: "Wrong password combination!" });
                    }
                });
            } else {
                res.send({ message: "User doesn't exist" });
                // res.redirect("/regist")
            }
        }
    );
});

//ajouter les donnees de compte
app.post("/compte", upload.any(), (req, res) => {
    const fullName = req.body.fullName;
    const username = req.body.username;
    const email = req.body.email;
    // let image = []
    // req.files.map((item) => {
    //     image.push(item.filename);
    // });
    const password = req.body.password;
    db.query(
        "INSERT INTO comptes (fullName, username, email, password) VALUES (?,?,?,?)", [fullName, username, email, password],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values Inserted");
                console.log("Values Inserted");
            }
        }
    );
});
app.get("/profil/:id", (req, res) => {
    const id_user = req.params.id_user;
    db.query("SELECT *  WHERE id_user = ? ", id_user, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});


//////////////////////////////////////ARTICLE/////////////////////////////////

app.post("/addNewArticle", upload.any(), (req, res) => {
    console.log("req.files", req.files);
    console.log("req.body", req.body);

    let image = []
    req.files.map((item) => {
        image.push(item.filename);
    });
    const title = req.body.added_title
    const description = req.body.added_description
    db.query(
        "INSERT INTO articles (image ,title, description) VALUES (?,?,?)", [image, title, description],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log("result", result);
                res.send(result);

            }
        }
    );
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

app.put("/delete_article/:id", (req, res) => {
    const id = req.params.id;
    db.query("UPDATE articles SET deleted = 1  WHERE id_article = ?", id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`xxxxxxxxxxxxxxxx`, result);
            res.send(result);
            //delete = 1
        }
    });
});

app.put("/update_article", upload.any(), (req, res) => {
    console.log("req.files", req.files);
    console.log("req.body", req.body);

    const id = req.body.id;
    console.log("id_article =", id);
    const title = req.body.title
    let image = []
    req.files.map((item) => {
        image.push(item.filename);
    });
    const description = req.body.description
    const modify_at = req.body.modify

    db.query(
        `UPDATE articles SET title= ?,image = ?, description = ?, modify_at = '${moment().format('YYYY-MM-DD HH:mm:ss')}'  WHERE deleted = 0 AND id_article = ?`, [title, image, description, id],
        (err, result) => {
            if (err) {
                console.log('err: ', err);
            } else {
                console.log("result sql: ", moment().format('YYYY-MM-DD HH:mm:ss'))
                res.send(result);
            }
        }
    );
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
//"INSERT INTO questions (nom, prenom, tel, emailPro, message) VALUES (?,?,?,?,?)", [nom, prenom, tel, emailPro, message],

//API responsesToQuestion
app.post("/responsesToQuestion", (req, res) => {
    const id_article = req.body.id_article;
    const id_quest = req.body.id_quest;
    const id_user = req.body.id_user;
    const reponse = req.body.reponse;
    db.query(
        "INSERT INTO reponses (reponse, id_article, id_quest, id_user) VALUES (?, ?, ?, ?)", [reponse, id_article, id_quest, id_user],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Response Inserted", result);
                res.send(result);
            }
        }
    );
});

app.post("/ajouterQuest/:id_article", (req, res) => {
    const id_user = req.params.id_user;
    const id_article = req.params.id_article;
    const question = req.body.question;
    db.query(
        "INSERT INTO questions (question, id_article) VALUES ( ?, ?)", [question, id_article],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Question Inserted", result);
                res.send(result);
            }
        }
    );
});


app.listen(4002, () => {
    console.log('server running in PORT 4002')
})