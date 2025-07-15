import { CategoriaChecklist } from '../types/revisoes';

export const newChecklistTemplate: CategoriaChecklist[] = [
  {
    id: 'motor',
    nome: 'Motor',
    descricao: 'Verificações completas do sistema do motor',
    preDiagnostico: [
      {
        id: 'motor_pre_1',
        pergunta: 'O veículo apresenta algum ruído estranho no motor?',
        tipo: 'sim_nao',
        obrigatoria: true
      },
      {
        id: 'motor_pre_2',
        pergunta: 'Que tipo de ruído você percebe?',
        tipo: 'multipla_escolha',
        opcoes: ['Batida', 'Chiado', 'Zumbido', 'Estalo', 'Nenhum'],
        obrigatoria: false
      },
      {
        id: 'motor_pre_3',
        pergunta: 'Há fumaça saindo do escapamento?',
        tipo: 'multipla_escolha',
        opcoes: ['Não', 'Fumaça branca', 'Fumaça preta', 'Fumaça azul'],
        obrigatoria: true
      },
      {
        id: 'motor_pre_4',
        pergunta: 'O motor apresenta perda de potência?',
        tipo: 'sim_nao',
        obrigatoria: true
      },
      {
        id: 'motor_pre_5',
        pergunta: 'O consumo de combustível aumentou?',
        tipo: 'sim_nao',
        obrigatoria: true
      },
      {
        id: 'motor_pre_6',
        pergunta: 'Quando foi feita a última troca de óleo?',
        tipo: 'texto',
        obrigatoria: false
      },
      {
        id: 'motor_pre_7',
        pergunta: 'Há vazamentos visíveis sob o veículo?',
        tipo: 'multipla_escolha',
        opcoes: ['Não', 'Óleo preto', 'Óleo marrom', 'Líquido verde', 'Líquido vermelho'],
        obrigatoria: true
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
        nome: 'Bateria e terminais',
        categoria: 'motor',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'alta'
      },
      {
        id: 'motor_11',
        nome: 'Sistema de arrefecimento',
        categoria: 'motor',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'critica'
      },
      {
        id: 'motor_12',
        nome: 'Radiador',
        categoria: 'motor',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'alta'
      },
      {
        id: 'motor_13',
        nome: 'Mangueiras do radiador',
        categoria: 'motor',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'alta'
      },
      {
        id: 'motor_14',
        nome: 'Bomba d\'água',
        categoria: 'motor',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'critica'
      },
      {
        id: 'motor_15',
        nome: 'Termostato',
        categoria: 'motor',
        obrigatorio: false,
        status: 'pendente',
        prioridade: 'media'
      }
    ]
  },
  {
    id: 'freios',
    nome: 'Sistema de Freios',
    descricao: 'Verificações completas do sistema de freios',
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
        opcoes: ['Não', 'Chiado', 'Rangido', 'Vibração', 'Barulho metálico'],
        obrigatoria: true
      },
      {
        id: 'freios_pre_3',
        pergunta: 'O veículo "puxa" para um lado ao frear?',
        tipo: 'sim_nao',
        obrigatoria: true
      },
      {
        id: 'freios_pre_4',
        pergunta: 'O pedal do freio vibra durante a frenagem?',
        tipo: 'sim_nao',
        obrigatoria: true
      },
      {
        id: 'freios_pre_5',
        pergunta: 'A distância de frenagem aumentou?',
        tipo: 'sim_nao',
        obrigatoria: true
      },
      {
        id: 'freios_pre_6',
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
      },
      {
        id: 'freios_9',
        nome: 'Servo-freio',
        categoria: 'freios',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'alta'
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
    descricao: 'Verificações do sistema de suspensão e direção',
    preDiagnostico: [
      {
        id: 'suspensao_pre_1',
        pergunta: 'O veículo apresenta ruídos na suspensão?',
        tipo: 'sim_nao',
        obrigatoria: true
      },
      {
        id: 'suspensao_pre_2',
        pergunta: 'A direção está dura ou com folga?',
        tipo: 'multipla_escolha',
        opcoes: ['Normal', 'Dura', 'Com folga', 'Vibra'],
        obrigatoria: true
      },
      {
        id: 'suspensao_pre_3',
        pergunta: 'O veículo "balança" muito em lombadas?',
        tipo: 'sim_nao',
        obrigatoria: true
      },
      {
        id: 'suspensao_pre_4',
        pergunta: 'Há desgaste irregular nos pneus?',
        tipo: 'sim_nao',
        obrigatoria: true
      }
    ],
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
        nome: 'Buchas da suspensão',
        categoria: 'suspensao',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'media'
      },
      {
        id: 'suspensao_6',
        nome: 'Pivôs',
        categoria: 'suspensao',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'alta'
      },
      {
        id: 'suspensao_7',
        nome: 'Terminal de direção',
        categoria: 'suspensao',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'critica'
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
        nome: 'Alinhamento',
        categoria: 'suspensao',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'media'
      },
      {
        id: 'suspensao_11',
        nome: 'Balanceamento',
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
    descricao: 'Verificações completas dos pneus e rodas',
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
        pergunta: 'Algum pneu está "careca" ou com sulcos rasos?',
        tipo: 'sim_nao',
        obrigatoria: true
      },
      {
        id: 'pneus_pre_4',
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
      },
      {
        id: 'pneus_7',
        nome: 'Válvulas dos pneus',
        categoria: 'pneus',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'media'
      }
    ]
  },
  {
    id: 'eletrico',
    nome: 'Sistema Elétrico',
    descricao: 'Verificações completas do sistema elétrico',
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
        pergunta: 'Há dificuldade para dar partida?',
        tipo: 'sim_nao',
        obrigatoria: true
      },
      {
        id: 'eletrico_pre_4',
        pergunta: 'Algum equipamento elétrico não funciona?',
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
      },
      {
        id: 'eletrico_11',
        nome: 'Fusíveis',
        categoria: 'eletrico',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'media'
      },
      {
        id: 'eletrico_12',
        nome: 'Chicotes elétricos',
        categoria: 'eletrico',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'media'
      }
    ]
  },
  {
    id: 'transmissao',
    nome: 'Transmissão',
    descricao: 'Verificações do sistema de transmissão',
    preDiagnostico: [
      {
        id: 'transmissao_pre_1',
        pergunta: 'Há dificuldade para engatar as marchas?',
        tipo: 'sim_nao',
        obrigatoria: true
      },
      {
        id: 'transmissao_pre_2',
        pergunta: 'A embreagem está "patinando"?',
        tipo: 'sim_nao',
        obrigatoria: true
      },
      {
        id: 'transmissao_pre_3',
        pergunta: 'Há ruídos na transmissão?',
        tipo: 'multipla_escolha',
        opcoes: ['Não', 'Rangido', 'Chiado', 'Batida'],
        obrigatoria: true
      },
      {
        id: 'transmissao_pre_4',
        pergunta: 'O câmbio é automático ou manual?',
        tipo: 'multipla_escolha',
        opcoes: ['Manual', 'Automático', 'CVT'],
        obrigatoria: true
      }
    ],
    itens: [
      {
        id: 'transmissao_1',
        nome: 'Óleo da transmissão',
        categoria: 'transmissao',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'alta'
      },
      {
        id: 'transmissao_2',
        nome: 'Filtro da transmissão',
        categoria: 'transmissao',
        obrigatorio: false,
        status: 'pendente',
        prioridade: 'media'
      },
      {
        id: 'transmissao_3',
        nome: 'Embreagem',
        categoria: 'transmissao',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'alta'
      },
      {
        id: 'transmissao_4',
        nome: 'Disco de embreagem',
        categoria: 'transmissao',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'alta'
      },
      {
        id: 'transmissao_5',
        nome: 'Platô de embreagem',
        categoria: 'transmissao',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'alta'
      },
      {
        id: 'transmissao_6',
        nome: 'Rolamento da embreagem',
        categoria: 'transmissao',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'media'
      },
      {
        id: 'transmissao_7',
        nome: 'Cabo ou cilindro da embreagem',
        categoria: 'transmissao',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'media'
      },
      {
        id: 'transmissao_8',
        nome: 'Junta homocinética',
        categoria: 'transmissao',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'alta'
      }
    ]
  },
  {
    id: 'carroceria',
    nome: 'Carroceria e Segurança',
    descricao: 'Verificações de carroceria, estrutura e itens de segurança',
    preDiagnostico: [
      {
        id: 'carroceria_pre_1',
        pergunta: 'Há sinais visíveis de ferrugem na carroceria?',
        tipo: 'sim_nao',
        obrigatoria: true
      },
      {
        id: 'carroceria_pre_2',
        pergunta: 'Todos os vidros estão em bom estado?',
        tipo: 'sim_nao',
        obrigatoria: true
      },
      {
        id: 'carroceria_pre_3',
        pergunta: 'O veículo já sofreu acidentes?',
        tipo: 'sim_nao',
        obrigatoria: false
      }
    ],
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
        nome: 'Vidro traseiro',
        categoria: 'carroceria',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'media'
      },
      {
        id: 'carroceria_4',
        nome: 'Retrovisores',
        categoria: 'carroceria',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'alta'
      },
      {
        id: 'carroceria_5',
        nome: 'Cintos de segurança',
        categoria: 'carroceria',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'critica'
      },
      {
        id: 'carroceria_6',
        nome: 'Airbags',
        categoria: 'carroceria',
        obrigatorio: false,
        status: 'pendente',
        prioridade: 'alta'
      },
      {
        id: 'carroceria_7',
        nome: 'Estrutura da carroceria',
        categoria: 'carroceria',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'critica'
      },
      {
        id: 'carroceria_8',
        nome: 'Fechaduras das portas',
        categoria: 'carroceria',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'media'
      },
      {
        id: 'carroceria_9',
        nome: 'Maçanetas',
        categoria: 'carroceria',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'baixa'
      },
      {
        id: 'carroceria_10',
        nome: 'Capô e porta-malas',
        categoria: 'carroceria',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'media'
      }
    ]
  }
];