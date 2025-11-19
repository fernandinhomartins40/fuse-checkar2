
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useClientesData } from '../../hooks/useClientesData';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const veiculoSchema = z.object({
  clienteId: z.string().min(1, 'Selecione um cliente'),
  modelo: z.string().min(2, 'Modelo deve ter pelo menos 2 caracteres'),
  placa: z.string()
    .min(7, 'Placa deve ter 7 caracteres')
    .max(8, 'Placa deve ter no máximo 8 caracteres')
    .regex(/^[A-Z]{3}-?\d{4}$|^[A-Z]{3}\d[A-Z]\d{2}$/, 'Formato de placa inválido'),
  ano: z.number()
    .min(1900, 'Ano deve ser maior que 1900')
    .max(new Date().getFullYear() + 1, 'Ano não pode ser maior que o próximo ano'),
  cor: z.string().min(2, 'Cor deve ter pelo menos 2 caracteres'),
});

export type VeiculoFormValues = z.infer<typeof veiculoSchema>;

interface VeiculoFormProps {
  onSubmit: (data: VeiculoFormValues) => void;
  onCancel?: () => void;
  initialData?: Partial<VeiculoFormValues>;
  isEditing?: boolean;
}

export const VeiculoForm: React.FC<VeiculoFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  isEditing = false,
}) => {
  const { clientes } = useClientesData();
  
  const form = useForm<VeiculoFormValues>({
    resolver: zodResolver(veiculoSchema),
    defaultValues: {
      clienteId: initialData?.clienteId || '',
      modelo: initialData?.modelo || '',
      placa: initialData?.placa || '',
      ano: initialData?.ano || new Date().getFullYear(),
      cor: initialData?.cor || '',
    },
  });

  const clientesAtivos = clientes.filter(cliente => cliente.ativo);

  const handleSubmit = (data: VeiculoFormValues) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Cliente */}
          <FormField
            control={form.control}
            name="clienteId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cliente *</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                  disabled={isEditing}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um cliente" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {clientesAtivos.map((cliente) => (
                      <SelectItem key={cliente.id} value={cliente.id}>
                        {cliente.nome} - {cliente.cpf}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Modelo */}
          <FormField
            control={form.control}
            name="modelo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Modelo *</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Ex: Honda Civic, Jeep Compass" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Placa */}
          <FormField
            control={form.control}
            name="placa"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Placa *</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="ABC-1234 ou ABC1D23" 
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value.toUpperCase();
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Ano */}
          <FormField
            control={form.control}
            name="ano"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ano *</FormLabel>
                <FormControl>
                  <Input 
                    type="number"
                    placeholder="2020"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Cor */}
          <FormField
            control={form.control}
            name="cor"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Cor *</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Ex: Branco, Prata, Preto" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Botões */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
          )}
          <Button 
            type="submit" 
            className="bg-[#0F3460] hover:bg-[#0F3460]/90"
            disabled={form.formState.isSubmitting}
          >
            {isEditing ? 'Salvar Alterações' : 'Cadastrar Veículo'}
          </Button>
        </div>
      </form>
    </Form>
  );
};
