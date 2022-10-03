import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({
      message: 'Token is missing',
    });
  }

  const [, token] = authToken.split(' ');

  try {
    verify(token, '909f521c-216d-43c7-8f5a-ae6c359b573e');

    return next();
  } catch (err) {
    return response.status(401).json({
      message: 'Token invalid'
    });
  }

}