const { resolve } = require('path');
const Nodeigniter = require('./../dist/module');
const ni = new Nodeigniter.Instance; 

const config = {
    port: 80,
    paths: {
        views: resolve('./app/views'),
        models: resolve('./app/models'),
        controllers: resolve('./app/controllers'),
        static: resolve('./static'),
    },
    reportRequests: true,
    environment: "DEVELOPMENT",
}

const routes = {
    '/': 'MainController'
}

ni.configure(config);
ni.registerRoutes(routes);
ni.launch();