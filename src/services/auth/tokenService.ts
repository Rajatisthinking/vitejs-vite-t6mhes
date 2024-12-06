import { TokenError } from './errors';

export function generateToken(userId: string): string {
  try {
    const payload = {
      userId,
      timestamp: Date.now(),
      expiresIn: '24h'
    };
    return btoa(JSON.stringify(payload));
  } catch (error) {
    throw new TokenError('Failed to generate authentication token');
  }
}

export function validateToken(token: string): boolean {
  try {
    const decoded = JSON.parse(atob(token));
    const now = Date.now();
    const expirationTime = decoded.timestamp + 24 * 60 * 60 * 1000; // 24 hours
    return now < expirationTime;
  } catch {
    throw new TokenError('Invalid authentication token');
  }
}