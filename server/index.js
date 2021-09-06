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

// //images ##multer
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "./images");
//     },
//     filename: (req, file, cb) => {
//         const ext = file.mimetype.split("/images")[1];
//         cb(null, `uploads/${file.originalname}-${Date.now()}.${ext}`)
//     }
// });
// const upload = multer({ storage: storage });
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

//ajouter les donnees de contact
app.post("/create", (req, res) => {
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const tel = req.body.tel;
    const emailPro = req.body.emailPro;
    const message = req.body.message;

    db.query(
        "INSERT INTO questions (nom, prenom, tel, emailPro, message) VALUES (?,?,?,?,?)", [nom, prenom, tel, emailPro, message],
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

app.put("/update", (req, res) => {
    const id = req.body.id;
    const message = req.body.message;
    db.query(
        "UPDATE contact SET message = ? WHERE id = ?", [message, id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.delete("/delete_contact/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM contact WHERE id = ?", id, (err, result) => {
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
    db.query("SELECT fullName, username, email FROM registration  WHERE id = ? ", id, (err, result) => {
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
    // const image = req.file.filename;
    // const image = req.body.image
    // const image = req.files.image

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

app.put("/delete_article/:id", (req, res) => {
    const id = req.params.id;
    db.query("UPDATE articles SET deleted = 1  WHERE id_article = ?", id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`xxxxxxxxxxxxxxxx`, result);
            res.send(result);
            //delete = 1
            //
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

app.listen(4001, () => {
    console.log('🌍server running in PORT 4001')
})