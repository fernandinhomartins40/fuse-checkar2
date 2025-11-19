/**
 * Tipos para autenticação
 */

import { Role } from '@prisma/client';

export interface LoginCredentials {
  email: string;
  senha: string;
}

export interface RegisterData {
  email: string;
  senha: string;
  nome: string;
  sobrenome: string;
  cpf: string;
  telefone: string;
  role?: Role;
}

export interface AuthResponse {
  success: boolean;
  user: UserPayload;
  token: string;
  refreshToken: string;
}

export interface UserPayload {
  id: number;
  email: string;
  role: Role;
  nome: string;
}

export interface TokenPayload {
  userId: number;
  email: string;
  role: Role;
  iat: number;
  exp: number;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface ChangePasswordRequest {
  senhaAtual: string;
  senhaNova: string;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface ResetPasswordConfirm {
  token: string;
  senhaNova: string;
}

export interface AuthenticatedRequest {
  user?: UserPayload;
}
