var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,
  user: "root",

  password: "password",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected");
});

function displayProducts() {
  connection.query("SELECT * FROM products", function(err, results) {
    for (var i = 0; i < results.length; i++) {
      console.log(`------------------------
    Product Name: ${results[i].product_name} | ID: ${results[i].item_id} | Price: ${results[i].price}`);
    }

    findProduct();
  });
}

displayProducts();

function findProduct() {
  inquirer
    .prompt([
      {
        name: "productId",
        type: "input",
        message: "What is the ID of the product you want to buy?"
      },

      {
        name: "quantity",
        type: "input",
        message: "How much of the product do you want?"
      }
    ])
    .then(function(answer) {
      connection.query(
        "SELECT * FROM products WHERE ?",
        [
          {
            item_id: answer.productId
          }
        ],
        function(err, results) {

          console.log(results[0].product_name);
         
        }
      );
    });
}
