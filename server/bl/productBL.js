//all string mysql string parameters (parmObject.SPparm("parm name", true)) have any ' escaped
//reason mysql fails if string contains unescaped apostrophe

const dal = require("..//dal/dal");
const parmObject = require("..//dal/SPparm");
const model = require("../models/productModel");

function getProducts(callback) {
    dal.executeQuery("shopping", "get_products", "",function(err, rows) {
        if (err) {
            callback("called by productBL.getProducts => " + err);
        }
        else {
            const productsArray = [];
            rows[0].forEach(function (row) {
                productsArray.push(new model.Product(row));
            });
            callback(null, productsArray);
        }
    });
}


function addUpdateProduct(activity, product, callback) { 

    const spParms = []; 
    if (activity === "updateProduct") {
        spParms.push(new parmObject.SPparm(product.id, false));
    }
    let productName = product.name.replace("'", "\\'");
    spParms.push(new parmObject.SPparm(productName, true));
    spParms.push(new parmObject.SPparm(product.category, false));
    spParms.push(new parmObject.SPparm(product.price, false));

    let spName = activity === "addProduct" ? "insert_product" : "update_product";
    dal.executeQuery("shopping", spName, spParms, function(err, rows) {
        if (err) {
            callback("called by productBL.addUpdateProduct => activity: " + activity + " " + err);
        }
        else { //insert/update successful
            if (activity === "addProduct") {
                callback(null, rows[0][0].new_product_id);
            }
            else { //update product
                callback(null, 0);
            }
        }
    });
}

module.exports.getProducts = getProducts;
module.exports.addUpdateProduct = addUpdateProduct;