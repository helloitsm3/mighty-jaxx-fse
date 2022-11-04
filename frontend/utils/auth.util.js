import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";

export function decodeJWT(token) {
  return jwt_decode(token);
}

export function isJWTValid(token) {
  if (!token) return false;

  return jwt.verify(
    token,
    process.env.NEXT_PUBLIC_TOKEN_SECRET,
    (err, user) => {
      if (err) return false;
      return user;
    }
  );
}
