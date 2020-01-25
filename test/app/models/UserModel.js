const { Model } = require("./../../../dist/module");

class UserModel extends Model {
  login() {
    this.session.set_userdata({
      name: "Mudassar Islam",
      age: "17"
    });
    this.load.config("sendgrid");
    console.log(this.config.sendgrid);
    return;
  }
}

module.exports = UserModel;
