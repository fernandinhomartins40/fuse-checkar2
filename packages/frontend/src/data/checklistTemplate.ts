
import { CategoriaChecklist } from '../types/revisoes';

export const checklistTemplate: CategoriaChecklist[] = [
  {
    id: 'motor',
    nome: 'Motor',
    descricao: 'Verificações do sistema do motor',
    itens: [
      {
        id: 'motor_1',
        nome: 'Nível de óleo do motor',
        categoria: 'motor',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'alta'
      },
      {
        id: 'motor_2',
        nome: 'Qualidade do óleo do motor',
        categoria: 'motor',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'alta'
      },
      {
        id: 'motor_3',
        nome: 'Filtro de óleo',
        categoria: 'motor',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'alta'
      },
      {
        id: 'motor_4',
        nome: 'Filtro de ar',
        categoria: 'motor',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'media'
      },
      {
        id: 'motor_5',
        nome: 'Filtro de combustível',
        categoria: 'motor',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'media'
      },
      {
        id: 'motor_6',
        nome: 'Velas de ignição',
        categoria: 'motor',
        obrigatorio: false,
        status: 'pendente',
        prioridade: 'media'
      },
      {
        id: 'motor_7',
        nome: 'Cabos de vela',
        categoria: 'motor',
        obrigatorio: false,
        status: 'pendente',
        prioridade: 'media'
      },
      {
        id: 'motor_8',
        nome: 'Correia dentada',
        categoria: 'motor',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'critica'
      },
      {
        id: 'motor_9',
        nome: 'Correia do alternador',
        categoria: 'motor',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'alta'
      },
      {
        id: 'motor_10',
        nome: 'Bateria',
        categoria: 'motor',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'alta'
      },
      {
        id: 'motor_11',
        nome: 'Sistema de injeção eletrônica',
        categoria: 'motor',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'alta'
      },
      {
        id: 'motor_12',
        nome: 'Vazamentos de óleo',
        categoria: 'motor',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'alta'
      }
    ]
  },
  {
    id: 'freios',
    nome: 'Sistema de Freios',
    descricao: 'Verificações do sistema de freios',
    itens: [
      {
        id: 'freios_1',
        nome: 'Pastilhas de freio dianteiras',
        categoria: 'freios',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'critica'
      },
      {
        id: 'freios_2',
        nome: 'Pastilhas de freio traseiras',
        categoria: 'freios',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'critica'
      },
      {
        id: 'freios_3',
        nome: 'Discos de freio dianteiros',
        categoria: 'freios',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'critica'
      },
      {
        id: 'freios_4',
        nome: 'Discos de freio traseiros',
        categoria: 'freios',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'critica'
      },
      {
        id: 'freios_5',
        nome: 'Fluido de freio',
        categoria: 'freios',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'alta'
      },
      {
        id: 'freios_6',
        nome: 'Mangueiras de freio',
        categoria: 'freios',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'alta'
      },
      {
        id: 'freios_7',
        nome: 'Cilindro mestre',
        categoria: 'freios',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'alta'
      },
      {
        id: 'freios_8',
        nome: 'Freio de mão',
        categoria: 'freios',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'alta'
      },
      {
        id: 'freios_9',
        nome: 'Servo freio',
        categoria: 'freios',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'media'
      },
      {
        id: 'freios_10',
        nome: 'ABS (se equipado)',
        categoria: 'freios',
        obrigatorio: false,
        status: 'pendente',
        prioridade: 'media'
      }
    ]
  },
  {
    id: 'suspensao',
    nome: 'Suspensão e Direção',
    descricao: 'Verificações da suspensão e sistema de direção',
    itens: [
      {
        id: 'suspensao_1',
        nome: 'Amortecedores dianteiros',
        categoria: 'suspensao',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'alta'
      },
      {
        id: 'suspensao_2',
        nome: 'Amortecedores traseiros',
        categoria: 'suspensao',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'alta'
      },
      {
        id: 'suspensao_3',
        nome: 'Molas dianteiras',
        categoria: 'suspensao',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'media'
      },
      {
        id: 'suspensao_4',
        nome: 'Molas traseiras',
        categoria: 'suspensao',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'media'
      },
      {
        id: 'suspensao_5',
        nome: 'Bieletas da barra estabilizadora',
        categoria: 'suspensao',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'media'
      },
      {
        id: 'suspensao_6',
        nome: 'Buchas da suspensão',
        categoria: 'suspensao',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'media'
      },
      {
        id: 'suspensao_7',
        nome: 'Terminais de direção',
        categoria: 'suspensao',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'alta'
      },
      {
        id: 'suspensao_8',
        nome: 'Caixa de direção',
        categoria: 'suspensao',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'alta'
      },
      {
        id: 'suspensao_9',
        nome: 'Fluido da direção hidráulica',
        categoria: 'suspensao',
        obrigatorio: false,
        status: 'pendente',
        prioridade: 'media'
      },
      {
        id: 'suspensao_10',
        nome: 'Alinhamento e balanceamento',
        categoria: 'suspensao',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'media'
      }
    ]
  },
  {
    id: 'pneus',
    nome: 'Pneus e Rodas',
    descricao: 'Verificações dos pneus e rodas',
    itens: [
      {
        id: 'pneus_1',
        nome: 'Estado dos pneus dianteiros',
        categoria: 'pneus',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'critica'
      },
      {
        id: 'pneus_2',
        nome: 'Estado dos pneus traseiros',
        categoria: 'pneus',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'critica'
      },
      {
        id: 'pneus_3',
        nome: 'Pressão dos pneus',
        categoria: 'pneus',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'alta'
      },
      {
        id: 'pneus_4',
        nome: 'Pneu estepe',
        categoria: 'pneus',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'media'
      },
      {
        id: 'pneus_5',
        nome: 'Rodas e aros',
        categoria: 'pneus',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'media'
      },
      {
        id: 'pneus_6',
        nome: 'Parafusos das rodas',
        categoria: 'pneus',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'alta'
      }
    ]
  },
  {
    id: 'transmissao',
    nome: 'Transmissão',
    descricao: 'Verificações do sistema de transmissão',
    itens: [
      {
        id: 'transmissao_1',
        nome: 'Óleo da transmissão automática',
        categoria: 'transmissao',
        obrigatorio: false,
        status: 'pendente',
        prioridade: 'alta'
      },
      {
        id: 'transmissao_2',
        nome: 'Óleo da transmissão manual',
        categoria: 'transmissao',
        obrigatorio: false,
        status: 'pendente',
        prioridade: 'alta'
      },
      {
        id: 'transmissao_3',
        nome: 'Embreagem',
        categoria: 'transmissao',
        obrigatorio: false,
        status: 'pendente',
        prioridade: 'alta'
      },
      {
        id: 'transmissao_4',
        nome: 'Juntas homocinéticas',
        categoria: 'transmissao',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'media'
      },
      {
        id: 'transmissao_5',
        nome: 'Diferencial',
        categoria: 'transmissao',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'media'
      }
    ]
  },
  {
    id: 'eletrico',
    nome: 'Sistema Elétrico',
    descricao: 'Verificações do sistema elétrico',
    itens: [
      {
        id: 'eletrico_1',
        nome: 'Faróis dianteiros',
        categoria: 'eletrico',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'alta'
      },
      {
        id: 'eletrico_2',
        nome: 'Lanternas traseiras',
        categoria: 'eletrico',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'alta'
      },
      {
        id: 'eletrico_3',
        nome: 'Pisca-alerta',
        categoria: 'eletrico',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'alta'
      },
      {
        id: 'eletrico_4',
        nome: 'Luz de freio',
        categoria: 'eletrico',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'critica'
      },
      {
        id: 'eletrico_5',
        nome: 'Luz de ré',
        categoria: 'eletrico',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'media'
      },
      {
        id: 'eletrico_6',
        nome: 'Buzina',
        categoria: 'eletrico',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'media'
      },
      {
        id: 'eletrico_7',
        nome: 'Limpador de para-brisa',
        categoria: 'eletrico',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'media'
      },
      {
        id: 'eletrico_8',
        nome: 'Sistema de ignição',
        categoria: 'eletrico',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'alta'
      },
      {
        id: 'eletrico_9',
        nome: 'Alternador',
        categoria: 'eletrico',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'alta'
      },
      {
        id: 'eletrico_10',
        nome: 'Motor de partida',
        categoria: 'eletrico',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'alta'
      }
    ]
  },
  {
    id: 'ar_condicionado',
    nome: 'Ar Condicionado',
    descricao: 'Verificações do sistema de ar condicionado',
    itens: [
      {
        id: 'ar_1',
        nome: 'Funcionamento do compressor',
        categoria: 'ar_condicionado',
        obrigatorio: false,
        status: 'pendente',
        prioridade: 'media'
      },
      {
        id: 'ar_2',
        nome: 'Gás refrigerante',
        categoria: 'ar_condicionado',
        obrigatorio: false,
        status: 'pendente',
        prioridade: 'media'
      },
      {
        id: 'ar_3',
        nome: 'Filtro do ar condicionado',
        categoria: 'ar_condicionado',
        obrigatorio: false,
        status: 'pendente',
        prioridade: 'baixa'
      },
      {
        id: 'ar_4',
        nome: 'Correia do compressor',
        categoria: 'ar_condicionado',
        obrigatorio: false,
        status: 'pendente',
        prioridade: 'media'
      }
    ]
  },
  {
    id: 'carroceria',
    nome: 'Carroceria e Acessórios',
    descricao: 'Verificações da carroceria e acessórios',
    itens: [
      {
        id: 'carroceria_1',
        nome: 'Para-brisa',
        categoria: 'carroceria',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'alta'
      },
      {
        id: 'carroceria_2',
        nome: 'Vidros laterais',
        categoria: 'carroceria',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'media'
      },
      {
        id: 'carroceria_3',
        nome: 'Retrovisores',
        categoria: 'carroceria',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'alta'
      },
      {
        id: 'carroceria_4',
        nome: 'Cintos de segurança',
        categoria: 'carroceria',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'critica'
      },
      {
        id: 'carroceria_5',
        nome: 'Airbag (se equipado)',
        categoria: 'carroceria',
        obrigatorio: false,
        status: 'pendente',
        prioridade: 'alta'
      },
      {
        id: 'carroceria_6',
        nome: 'Fechaduras das portas',
        categoria: 'carroceria',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'media'
      },
      {
        id: 'carroceria_7',
        nome: 'Vidro traseiro',
        categoria: 'carroceria',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'media'
      }
    ]
  },
  {
    id: 'fluidos',
    nome: 'Fluidos e Filtros',
    descricao: 'Verificações de fluidos e filtros gerais',
    itens: [
      {
        id: 'fluidos_1',
        nome: 'Fluido do radiador',
        categoria: 'fluidos',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'alta'
      },
      {
        id: 'fluidos_2',
        nome: 'Água do limpador',
        categoria: 'fluidos',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'baixa'
      },
      {
        id: 'fluidos_3',
        nome: 'Filtro de cabine',
        categoria: 'fluidos',
        obrigatorio: false,
        status: 'pendente',
        prioridade: 'baixa'
      },
      {
        id: 'fluidos_4',
        nome: 'Vazamentos gerais',
        categoria: 'fluidos',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'alta'
      }
    ]
  },
  {
    id: 'documentacao',
    nome: 'Documentação e Itens Obrigatórios',
    descricao: 'Verificação de documentos e itens obrigatórios',
    itens: [
      {
        id: 'doc_1',
        nome: 'Documento do veículo',
        categoria: 'documentacao',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'critica'
      },
      {
        id: 'doc_2',
        nome: 'Extintor de incêndio',
        categoria: 'documentacao',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'alta'
      },
      {
        id: 'doc_3',
        nome: 'Triângulo de segurança',
        categoria: 'documentacao',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'alta'
      },
      {
        id: 'doc_4',
        nome: 'Chave de roda',
        categoria: 'documentacao',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'media'
      },
      {
        id: 'doc_5',
        nome: 'Macaco',
        categoria: 'documentacao',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'media'
      }
    ]
  }
];
