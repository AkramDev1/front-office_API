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