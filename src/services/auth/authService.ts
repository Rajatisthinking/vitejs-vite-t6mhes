import { LoginCredentials, AuthResponse } from '../../types/auth';
import { MOCK_USERS } from '../../config/auth';
import { validatePassword } from './passwordService';
import { validateLoginCredentials } from './validators';
import { generateToken } from './tokenService';
import { AuthenticationError } from './errors';

export async function authenticateUser(credentials: LoginCredentials): Promise<AuthResponse> {
  try {
    // Validate credentials format
    validateLoginCredentials(credentials);

    // Find user and normalize email for case-insensitive comparison
    const user = MOCK_USERS.find(u => u.email.toLowerCase() === credentials.email.toLowerCase());

    if (!user) {
      throw new AuthenticationError('Invalid email or password');
    }

    // Validate password
    const isValidPassword = await validatePassword(credentials.password, user.password);

    if (!isValidPassword) {
      throw new AuthenticationError('Invalid email or password');
    }

    // Generate authentication token
    const { password, ...userWithoutPassword } = user;
    const token = generateToken(user.id);

    return {
      user: userWithoutPassword,
      token
    };
  } catch (error) {
    if (error instanceof AuthenticationError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new AuthenticationError(error.message);
    }
    throw new AuthenticationError('Authentication failed');
  }
}

// Re-export token validation
export { validateToken } from './tokenService';