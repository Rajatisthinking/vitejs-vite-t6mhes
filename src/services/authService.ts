import { LoginCredentials, User, AuthResponse } from '../types/auth';
import { MOCK_USERS } from '../config/auth';
import { validatePassword } from '../utils/auth';

export class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

export async function authenticateUser(credentials: LoginCredentials): Promise<AuthResponse> {
  const user = MOCK_USERS.find(u => u.email.toLowerCase() === credentials.email.toLowerCase());

  if (!user) {
    throw new AuthenticationError('Invalid email or password');
  }

  const isValidPassword = await validatePassword(credentials.password, user.password);

  if (!isValidPassword) {
    throw new AuthenticationError('Invalid email or password');
  }

  const { password, ...userWithoutPassword } = user;
  const token = generateToken(user.id);

  return {
    user: userWithoutPassword,
    token
  };
}

function generateToken(userId: string): string {
  const payload = {
    userId,
    timestamp: Date.now(),
    expiresIn: '24h'
  };
  return btoa(JSON.stringify(payload));
}

export function validateToken(token: string): boolean {
  try {
    const decoded = JSON.parse(atob(token));
    const now = Date.now();
    const expirationTime = decoded.timestamp + 24 * 60 * 60 * 1000; // 24 hours
    return now < expirationTime;
  } catch {
    return false;
  }
}