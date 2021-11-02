

exports.payment = (req,res) => {
    const{product, token} = req,body;
    console.log('PRODUCT ',product);
    console.log('PRICE ',product.price);
    const idempotencyKey = uuid();
}