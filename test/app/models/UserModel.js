const { Model } = require('./../../../dist/module');

class UserModel extends Model {
    modelMethod(something) {
        console.log(something);
    }
}

module.exports = UserModel;