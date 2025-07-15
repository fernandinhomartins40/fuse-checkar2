import { CategoriaChecklist } from '../types/revisoes';

export const newChecklistTemplate: CategoriaChecklist[] = [
  {
    id: 'motor',
    nome: 'Motor',
    descricao: 'Verificações do sistema do motor',
    preDiagnostico: [
      {
        id: 'motor_pre_1',
        pergunta: 'O veículo apresenta algum ruído estranho no motor?',
        tipo: 'sim_nao',
        obrigatoria: true
      },
      {
        id: 'motor_pre_2',
        pergunta: 'Há fumaca saindo do escapamento?',
        tipo: 'multipla_escolha',
        opcoes: ['Não', 'Fumaça branca', 'Fumaça preta', 'Fumaça azul'],
        obrigatoria: true
      },
      {
        id: 'motor_pre_3',
        pergunta: 'Quando foi feita a última troca de óleo?',
        tipo: 'texto',
        obrigatoria: false
      }
    ],
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
      }
    ]
  },
  {
    id: 'freios',
    nome: 'Sistema de Freios',
    descricao: 'Verificações do sistema de freios',
    preDiagnostico: [
      {
        id: 'freios_pre_1',
        pergunta: 'O pedal do freio está mais "mole" que o normal?',
        tipo: 'sim_nao',
        obrigatoria: true
      },
      {
        id: 'freios_pre_2',
        pergunta: 'Há algum ruído ao frear?',
        tipo: 'multipla_escolha',
        opcoes: ['Não', 'Chiado', 'Rangido', 'Vibração'],
        obrigatoria: true
      },
      {
        id: 'freios_pre_3',
        pergunta: 'Quando foi feita a última revisão dos freios?',
        tipo: 'texto',
        obrigatoria: false
      }
    ],
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
      }
    ]
  },
  {
    id: 'pneus',
    nome: 'Pneus e Rodas',
    descricao: 'Verificações dos pneus e rodas',
    preDiagnostico: [
      {
        id: 'pneus_pre_1',
        pergunta: 'Os pneus apresentam desgaste irregular?',
        tipo: 'sim_nao',
        obrigatoria: true
      },
      {
        id: 'pneus_pre_2',
        pergunta: 'Há vibração no volante em alta velocidade?',
        tipo: 'sim_nao',
        obrigatoria: true
      },
      {
        id: 'pneus_pre_3',
        pergunta: 'Quando foi feito o último balanceamento?',
        tipo: 'texto',
        obrigatoria: false
      }
    ],
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
    id: 'eletrico',
    nome: 'Sistema Elétrico',
    descricao: 'Verificações do sistema elétrico',
    preDiagnostico: [
      {
        id: 'eletrico_pre_1',
        pergunta: 'Todas as luzes estão funcionando normalmente?',
        tipo: 'sim_nao',
        obrigatoria: true
      },
      {
        id: 'eletrico_pre_2',
        pergunta: 'A bateria já apresentou problemas recentemente?',
        tipo: 'sim_nao',
        obrigatoria: true
      },
      {
        id: 'eletrico_pre_3',
        pergunta: 'Quando foi feita a última verificação elétrica?',
        tipo: 'texto',
        obrigatoria: false
      }
    ],
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
  }
];