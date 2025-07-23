// import jwt, { JwtPayload, SignOptions }  from 'jsonwebtoken';
// export const generateToken = (payload : JwtPayload, secret : string, expireIn : string) => {
//     const token = jwt.sign(payload, secret, {
//         expireIn
//     } as SignOptions)
//     return token
// }


// export const verifyToken = ( token: string, secret : string) => {
//     const varifiedToken = jwt.verify(token,secret)
//     return varifiedToken
// }


import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

export const generateToken = (
  payload: JwtPayload,
  secret: string,
  expiresIn: string
): string => {
  return jwt.sign(payload, secret, {
    expiresIn,
  } as SignOptions);
};

export const verifyToken = (token: string, secret: string): JwtPayload | string => {
  return jwt.verify(token, secret);
};
