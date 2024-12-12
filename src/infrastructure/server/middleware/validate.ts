import type { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import Joi from "joi";
import ApiError from "../../../utils/ApiError";
import pick from "../../../utils/pick";

const validate = (schema: object) => (req: Request, res: Response, next: NextFunction) => {
  const validSchema = pick(schema, ["params", "query", "body", "headers"]);
  const obj = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: "key" }, abortEarly: false })
    .validate(obj);
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(", ");
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
  }
  Object.assign(req, value);
  return next();
};

export default validate;
