const Product = require('../models/product');

exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.product_create = function(req, res, next){
    let product = new Product(
        {
            sku: req.body.sku,
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            id: req.body.id,
            quantity: req.body.quantity,
        }
    );

    product.save(function(err){
        if (err){
            return next(err);
        }
        res.send('Product created successfully')
    })
};

exports.product_details = function(req, res){
    Product.findById(req.params.id, function(err, product){
        if (err) return next(err);
        res.send(product);
    })
}

exports.product_update = function (req, res) {
    Product.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
        if (err) return next(err);
        res.send('Product udpated.');
    });
};

exports.product_delete = function (req, res) {
    Product.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};