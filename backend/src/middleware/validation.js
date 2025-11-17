import logger from '../config/logger.js';

/**
 * Middleware para validar dados usando Joi schema
 * @param {Object} schema - Schema Joi para validação
 * @param {string} property - Propriedade da requisição para validar (body, query, params)
 */
export const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false, // Retornar todos os erros, não apenas o primeiro
      stripUnknown: true, // Remover propriedades desconhecidas
    });

    if (error) {
      const errors = error.details.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message,
      }));

      logger.warn('Erro de validação:', errors);

      return res.status(400).json({
        success: false,
        error: 'Dados inválidos',
        details: errors,
      });
    }

    // Substituir req[property] com os dados validados e sanitizados
    req[property] = value;

    next();
  };
};

/**
 * Middleware para validar múltiplas propriedades da requisição
 * @param {Object} schemas - Objeto com schemas para cada propriedade { body: schema, query: schema, ... }
 */
export const validateMultiple = (schemas) => {
  return (req, res, next) => {
    const allErrors = [];

    for (const [property, schema] of Object.entries(schemas)) {
      const { error, value } = schema.validate(req[property], {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        const errors = error.details.map((detail) => ({
          property,
          field: detail.path.join('.'),
          message: detail.message,
        }));
        allErrors.push(...errors);
      } else {
        req[property] = value;
      }
    }

    if (allErrors.length > 0) {
      logger.warn('Erros de validação:', allErrors);

      return res.status(400).json({
        success: false,
        error: 'Dados inválidos',
        details: allErrors,
      });
    }

    next();
  };
};

export default {
  validate,
  validateMultiple,
};
