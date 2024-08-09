const mongoose = require('mongoose');
const customerSchema = require('../schema/Customer');

const customerModel = mongoose.model('banking_customer',customerSchema);
module.exports = customerModel;