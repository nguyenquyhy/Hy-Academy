﻿const { createProxyMiddleware } = require('http-proxy-middleware');

const context = [
    "/graphql",
];

module.exports = function (app) {
    const appProxy = createProxyMiddleware(context, {
        target: 'https://localhost:7219',
        secure: false
    });

    app.use(appProxy);
};
