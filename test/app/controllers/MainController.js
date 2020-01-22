const { Controller } = require('./../../../dist/module');

class MainController extends Controller {
    index() {
        let data = {
            pageTitle: 'A Simple Form.',
        }

        if('full_name' in this.input.post) {
            console.log('yes');
        }

        this.load.view('index', data);
    }
}

module.exports = MainController;