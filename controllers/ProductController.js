const db = require("../config/database.js");

const PostController = {
    update(req, res) {
  let newName = req.body.name;
  let newPrice = req.body.price;
  let sql = `UPDATE products SET name = '${newName}', price='${newPrice}' WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send("Name updated...");
  });
},
 getAll(req, res) {
  let sql = `SELECT * FROM products WHERE products.id= ${req.params.id};`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
},
desc(req, res) {
  let sql = `SELECT * FROM products ORDER BY id DESC;`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
},
showName(req, res)  {
  let sql = `SELECT * FROM products WHERE products.name = '${req.params.name}'`;
  console.log(sql);
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
},
showAll(req, res) {
  let sql = `SELECT * FROM products`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
},
delete(req, res) {
  let sql = `DELETE FROM products WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send("Post deleted");
  });
}
}

module.exports = PostController;
