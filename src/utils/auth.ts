import bcrypt from 'bcryptjs';

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function validatePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// For development/testing purposes only
export async function generateHashedPassword(password: string): Promise<void> {
  const hash = await hashPassword(password);
  console.log('Hashed password:', hash);
}