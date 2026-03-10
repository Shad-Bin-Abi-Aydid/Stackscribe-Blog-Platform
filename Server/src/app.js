"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var post_router_1 = require("./modules/posts/post.router");
var node_1 = require("better-auth/node");
var auth_1 = require("./lib/auth");
var app = (0, express_1.default)();
app.all('/api/auth/{*any}', (0, node_1.toNodeHandler)(auth_1.auth));
app.use(express_1.default.json());
// test routes
app.get("/", function (req, res) {
    res.send('Hello, world!!!!');
});
// Post route
app.use('/posts', post_router_1.postRouter);
exports.default = app;
