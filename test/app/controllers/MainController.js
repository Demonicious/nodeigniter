const { Controller } = require("./../../../dist/module");

class MainController extends Controller {
  index() {
    let data = {
      pageTitle: "A Simple Form."
    };

    if (this.input.post.full_name) {
      this.load.model("UserModel");
      this.model.UserModel.login();
    }

    this.load.view("index", data);
  }
}

module.exports = MainController;
