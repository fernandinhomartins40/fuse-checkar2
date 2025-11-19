import jwt from 'jsonwebtoken';
import env from '../config/env';

export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
  [key: string]: any;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

/**
 * Generate a JWT access token
 *
 * @param payload - Data to encode in the token
 * @param expiresIn - Token expiration time (default from env)
 * @returns Signed JWT token
 *
 * @example
 * ```ts
 * const token = generateAccessToken({
 *   userId: '123',
 *   email: 'user@example.com',
 *   role: 'USER'
 * });
 * ```
 */
export function generateAccessToken(
  payload: JwtPayload,
  expiresIn: string = env.jwtExpiresIn
): string {
  return jwt.sign(payload, env.jwtSecret, {
    expiresIn,
    issuer: env.appName,
  });
}

/**
 * Generate a JWT refresh token
 *
 * @param payload - Data to encode in the token
 * @param expiresIn - Token expiration time (default from env)
 * @returns Signed JWT refresh token
 *
 * @example
 * ```ts
 * const refreshToken = generateRefreshToken({
 *   userId: '123',
 *   email: 'user@example.com',
 *   role: 'USER'
 * });
 * ```
 */
export function generateRefreshToken(
  payload: JwtPayload,
  expiresIn: string = env.jwtRefreshExpiresIn
): string {
  return jwt.sign(payload, env.jwtRefreshSecret, {
    expiresIn,
    issuer: env.appName,
  });
}

/**
 * Generate both access and refresh tokens
 *
 * @param payload - Data to encode in the tokens
 * @returns Object containing both access and refresh tokens
 *
 * @example
 * ```ts
 * const { accessToken, refreshToken } = generateTokenPair({
 *   userId: '123',
 *   email: 'user@example.com',
 *   role: 'USER'
 * });
 * ```
 */
export function generateTokenPair(payload: JwtPayload): TokenPair {
  return {
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload),
  };
}

/**
 * Verify and decode a JWT access token
 *
 * @param token - JWT token to verify
 * @returns Decoded token payload
 * @throws Error if token is invalid or expired
 *
 * @example
 * ```ts
 * try {
 *   const payload = verifyAccessToken(token);
 *   console.log(payload.userId);
 * } catch (error) {
 *   console.error('Invalid token');
 * }
 * ```
 */
export function verifyAccessToken(token: string): JwtPayload {
  return jwt.verify(token, env.jwtSecret, {
    issuer: env.appName,
  }) as JwtPayload;
}

/**
 * Verify and decode a JWT refresh token
 *
 * @param token - JWT refresh token to verify
 * @returns Decoded token payload
 * @throws Error if token is invalid or expired
 *
 * @example
 * ```ts
 * try {
 *   const payload = verifyRefreshToken(refreshToken);
 *   console.log(payload.userId);
 * } catch (error) {
 *   console.error('Invalid refresh token');
 * }
 * ```
 */
export function verifyRefreshToken(token: string): JwtPayload {
  return jwt.verify(token, env.jwtRefreshSecret, {
    issuer: env.appName,
  }) as JwtPayload;
}

/**
 * Decode a JWT token without verifying its signature
 * Useful for debugging or extracting info from expired tokens
 *
 * @param token - JWT token to decode
 * @returns Decoded token payload or null if invalid
 *
 * @example
 * ```ts
 * const payload = decodeToken(token);
 * if (payload) {
 *   console.log(payload.exp); // Check expiration
 * }
 * ```
 */
export function decodeToken(token: string): JwtPayload | null {
  return jwt.decode(token) as JwtPayload | null;
}

/**
 * Check if a JWT token is expired
 *
 * @param token - JWT token to check
 * @returns True if token is expired, false otherwise
 *
 * @example
 * ```ts
 * if (isTokenExpired(token)) {
 *   console.log('Token has expired');
 * }
 * ```
 */
export function isTokenExpired(token: string): boolean {
  try {
    const decoded = decodeToken(token);
    if (!decoded || !decoded.exp) {
      return true;
    }
    return Date.now() >= decoded.exp * 1000;
  } catch {
    return true;
  }
}
