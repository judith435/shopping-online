const dal = require('..//dal/dal');
const parmObject = require('..//dal/spParm');
const model = require('../models/productModel');

function addProduct(product, callback) { 

    console.log('>>> productBL: ' + JSON.stringify(product));  

    const spParms = []; 
    
    spParms.push(new parmObject.spParm(product.name, true));
    spParms.push(new parmObject.spParm(product.category, false));
    spParms.push(new parmObject.spParm(product.price, false));

    console.log('!!! in bl  spParms: ' + JSON.stringify(spParms));
    dal.executeQuery('shopping', 'insert_product', spParms, function(err, rows) {
        if (err) {
            callback(err);
        }
        callback(null, 'product updated successfully');
    });
}



module.exports.product = {
  //  getProducts: getProducts,
  //  checkDuplicateProduct: checkDuplicateProduct,
  addProduct: addProduct

}
