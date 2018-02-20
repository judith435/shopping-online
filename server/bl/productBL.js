const dal = require('..//dal/dal');
const parmObject = require('..//dal/spParm');
const model = require('../models/productModel');

function getProducts(callback) {
    dal.executeQuery('shopping', 'get_products', '',function(err, rows) {
        if (err) {
            callback('called by productBL.getProducts => ' + err);
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

    // console.log('>>> productBL: ' + JSON.stringify(product));  

    const spParms = []; 
    if (activity === 'updateProduct') {
        spParms.push(new parmObject.spParm(product.id, false));
    }
    spParms.push(new parmObject.spParm(product.name, true));
    spParms.push(new parmObject.spParm(product.category, false));
    spParms.push(new parmObject.spParm(product.price, false));

    // console.log('!!! in bl  spParms: ' + JSON.stringify(spParms));
    let spName = activity === 'addProduct' ? 'insert_product' : 'update_product';
    dal.executeQuery('shopping', spName, spParms, function(err, rows) {
        if (err) {
            callback('called by productBL.addUpdateProduct => activity: ' + activity + ' ' + err);
        }
        else {
            if (activity === 'addProduct') {
                callback(null, rows[0][0].new_product_id);
            }
            else {
                callback(null, 0);
            }
        }
    });
}



module.exports.product = {
   getProducts: getProducts,
  //  checkDuplicateProduct: checkDuplicateProduct,
  addUpdateProduct: addUpdateProduct

}
