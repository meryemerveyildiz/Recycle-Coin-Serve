const { routerAuthorization } = require("../utils");
const HttpStatusCode = require("http-status-codes");

class Authorization {
  constructor() {}

  static async authControl(req, res, next) {
    try {
      const auth =
        routerAuthorization[req.route.path.split("/")[1].replace("-", "_")][
          req.method
        ].Authorize;
      if (!auth || auth.indexOf(req.decode.UserTypeName) != -1) next();
      else
        res
          .status(HttpStatusCode.UNAUTHORIZED)
          .send("Unauthorized transaction.");
    } catch (error) {
      res.status(error.status || 500).send(error.message);
    }
  }
}

module.exports = Authorization;
