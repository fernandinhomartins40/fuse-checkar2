import { Role } from '@fuse-checkar2/shared';

/**
 * Extensão do Express Request para incluir informações do usuário autenticado
 */
declare global {
  namespace Express {
    /**
     * Payload do JWT decodificado
     */
    export interface JwtPayload {
      /**
       * ID do usuário
       */
      userId: number;

      /**
       * Email do usuário
       */
      email: string;

      /**
       * Role do usuário
       */
      role: Role;

      /**
       * ID do cliente (se role === CLIENTE)
       */
      clienteId?: number;

      /**
       * Timestamp de emissão
       */
      iat?: number;

      /**
       * Timestamp de expiração
       */
      exp?: number;
    }

    /**
     * Extensão do Request para incluir o usuário autenticado
     */
    export interface Request {
      /**
       * Informações do usuário autenticado (preenchido pelo middleware authenticate)
       */
      user?: JwtPayload;
    }
  }
}

export {};
