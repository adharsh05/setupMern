"use strict";

var _express = _interopRequireDefault(require("express"));

require("dotenv/config");

var _cors = _interopRequireDefault(require("cors"));

var _v = _interopRequireDefault(require("uuid/v4"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _worker_threads = require("worker_threads");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

console.log(process.env.MY_SECRET);
var users = {
  1: {
    id: '1',
    username: 'Robin Wieruch'
  },
  2: {
    id: '2',
    username: 'Dave Davids'
  }
};
var messages = {
  1: {
    id: '1',
    text: 'Hello World',
    userId: '1'
  },
  2: {
    id: '2',
    text: 'By World',
    userId: '2'
  }
};
var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use((0, _cors["default"])());
app.get('/users', function (req, res) {
  console.log('req-res', req, res);
  return res.send(Object.values(users));
});
app.post('/message', function (req, res) {
  var id = (0, _v["default"])();
  var message = {
    id: id
  };
  messages[id] = message;
  console.log('req-res', req, res);
  return res.send(message);
});
app["delete"]('users/:userId', function (req, res) {
  console.log('req-res', req, res);
  return res.send("welcome to req-res".concat(req, ", ").concat(res));
});
app.put('/users/:userId', function (req, res) {
  console.log('req-res', req, res);
  return res.send("welcome to req-res".concat(req, ", ").concat(res));
});
app.listen(9000, function () {
  return console.log('port listening at', process.env.MY_SECRET);
});