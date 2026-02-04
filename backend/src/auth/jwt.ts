import jwt from 'jsonwebtoken';

export interface AuthTokenPayload {
  id: number;
  email: string;
  displayName: string;
  isStaff: boolean;
}

const JWT_SECRET = process.env.JWT_SECRET ?? 'chat-chat-secret';
const JWT_EXPIRES_IN = '2h';

export function signAuthToken(payload: AuthTokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyAuthToken(token: string): AuthTokenPayload {
  return jwt.verify(token, JWT_SECRET) as AuthTokenPayload;
}
