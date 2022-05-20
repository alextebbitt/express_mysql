const db = require("../config/database.js");

const CategoryproductsController = {
showCategoryProducts(req, res) {
  let sql = `SELECT * FROM categoryproducts INNER JOIN products
ON products.id = categoryproducts.products_id
INNER JOIN category
ON  categoryproducts.category_id = category.id`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
}
}
module.exports = CategoryproductsController;