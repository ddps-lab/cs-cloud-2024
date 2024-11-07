var serverless = require("serverless-http");

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var payload = require("./utils/payload-util");

var indexRouter = require("./routes/index");

var handler = express();

handler.use(logger("dev"));
handler.use(express.json());
handler.use(express.urlencoded({ extended: true }));
handler.use(cookieParser());

handler.use("/", indexRouter);

// error handler
handler.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.handler.get("env") === "development" ? err : {};

	// render the error page
	const status = err.status || 500;
	const code = err.code || -1;
	res.status(status);
	res.json(payload.error(status, code, err.message));
});

module.exports.handler = serverless(handler);

("use strict");
