const NodeIgniter = require('./../dist/module');

const config = require('./app/config/config');
const routes = require('./app/config/routes');

const app = new NodeIgniter.Instance;
app.configure(config);
app.registerRoutes(routes);
app.launch();