import { CategoriaChecklist } from '../types/revisoes';

export const newChecklistTemplate: CategoriaChecklist[] = [
  {
    id: 'prevencao',
    nome: '🛡️ ITENS DE PREVENÇÃO',
    descricao: 'Itens básicos de prevenção e manutenção',
    preDiagnostico: [],
    itens: [
      {
        id: 'prev_1',
        nome: 'Óleo do motor',
        categoria: 'prevencao',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'alta'
      },
      {
        id: 'prev_2',
        nome: 'Filtro de óleo',
        categoria: 'prevencao',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'alta'
      },
      {
        id: 'prev_3',
        nome: 'Filtro de ar',
        categoria: 'prevencao',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'media'
      },
      {
        id: 'prev_4',
        nome: 'Filtro de combustível',
        categoria: 'prevencao',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'media'
      },
      {
        id: 'prev_5',
        nome: 'Água do radiador',
        categoria: 'prevencao',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'alta'
      },
      {
        id: 'prev_6',
        nome: 'Fluído de freio',
        categoria: 'prevencao',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'critica'
      },
      {
        id: 'prev_7',
        nome: 'Óleo da direção hidráulica',
        categoria: 'prevencao',
        obrigatorio: false,
        status: 'pendente',
        prioridade: 'media'
      }
    ]
  },
  {
    id: 'carroceria',
    nome: '🚘 CONDIÇÃO EXTERNA (CARROCERIA)',
    descricao: 'Verificação da condição externa do veículo',
    preDiagnostico: [],
    itens: [
      {
        id: 'carr_1',
        nome: 'Pintura',
        categoria: 'carroceria',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'baixa'
      },
      {
        id: 'carr_2',
        nome: 'Paralamas',
        categoria: 'carroceria',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'baixa'
      },
      {
        id: 'carr_3',
        nome: 'Para-choques',
        categoria: 'carroceria',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'baixa'
      },
      {
        id: 'carr_4',
        nome: 'Portas',
        categoria: 'carroceria',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'media'
      },
      {
        id: 'carr_5',
        nome: 'Capô',
        categoria: 'carroceria',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'media'
      },
      {
        id: 'carr_6',
        nome: 'Porta-malas',
        categoria: 'carroceria',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'media'
      },
      {
        id: 'carr_7',
        nome: 'Teto',
        categoria: 'carroceria',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'baixa'
      },
      {
        id: 'carr_8',
        nome: 'Vidros',
        categoria: 'carroceria',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'alta'
      },
      {
        id: 'carr_9',
        nome: 'Espelhos retrovisores',
        categoria: 'carroceria',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'alta'
      },
      {
        id: 'carr_10',
        nome: 'Lanternas traseiras',
        categoria: 'carroceria',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'alta'
      },
      {
        id: 'carr_11',
        nome: 'Faróis',
        categoria: 'carroceria',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'alta'
      },
      {
        id: 'carr_12',
        nome: 'Grade frontal',
        categoria: 'carroceria',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'baixa'
      }
    ]
  },
  {
    id: 'mecanica',
    nome: '⚙️ MECÂNICA',
    descricao: 'Verificações do sistema mecânico',
    preDiagnostico: [],
    itens: [
      {
        id: 'mec_1',
        nome: 'Motor',
        categoria: 'mecanica',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'critica'
      },
      {
        id: 'mec_2',
        nome: 'Câmbio',
        categoria: 'mecanica',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'critica'
      },
      {
        id: 'mec_3',
        nome: 'Embreagem',
        categoria: 'mecanica',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'alta'
      },
      {
        id: 'mec_4',
        nome: 'Acelerador',
        categoria: 'mecanica',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'alta'
      },
      {
        id: 'mec_5',
        nome: 'Freio',
        categoria: 'mecanica',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'critica'
      },
      {
        id: 'mec_6',
        nome: 'Pastilhas',
        categoria: 'mecanica',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'critica'
      },
      {
        id: 'mec_7',
        nome: 'Discos',
        categoria: 'mecanica',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'critica'
      },
      {
        id: 'mec_8',
        nome: 'Freio de mão',
        categoria: 'mecanica',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'alta'
      },
      {
        id: 'mec_9',
        nome: 'Pneus',
        categoria: 'mecanica',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'critica'
      },
      {
        id: 'mec_10',
        nome: 'Rodas',
        categoria: 'mecanica',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'alta'
      },
      {
        id: 'mec_11',
        nome: 'Estepe',
        categoria: 'mecanica',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'media'
      },
      {
        id: 'mec_12',
        nome: 'Escapamento',
        categoria: 'mecanica',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'media'
      },
      {
        id: 'mec_13',
        nome: 'Correias',
        categoria: 'mecanica',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'alta'
      },
      {
        id: 'mec_14',
        nome: 'Mangueiras',
        categoria: 'mecanica',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'media'
      },
      {
        id: 'mec_15',
        nome: 'Radiador',
        categoria: 'mecanica',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'alta'
      },
      {
        id: 'mec_16',
        nome: 'Velas',
        categoria: 'mecanica',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'media'
      },
      {
        id: 'mec_17',
        nome: 'Cabos de vela',
        categoria: 'mecanica',
        obrigatorio: false,
        status: 'pendente',
        prioridade: 'media'
      },
      {
        id: 'mec_18',
        nome: 'Bobina',
        categoria: 'mecanica',
        obrigatorio: false,
        status: 'pendente',
        prioridade: 'media'
      }
    ]
  },
  {
    id: 'suspensao',
    nome: '🔩 SUSPENSÃO / DIREÇÃO',
    descricao: 'Verificações do sistema de suspensão e direção',
    preDiagnostico: [],
    itens: [
      {
        id: 'susp_1',
        nome: 'Amortecedores',
        categoria: 'suspensao',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'alta'
      },
      {
        id: 'susp_2',
        nome: 'Molas',
        categoria: 'suspensao',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'media'
      },
      {
        id: 'susp_3',
        nome: 'Buchas',
        categoria: 'suspensao',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'media'
      },
      {
        id: 'susp_4',
        nome: 'Pivôs',
        categoria: 'suspensao',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'alta'
      },
      {
        id: 'susp_5',
        nome: 'Terminal de direção',
        categoria: 'suspensao',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'critica'
      },
      {
        id: 'susp_6',
        nome: 'Caixa de direção',
        categoria: 'suspensao',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'alta'
      },
      {
        id: 'susp_7',
        nome: 'Alinhamento',
        categoria: 'suspensao',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'media'
      },
      {
        id: 'susp_8',
        nome: 'Balanceamento',
        categoria: 'suspensao',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'media'
      }
    ]
  },
  {
    id: 'eletrico',
    nome: '🔌 SISTEMA ELÉTRICO / BATERIA',
    descricao: 'Verificações do sistema elétrico',
    preDiagnostico: [],
    itens: [
      {
        id: 'elet_1',
        nome: 'Bateria',
        categoria: 'eletrico',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'alta'
      },
      {
        id: 'elet_2',
        nome: 'Alternador',
        categoria: 'eletrico',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'alta'
      },
      {
        id: 'elet_3',
        nome: 'Motor de partida',
        categoria: 'eletrico',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'alta'
      },
      {
        id: 'elet_4',
        nome: 'Fusíveis',
        categoria: 'eletrico',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'media'
      },
      {
        id: 'elet_5',
        nome: 'Fiação',
        categoria: 'eletrico',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'media'
      },
      {
        id: 'elet_6',
        nome: 'Relés',
        categoria: 'eletrico',
        obrigatorio: false,
        status: 'pendente',
        prioridade: 'media'
      }
    ]
  },
  {
    id: 'iluminacao',
    nome: '💡 ILUMINAÇÃO',
    descricao: 'Verificações do sistema de iluminação',
    preDiagnostico: [],
    itens: [
      {
        id: 'ilum_1',
        nome: 'Farol baixo',
        categoria: 'iluminacao',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'alta'
      },
      {
        id: 'ilum_2',
        nome: 'Farol alto',
        categoria: 'iluminacao',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'alta'
      },
      {
        id: 'ilum_3',
        nome: 'Lanternas traseiras',
        categoria: 'iluminacao',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'alta'
      },
      {
        id: 'ilum_4',
        nome: 'Luz de freio',
        categoria: 'iluminacao',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'critica'
      },
      {
        id: 'ilum_5',
        nome: 'Setas',
        categoria: 'iluminacao',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'alta'
      },
      {
        id: 'ilum_6',
        nome: 'Pisca alerta',
        categoria: 'iluminacao',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'alta'
      },
      {
        id: 'ilum_7',
        nome: 'Luz de ré',
        categoria: 'iluminacao',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'media'
      },
      {
        id: 'ilum_8',
        nome: 'Luz da placa',
        categoria: 'iluminacao',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'media'
      }
    ]
  },
  {
    id: 'seguranca',
    nome: '🔐 SEGURANÇA',
    descricao: 'Verificações de segurança',
    preDiagnostico: [],
    itens: [
      {
        id: 'seg_1',
        nome: 'Cintos de segurança',
        categoria: 'seguranca',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'critica'
      },
      {
        id: 'seg_2',
        nome: 'Airbags',
        categoria: 'seguranca',
        obrigatorio: false,
        status: 'pendente',
        prioridade: 'alta'
      },
      {
        id: 'seg_3',
        nome: 'Extintor',
        categoria: 'seguranca',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'media'
      },
      {
        id: 'seg_4',
        nome: 'Triângulo',
        categoria: 'seguranca',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'media'
      }
    ]
  },
  {
    id: 'acessorios',
    nome: '🎧 ACESSÓRIOS',
    descricao: 'Verificações dos acessórios do veículo',
    preDiagnostico: [],
    itens: [
      {
        id: 'ace_1',
        nome: 'Ar condicionado',
        categoria: 'acessorios',
        obrigatorio: false,
        status: 'pendente',
        prioridade: 'media'
      },
      {
        id: 'ace_2',
        nome: 'Aquecedor',
        categoria: 'acessorios',
        obrigatorio: false,
        status: 'pendente',
        prioridade: 'media'
      },
      {
        id: 'ace_3',
        nome: 'Desembaçador traseiro',
        categoria: 'acessorios',
        obrigatorio: false,
        status: 'pendente',
        prioridade: 'baixa'
      },
      {
        id: 'ace_4',
        nome: 'Limpador de para-brisa',
        categoria: 'acessorios',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'alta'
      },
      {
        id: 'ace_5',
        nome: 'Esguicho do para-brisa',
        categoria: 'acessorios',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'media'
      },
      {
        id: 'ace_6',
        nome: 'Buzina',
        categoria: 'acessorios',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'media'
      },
      {
        id: 'ace_7',
        nome: 'Rádio/Som',
        categoria: 'acessorios',
        obrigatorio: false,
        status: 'pendente',
        prioridade: 'baixa'
      },
      {
        id: 'ace_8',
        nome: 'Acendedor de cigarros',
        categoria: 'acessorios',
        obrigatorio: false,
        status: 'pendente',
        prioridade: 'baixa'
      },
      {
        id: 'ace_9',
        nome: 'Vidros elétricos',
        categoria: 'acessorios',
        obrigatorio: false,
        status: 'pendente',
        prioridade: 'baixa'
      },
      {
        id: 'ace_10',
        nome: 'Travas elétricas',
        categoria: 'acessorios',
        obrigatorio: false,
        status: 'pendente',
        prioridade: 'baixa'
      },
      {
        id: 'ace_11',
        nome: 'Alarme',
        categoria: 'acessorios',
        obrigatorio: false,
        status: 'pendente',
        prioridade: 'baixa'
      },
      {
        id: 'ace_12',
        nome: 'Trava de direção',
        categoria: 'acessorios',
        obrigatorio: false,
        status: 'pendente',
        prioridade: 'baixa'
      },
      {
        id: 'ace_13',
        nome: 'Painel de instrumentos',
        categoria: 'acessorios',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'alta'
      },
      {
        id: 'ace_14',
        nome: 'Luz interna',
        categoria: 'acessorios',
        obrigatorio: true,
        status: 'pendente',
        prioridade: 'media'
      },
      {
        id: 'ace_15',
        nome: 'Espelhos elétricos',
        categoria: 'acessorios',
        obrigatorio: false,
        status: 'pendente',
        prioridade: 'baixa'
      },
      {
        id: 'ace_16',
        nome: 'GPS/Multimídia',
        categoria: 'acessorios',
        obrigatorio: false,
        status: 'pendente',
        prioridade: 'baixa'
      }
    ]
  },
  {
    id: 'higienizacao',
    nome: '🧼 HIGIENIZAÇÃO',
    descricao: 'Verificações de limpeza e higienização',
    preDiagnostico: [],
    itens: [
      {
        id: 'hig_1',
        nome: 'Limpeza externa',
        categoria: 'higienizacao',
        obrigatorio: false,
        status: 'pendente',
        prioridade: 'baixa'
      },
      {
        id: 'hig_2',
        nome: 'Limpeza interna',
        categoria: 'higienizacao',
        obrigatorio: false,
        status: 'pendente',
        prioridade: 'baixa'
      }
    ]
  }
];