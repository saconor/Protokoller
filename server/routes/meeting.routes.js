/* eslint-disable @typescript-eslint/no-var-requires */
const { authJwt } = require('../middleware');
const controller = require('../controllers/meeting.controller.js');
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
    next();
  });
  app.post('/meeting/generate',[authJwt.verifyToken], controller.generateXml);
};