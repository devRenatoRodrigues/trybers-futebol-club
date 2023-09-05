import * as jwt from 'jsonwebtoken';

function barerExtract(token: string):string {
  const auth = token.split(' ')[1];
  return auth;
}

const secret = process.env.JWT_SECRET || 'jwt_secret';

function sign(payload: jwt.JwtPayload): string {
  const token = jwt.sign(payload, secret);
  return token;
}

function verify(token: string): jwt.JwtPayload {
  const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
  return decoded;
}

export default {
  sign,
  verify,
  barerExtract,
};
