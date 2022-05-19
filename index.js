const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());
const mysql = require("mysql2")

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "hello887",
  database: "expressDB",
});

db.connect();
// create database
app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE expressDB";

  db.query(sql, (err, result) => {
    if (err) throw err;

    console.log(result);

    res.send("Database created...");
  });
});

// create products table
app.get("/createtable/products", (req, res) => {
  let sql =
    "CREATE TABLE products(id int AUTO_INCREMENT,name VARCHAR(255), price FLOAT, PRIMARY KEY(id))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Products table created...");
  });
});

// create category table
app.get("/createtable/category", (req, res) => {
  let sql =
    "CREATE TABLE category(id int AUTO_INCREMENT,name VARCHAR(255), PRIMARY KEY(id))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Category table created...");
  });
});

//create categoryproducts table
app.get("/createtable/categoryproducts", (req, res) => {
  let sql =
    "CREATE TABLE categoryproducts(id int AUTO_INCREMENT, category_id INT, products_id INT, PRIMARY KEY(id), foreign key (category_id) references category(id), foreign key (products_id) references products(id) ON DELETE CASCADE)";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Categoryproducts table created...");
  });
});

//Crea un endpoint para añadir un producto nuevo y añade 2 productos nuevos desde el postman
app.post("/createproducts", (req, res) => {
  let sql = `INSERT INTO products (id, name, price) values

(1, 'Orange', 50.00), (2, 'Apple', 20.00),(3, "Cherry", 30.75),(4,"Carrot", 70.50), (5,"Broccoli", 40.00);`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Product added...");
  });
});

// Crea un endpoint para crear una categoría y añade 2 categorías nuevas desde el postman
app.post("/createcategory", (req, res) => {
  let sql = `INSERT INTO category (name) values
('${req.body.name}')`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Product added...");
  });
});


//Doing the same with the middle table
app.post("/createcategoryproducts", (req, res) => {
  let sql = `INSERT INTO categoryproducts (products_id, category_id) values
(1,1), (2, 1),(3, 1),(4, 2), (5,2);`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Product added...");
  });
});

// Crea un endpoint para actualizar un producto. 
app.put("/updateproducts/:id", (req, res) => {
  let newName = req.body.name;
  let newPrice = req.body.price;
  let sql = `UPDATE products SET name = '${newName}', price='${newPrice}' WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send("Name updated...");
  });
});

// Crea un endpoint para actualizar una categoría.
app.put("/updatecategory/:id", (req, res) => {
  let newName = req.body.name;
  let sql = `UPDATE category SET name = '${newName}' WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send("Name updated...");
  });
});

// Crea un endpoint que muestre todos los productos
app.get("/showproducts/", (req, res) => {
  let sql = `SELECT * FROM products`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

//Crea un endpoint que muestre todas las categorías
app.get("/showcategory/", (req, res) => {
  let sql = `SELECT * FROM category`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Crea un endpoint que muestra todos los productos con sus categorías.... try to add the product name
app.get("/showall/", (req, res) => {
  let sql = `SELECT * FROM categoryproducts INNER JOIN products
ON products.id = categoryproducts.products_id
INNER JOIN category
ON  categoryproducts.category_id = category.id`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

//Crea un endpoint donde puedas seleccionar un producto por id

app.get("/showall/byid/:id", (req, res) => {
  let sql = `SELECT * FROM products WHERE products.id= ${req.params.id};`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Crea un endpoint que muestre de forma descendente los productos.
app.get("/showall/des", (req, res) => {
  let sql = `SELECT * FROM products ORDER BY id DESC;`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Crea un endpoint donde puedas seleccionar una categoría por id
app.get("/showcategory/:id", (req, res) => {
  let sql = `SELECT * FROM category 
WHERE category.id= ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Crea un endpoint donde puedas buscar un producto por su nombre ....not finished
app.get("/searchproduct/:name", (req, res) => {
  let sql = `SELECT * FROM products WHERE products.name = '${req.params.name}'`;
  console.log(sql);
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});


// Crea un endpoint donde puedas eliminar un producto por su id


app.delete("/delete/:id", (req, res) => {
  let sql = `DELETE FROM products WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send("Post deleted");
  });
});


app.listen(port, () => console.log(`Server running in the port ${port}`));
