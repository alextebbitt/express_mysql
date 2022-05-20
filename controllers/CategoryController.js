const db = require("../config/database.js");

const CategoryController = {
   selectCategory(req, res)  {
  let sql = `SELECT * FROM category 
WHERE category.id= ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
},
SelectAllCategories(req, res) {
  let sql = `SELECT * FROM category`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
},
updateCategory(req, res) {
  let newName = req.body.name;
  let sql = `UPDATE category SET name = '${newName}' WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send("Name updated...");
  });
},
createCategory(req, res) {
  let sql = `INSERT INTO category (name) values
('${req.body.name}')`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Category added...");
  });
}
}


module.exports = CategoryController;