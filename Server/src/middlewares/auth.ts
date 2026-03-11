import { NextFunction, Request, Response } from "express";
import { auth as betterAuth } from "../lib/auth";

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

// Declare a Global variable
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: String;
        email: String;
        name: String;
        role: String;
        emailVerified: boolean;
      };
    }
  }
}

// Auth Middleware
const auth = (...roles: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // get user session
    const session = await betterAuth.api.getSession({
      headers: req.headers as any,
    });

    try {
      // if there have no session
      if (!session) {
        return res.status(401).json({
          success: false,
          message: "You are not authorized",
        });
      }

      // if email is not verified
      if (session.user.emailVerified != true) {
        return res.status(403).json({
          success: false,
          message: "Please verify your email first!",
        });
      }

      req.user = {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        role: session.user.role as string,
        emailVerified: session.user.emailVerified,
      };

      // if the session user role is not match with the roles
      if (roles.length && !roles.includes(req.user.role as UserRole)) {
        return res.status(403).json({
          success: false,
          message: "You don't have permission to access the resources",
        });
      }
      next();
    } catch (err) {next(err)}
  };
};

export default auth;
