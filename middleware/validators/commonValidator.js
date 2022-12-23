const joi = require("joi");
const HttpStatusCode = require("http-status-codes");

class CommonValidator {
  constructor() {}

  static async limitAndOffset(req, res, next) {
    try {
      await joi
        .object({
          limit: joi.number(),
          offset: joi.number(),
        })
        .with("offset", "limit")
        .validateAsync(req.query);
      next();
    } catch (err) {
      res.status(HttpStatusCode.EXPECTATION_FAILED).send(err.message);
    }
  }

  static async bodyId(req, res, next) {
    try {
      await joi
        .object({
          id: joi.number().required(),
        })
        .validateAsync(req.body);
      next();
    } catch (err) {
      res.status(HttpStatusCode.EXPECTATION_FAILED).send(err.message);
    }
  }

  static async paramId(req, res, next) {
    try {
      await joi
        .object({
          id: joi.number().min(1).required(),
        })
        .validateAsync({ id: parseInt(req.params.id) });
      next();
    } catch (err) {
      res.status(HttpStatusCode.EXPECTATION_FAILED).send(err.message);
    }
  }
}

module.exports = CommonValidator;
