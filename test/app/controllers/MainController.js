const { Controller } = require('./../../../dist/module');

class MainController extends Controller {
    index() {
        let data = {
            pageTitle: 'A Simple Form.',
        }
        this.load.library('payments');
        this.library.payments.someMethod();
        this.load.view('index', data);
    }
}

module.exports = MainController;