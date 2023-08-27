import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'secret';

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
};
