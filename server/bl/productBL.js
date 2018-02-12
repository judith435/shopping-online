const dal = require('..//dal/dal');
const parmObject = require('..//dal/spParm');
const model = require('../models/productModel');

function addProduct(product, callback) { 

    // console.log('>>> productBL: ' + JSON.stringify(product));  

    const spParms = []; 
    
    spParms.push(new parmObject.spParm(product.name, true));
    spParms.push(new parmObject.spParm(product.category, false));
    spParms.push(new parmObject.spParm(product.price, false));

    // console.log('!!! in bl  spParms: ' + JSON.stringify(spParms));
    dal.executeQuery('shopping', 'Xinsert_product', spParms, function(err, rows) {
        if (err) {
            callback('called by productBL.addProduct => ' + err);
        }
        else {
            rows[0].forEach(function (row) {
                // console.log('!!! in bl  spParms:  new_product_id: ' + row.new_product_id);
                 callback(null, row.new_product_id);
            });
        }
    });
}



module.exports.product = {
  //  getProducts: getProducts,
  //  checkDuplicateProduct: checkDuplicateProduct,
  addProduct: addProduct

}
