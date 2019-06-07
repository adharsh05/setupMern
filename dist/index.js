"use strict";

var _express = _interopRequireDefault(require("express"));

require("dotenv/config");

var _cors = _interopRequireDefault(require("cors"));

var _v = _interopRequireDefault(require("uuid/v4"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

// import { parentPort } from 'worker_threads';
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
app.use(function (req, res, next) {
  req.me = users[1];
  console.log('re_me', req.me);
  next();
});
app.get('/users', function (req, res) {
  console.log('req-res', req, res);
  return res.send(Object.values(users));
});
app.post('/message', function (req, res) {
  var id = (0, _v["default"])();
  var message = {
    id: id,
    usserId: req.me.id
  };
  messages[id] = message;
  console.log('req-res', messages);
  return res.send(message);
});
app.get('/session', function (req, res) {
  return res.send(users[req.me.id]);
});
app.get('/messages', function (req, res) {
  return res.send(Object.values(messages));
});
app["delete"]('/messages/:msgId', function (req, res) {
  console.log('req_params____', messages);

  var _messages = messages,
      _req$params$msgId = req.params.msgId,
      message = _messages[_req$params$msgId],
      otherMessages = _objectWithoutProperties(_messages, [_req$params$msgId].map(_toPropertyKey));

  console.log('____otherMessages____', otherMessages);
  messages = otherMessages;
  return res.json({
    message: message,
    messages: messages
  });
});
app.put('/users/:userId', function (req, res) {
  console.log('req-res', req, res);
  return res.send("welcome to req-res".concat(req, ", ").concat(res));
});
app.listen(9000, function () {
  return console.log('port listening at', process.env.MY_SECRET);
});