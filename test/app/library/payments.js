const { Library } = require("./../../../dist/module");

class payments extends Library {
    someMethod() {
        this.ni.load.model('UserModel');
        this.ni.UserModel.modelMethod('Hello');
    }
}

module.exports = payments;