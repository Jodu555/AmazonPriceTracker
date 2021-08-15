function validateProduct(product) {
    const validate = product.amazon_link && product.amazon_link.trim() !== '';
    return {
        success: validate,
        message: 'Missing: amazon_link'
    }
}

module.exports = {
    validateProduct,
}