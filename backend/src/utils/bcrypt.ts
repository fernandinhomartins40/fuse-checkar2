/**
 * Utilitários para hash de senha com bcrypt
 */

import bcrypt from 'bcryptjs';
import env from '@config/env';

/**
 * Gera hash de uma senha
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, env.BCRYPT_ROUNDS);
}

/**
 * Compara uma senha com um hash
 */
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
