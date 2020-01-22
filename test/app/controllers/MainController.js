const { Controller } = require('./../../../dist/module');

class MainController extends Controller {
    index() {
        this.http.response.end();
    }
}

module.exports = MainController;