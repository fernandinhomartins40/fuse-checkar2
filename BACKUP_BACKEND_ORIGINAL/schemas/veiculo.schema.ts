/**
 * Schemas de validação para Veículo
 */

import { z } from 'zod';
import { StatusVeiculo } from '@prisma/client';
import { placaSchema } from './common.schema';

export const createVeiculoSchema = z.object({
  clienteId: z.number().int().positive(),
  marca: z.string().min(2).max(50),
  modelo: z.string().min(2).max(100),
  ano: z.number().int().min(1900).max(new Date().getFullYear() + 1),
  anoModelo: z.number().int().min(1900).max(new Date().getFullYear() + 2).optional(),
  placa: placaSchema,
  cor: z.string().max(30).optional(),
  chassi: z.string().max(30).toUpperCase().optional(),
  renavam: z.string().max(20).optional(),
  motor: z.string().max(50).optional(),
  combustivel: z.enum(['GASOLINA', 'ETANOL', 'DIESEL', 'FLEX', 'GNV', 'ELETRICO', 'HIBRIDO']).optional(),
  cambio: z.enum(['MANUAL', 'AUTOMATICO', 'AUTOMATIZADO', 'CVT']).optional(),
  kmAtual: z.number().int().min(0).optional(),
  observacoes: z.string().max(1000).optional(),
});

export const updateVeiculoSchema = createVeiculoSchema
  .partial()
  .omit({
    clienteId: true,
    placa: true,
  })
  .extend({
    kmUltimaRevisao: z.number().int().min(0).optional(),
    status: z.nativeEnum(StatusVeiculo).optional(),
  });

export const veiculoFiltersSchema = z.object({
  clienteId: z.number().int().positive().optional(),
  marca: z.string().optional(),
  modelo: z.string().optional(),
  ano: z.number().int().optional(),
  placa: z.string().optional(),
  status: z.nativeEnum(StatusVeiculo).optional(),
  combustivel: z.string().optional(),
});

export type CreateVeiculoInput = z.infer<typeof createVeiculoSchema>;
export type UpdateVeiculoInput = z.infer<typeof updateVeiculoSchema>;
export type VeiculoFiltersInput = z.infer<typeof veiculoFiltersSchema>;
