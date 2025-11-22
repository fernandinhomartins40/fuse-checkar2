import bcrypt from 'bcryptjs';

/**
 * Number of salt rounds for bcrypt hashing
 * Higher values = more secure but slower
 */
const SALT_ROUNDS = 10;

/**
 * Hash a plain text password using bcrypt
 *
 * @param password - Plain text password to hash
 * @returns Promise resolving to hashed password
 *
 * @example
 * ```ts
 * const hashedPassword = await hashPassword('mySecretPassword');
 * ```
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Compare a plain text password with a hashed password
 *
 * @param password - Plain text password to compare
 * @param hashedPassword - Hashed password to compare against
 * @returns Promise resolving to true if passwords match, false otherwise
 *
 * @example
 * ```ts
 * const isValid = await comparePassword('myPassword', hashedPassword);
 * if (isValid) {
 *   console.log('Password is correct');
 * }
 * ```
 */
export async function comparePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

/**
 * Generate a random salt for bcrypt
 *
 * @param rounds - Number of salt rounds (default: 10)
 * @returns Promise resolving to generated salt
 */
export async function generateSalt(rounds: number = SALT_ROUNDS): Promise<string> {
  return bcrypt.genSalt(rounds);
}
