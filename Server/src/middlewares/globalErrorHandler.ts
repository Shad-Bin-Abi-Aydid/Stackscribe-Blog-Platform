import { NextFunction, Request, Response } from "express";
import { Prisma } from "../../generated/prisma/client";

function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  let statusCode = 500;
  let errorMessage = "Internal Server Error";
  let errorDetails = err;

  // PrismaClientValidationError
  if (err instanceof Prisma.PrismaClientValidationError) {
    ((statusCode = 400),
      (errorMessage = "You provide incorrect field type or missing fields!"));
  }
  // PrismaClientKnownRequestError
  else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2025") {
      ((statusCode = 400),
        (errorMessage =
          "An operation failed because it depends on one or more records that were required but not found."));
    } else if (err.code === "P2002") {
      ((statusCode = 400), (errorMessage = "Duplicate Key error"));
    } else if (err.code === "P2003") {
      ((statusCode = 400), (errorMessage = "Foreign key constraint failed"));
    }
  }

  // PrismaClientUnKnownRequestError
  else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    ((statusCode = 500),
      (errorMessage = "Error occurred during query execution"));
  }

  // PrismaClientRustPanicError
  else if (err instanceof Prisma.PrismaClientRustPanicError) {
    statusCode = 500,
    errorMessage =
      "A critical database engine error occurred. Please try again later.";
  }

  // PrismaClientInitializationError
  else if(err instanceof Prisma.PrismaClientInitializationError){
    statusCode = 500,
    errorMessage = "Failed to initialize database connection. Please try again later.";
  }

  //there have more lots of error. need to check in the prisma doc for implementing those error


  res.status(statusCode);
  res.json({
    message: errorMessage,
    error: err,
  });
}

export default errorHandler;
