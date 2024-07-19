import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

enum Role {
  ADMIN = "ADMIN",
  CUSTOMER = "CUSTOMER",
  SELLER = "SELLER",
}

type TokenPayload = { userId: string; role: Role };

type MiddlewareRequest = Request<
  {},
  {},
  { user?: TokenPayload; token: string }
>;

function getTokenAuthorizationHeader(req: MiddlewareRequest) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return undefined;
  const token = authHeader.split(" ");

  if (token.length === 2 && token[0] === "Bearer") {
    return token[1];
  }

  return undefined;
}

/**
 * Checks if the user has one of the required roles
 *
 * @param requiredRoles The list of roles that are allowed to access the resource
 * @returns A middleware function that checks if the user has one of the required roles
 */
const checkRole = (requiredRoles: Role[]) => {
  return (req: MiddlewareRequest, res: Response, next: NextFunction) => {
    // Extract JWT token from the authorization header
    const token = getTokenAuthorizationHeader(req);

    if (!token) {
      return res.status(401).json({
        errors: [{ message: "Authorization token not provided" }],
      });
    }

    try {
      // Verify JWT token and decode payload
      const decodedToken = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as TokenPayload;

      // Fetch user's role from the decoded token
      const userRole = decodedToken.role;

      // Check if the user's role matches any of the required roles
      if (!requiredRoles.includes(userRole)) {
        return res.status(403).json({
          errors: [
            {
              message: `Unauthorized: User must be any of the following: ${requiredRoles.join(
                ", "
              )}`,
            },
          ],
        });
      }

      // Attach userId and role to the request object for further processing
      req.body.user = { userId: decodedToken.userId, role: userRole };
      req.body.token = token;

      next(); // User has one of the required roles, proceed to the next middleware or route handler
    } catch (error) {
      console.error("Authorization failed:", error);
      res.status(401).json({
        errors: [{ message: "Invalid token" }],
      });
    }
  };
};

export { checkRole, Role, TokenPayload };
