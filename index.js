const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());
const mysql = require("mysql2")
const db = require("./config/database.js");
app.use("/products", require("./routes/products"));
app.use("/categories", require("./routes/categories"));
app.use("/categoriesproducts", require("./routes/categoriesproducts"));
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "hello887",
//   database: "expressDB",
// });

// db.connect();
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



// Crea un endpoint para actualizar una categoría.


// Crea un endpoint que muestre todos los productos


//Crea un endpoint que muestre todas las categorías


// Crea un endpoint que muestra todos los productos con sus categorías.... try to add the product name


//Crea un endpoint donde puedas seleccionar un producto por id



// Crea un endpoint que muestre de forma descendente los productos.

// Crea un endpoint donde puedas seleccionar una categoría por id


// Crea un endpoint donde puedas buscar un producto por su nombre 


// Crea un endpoint donde puedas eliminar un producto por su id





app.listen(port, () => console.log(`Server running in the port ${port}`));
