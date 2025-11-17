import jwt from 'jsonwebtoken';
import logger from './logger.js';

// Chaves secretas (em produção, SEMPRE usar variáveis de ambiente)
const JWT_SECRET = process.env.JWT_SECRET || 'sua-chave-secreta-muito-forte-aqui-change-me';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'sua-refresh-key-secreta-muito-forte-change-me';

// Tempos de expiração
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '7d';

/**
 * Gera um token JWT de acesso
 * @param {Object} payload - Dados do usuário (id, email, role)
 * @returns {string} Token JWT
 */
export const generateAccessToken = (payload) => {
  try {
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
  } catch (error) {
    logger.error('Erro ao gerar access token:', error);
    throw error;
  }
};

/**
 * Gera um refresh token JWT
 * @param {Object} payload - Dados do usuário (id)
 * @returns {string} Refresh token JWT
 */
export const generateRefreshToken = (payload) => {
  try {
    return jwt.sign(
      { id: payload.id }, // Refresh token tem apenas o ID
      JWT_REFRESH_SECRET,
      { expiresIn: JWT_REFRESH_EXPIRES_IN }
    );
  } catch (error) {
    logger.error('Erro ao gerar refresh token:', error);
    throw error;
  }
};

/**
 * Verifica e decodifica um token JWT de acesso
 * @param {string} token - Token para verificar
 * @returns {Object} Payload decodificado
 * @throws {Error} Se o token for inválido
 */
export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    logger.error('Erro ao verificar access token:', error.message);
    throw error;
  }
};

/**
 * Verifica e decodifica um refresh token JWT
 * @param {string} token - Refresh token para verificar
 * @returns {Object} Payload decodificado
 * @throws {Error} Se o token for inválido
 */
export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET);
  } catch (error) {
    logger.error('Erro ao verificar refresh token:', error.message);
    throw error;
  }
};

/**
 * Gera ambos os tokens (access e refresh)
 * @param {Object} user - Objeto do usuário
 * @returns {Object} { accessToken, refreshToken }
 */
export const generateTokens = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  return {
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken({ id: user.id }),
  };
};

export default {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  generateTokens,
};
