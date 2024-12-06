import { ValidationError } from './errors';
import { LoginCredentials } from '../../types/auth';

export function validateLoginCredentials(credentials: LoginCredentials): void {
  if (!credentials.email) {
    throw new ValidationError('Email is required');
  }

  if (!credentials.password) {
    throw new ValidationError('Password is required');
  }

  if (!isValidEmail(credentials.email)) {
    throw new ValidationError('Invalid email format');
  }

  if (!isValidPassword(credentials.password)) {
    throw new ValidationError('Invalid password format');
  }
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPassword(password: string): boolean {
  return password.length >= 6;
}