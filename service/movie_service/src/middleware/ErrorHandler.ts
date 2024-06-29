import { Request, Response, NextFunction } from "express";
import { AppError } from "@/exception/AppError";

// ErrorHandler.js
const ErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Middleware Error Handling");
  const errStatus = err?.httpCode || 500;
  const errMsg = err.message || "Something went wrong";
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
  });
};

export default ErrorHandler;
