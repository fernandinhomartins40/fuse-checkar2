import { CategoriaChecklist } from '../types/revisoes';

export const newChecklistTemplate: CategoriaChecklist[] = [
  {
    id: 'motor_combustivel',
    nome: '🚗 MOTOR E COMBUSTÍVEL',
    descricao: 'Verificações do sistema do motor, combustível e arrefecimento',
    preDiagnostico: [
      {
        id: 'motor_pre_1',
        pergunta: 'O motor apresenta ruídos anormais?',
        tipo: 'sim_nao',
        resposta: false,
        obrigatoria: true
      },
      {
        id: 'motor_pre_2',
        pergunta: 'Há vazamentos visíveis no motor?',
        tipo: 'sim_nao',
        resposta: false,
        obrigatoria: true
      },
      {
        id: 'motor_pre_3',
        pergunta: 'O veículo consome mais combustível que o normal?',
        tipo: 'sim_nao',
        resposta: false,
        obrigatoria: false
      }
    ],
    itens: [
      { id: 'mot_1', nome: 'Óleo do motor (nível e qualidade)', categoria: 'motor_combustivel', obrigatorio: true, status: 'pendente', prioridade: 'critica' },
      { id: 'mot_2', nome: 'Filtro de óleo', categoria: 'motor_combustivel', obrigatorio: true, status: 'pendente', prioridade: 'critica' },
      { id: 'mot_3', nome: 'Filtro de ar do motor', categoria: 'motor_combustivel', obrigatorio: true, status: 'pendente', prioridade: 'alta' },
      { id: 'mot_4', nome: 'Filtro de combustível', categoria: 'motor_combustivel', obrigatorio: true, status: 'pendente', prioridade: 'alta' },
      { id: 'mot_5', nome: 'Filtro do ar condicionado', categoria: 'motor_combustivel', obrigatorio: false, status: 'pendente', prioridade: 'media' },
      { id: 'mot_6', nome: 'Velas de ignição', categoria: 'motor_combustivel', obrigatorio: true, status: 'pendente', prioridade: 'alta' },
      { id: 'mot_7', nome: 'Cabos de vela', categoria: 'motor_combustivel', obrigatorio: false, status: 'pendente', prioridade: 'media' },
      { id: 'mot_8', nome: 'Bobinas de ignição', categoria: 'motor_combustivel', obrigatorio: true, status: 'pendente', prioridade: 'alta' },
      { id: 'mot_9', nome: 'Correia dentada', categoria: 'motor_combustivel', obrigatorio: true, status: 'pendente', prioridade: 'critica' },
      { id: 'mot_10', nome: 'Correia do alternador', categoria: 'motor_combustivel', obrigatorio: true, status: 'pendente', prioridade: 'alta' },
      { id: 'mot_11', nome: 'Correia da direção hidráulica', categoria: 'motor_combustivel', obrigatorio: false, status: 'pendente', prioridade: 'media' },
      { id: 'mot_12', nome: 'Mangueiras do radiador', categoria: 'motor_combustivel', obrigatorio: true, status: 'pendente', prioridade: 'alta' },
      { id: 'mot_13', nome: 'Radiador (condição e limpeza)', categoria: 'motor_combustivel', obrigatorio: true, status: 'pendente', prioridade: 'alta' },
      { id: 'mot_14', nome: 'Água do radiador/aditivo', categoria: 'motor_combustivel', obrigatorio: true, status: 'pendente', prioridade: 'critica' },
      { id: 'mot_15', nome: 'Termostato', categoria: 'motor_combustivel', obrigatorio: true, status: 'pendente', prioridade: 'alta' },
      { id: 'mot_16', nome: 'Bomba d\'água', categoria: 'motor_combustivel', obrigatorio: true, status: 'pendente', prioridade: 'alta' },
      { id: 'mot_17', nome: 'Eletroventilador', categoria: 'motor_combustivel', obrigatorio: true, status: 'pendente', prioridade: 'alta' },
      { id: 'mot_18', nome: 'Tampa do radiador', categoria: 'motor_combustivel', obrigatorio: true, status: 'pendente', prioridade: 'media' }
    ]
  },
  {
    id: 'transmissao',
    nome: '⚙️ TRANSMISSÃO E EMBREAGEM',
    descricao: 'Verificações do câmbio, embreagem e tração',
    preDiagnostico: [
      {
        id: 'trans_pre_1',
        pergunta: 'O câmbio apresenta dificuldades para engatar marchas?',
        tipo: 'sim_nao',
        resposta: false,
        obrigatoria: true
      },
      {
        id: 'trans_pre_2',
        pergunta: 'A embreagem patina ou está dura?',
        tipo: 'sim_nao',
        resposta: false,
        obrigatoria: true
      }
    ],
    itens: [
      { id: 'tra_1', nome: 'Óleo do câmbio manual', categoria: 'transmissao', obrigatorio: true, status: 'pendente', prioridade: 'alta' },
      { id: 'tra_2', nome: 'Fluido do câmbio automático', categoria: 'transmissao', obrigatorio: false, status: 'pendente', prioridade: 'alta' },
      { id: 'tra_3', nome: 'Disco de embreagem', categoria: 'transmissao', obrigatorio: true, status: 'pendente', prioridade: 'alta' },
      { id: 'tra_4', nome: 'Platô de embreagem', categoria: 'transmissao', obrigatorio: true, status: 'pendente', prioridade: 'alta' },
      { id: 'tra_5', nome: 'Rolamento da embreagem', categoria: 'transmissao', obrigatorio: true, status: 'pendente', prioridade: 'alta' },
      { id: 'tra_6', nome: 'Cilindro mestre da embreagem', categoria: 'transmissao', obrigatorio: true, status: 'pendente', prioridade: 'media' },
      { id: 'tra_7', nome: 'Cilindro auxiliar da embreagem', categoria: 'transmissao', obrigatorio: true, status: 'pendente', prioridade: 'media' },
      { id: 'tra_8', nome: 'Fluido da embreagem', categoria: 'transmissao', obrigatorio: true, status: 'pendente', prioridade: 'media' },
      { id: 'tra_9', nome: 'Juntas homocinéticas', categoria: 'transmissao', obrigatorio: true, status: 'pendente', prioridade: 'alta' },
      { id: 'tra_10', nome: 'Coifas das juntas', categoria: 'transmissao', obrigatorio: true, status: 'pendente', prioridade: 'media' },
      { id: 'tra_11', nome: 'Semieixos', categoria: 'transmissao', obrigatorio: true, status: 'pendente', prioridade: 'alta' },
      { id: 'tra_12', nome: 'Diferencial', categoria: 'transmissao', obrigatorio: true, status: 'pendente', prioridade: 'alta' }
    ]
  },
  {
    id: 'freios',
    nome: '🔴 SISTEMA DE FREIOS',
    descricao: 'Verificações completas do sistema de freios',
    preDiagnostico: [
      {
        id: 'freio_pre_1',
        pergunta: 'O pedal de freio está mole ou afunda muito?',
        tipo: 'sim_nao',
        resposta: false,
        obrigatoria: true
      },
      {
        id: 'freio_pre_2',
        pergunta: 'O veículo puxa para um lado ao frear?',
        tipo: 'sim_nao',
        resposta: false,
        obrigatoria: true
      },
      {
        id: 'freio_pre_3',
        pergunta: 'Há ruídos ao frear?',
        tipo: 'sim_nao',
        resposta: false,
        obrigatoria: true
      }
    ],
    itens: [
      { id: 'fre_1', nome: 'Pastilhas de freio dianteiras', categoria: 'freios', obrigatorio: true, status: 'pendente', prioridade: 'critica' },
      { id: 'fre_2', nome: 'Pastilhas de freio traseiras', categoria: 'freios', obrigatorio: true, status: 'pendente', prioridade: 'critica' },
      { id: 'fre_3', nome: 'Discos de freio dianteiros', categoria: 'freios', obrigatorio: true, status: 'pendente', prioridade: 'critica' },
      { id: 'fre_4', nome: 'Discos de freio traseiros', categoria: 'freios', obrigatorio: true, status: 'pendente', prioridade: 'critica' },
      { id: 'fre_5', nome: 'Fluido de freio', categoria: 'freios', obrigatorio: true, status: 'pendente', prioridade: 'critica' },
      { id: 'fre_6', nome: 'Cilindro mestre', categoria: 'freios', obrigatorio: true, status: 'pendente', prioridade: 'critica' },
      { id: 'fre_7', nome: 'Servo freio (hidrovácuo)', categoria: 'freios', obrigatorio: true, status: 'pendente', prioridade: 'alta' },
      { id: 'fre_8', nome: 'Mangueiras de freio', categoria: 'freios', obrigatorio: true, status: 'pendente', prioridade: 'alta' },
      { id: 'fre_9', nome: 'Flexíveis de freio', categoria: 'freios', obrigatorio: true, status: 'pendente', prioridade: 'alta' },
      { id: 'fre_10', nome: 'Freio de estacionamento', categoria: 'freios', obrigatorio: true, status: 'pendente', prioridade: 'critica' },
      { id: 'fre_11', nome: 'Cabo do freio de mão', categoria: 'freios', obrigatorio: true, status: 'pendente', prioridade: 'alta' },
      { id: 'fre_12', nome: 'Sapatas de freio (se aplicável)', categoria: 'freios', obrigatorio: false, status: 'pendente', prioridade: 'critica' },
      { id: 'fre_13', nome: 'Tambores de freio (se aplicável)', categoria: 'freios', obrigatorio: false, status: 'pendente', prioridade: 'alta' },
      { id: 'fre_14', nome: 'ABS (sistema antibloqueio)', categoria: 'freios', obrigatorio: false, status: 'pendente', prioridade: 'alta' }
    ]
  },
  {
    id: 'suspensao_direcao',
    nome: '🔩 SUSPENSÃO E DIREÇÃO',
    descricao: 'Verificações do sistema de suspensão e direção',
    preDiagnostico: [
      {
        id: 'susp_pre_1',
        pergunta: 'O veículo apresenta ruídos na suspensão?',
        tipo: 'sim_nao',
        resposta: false,
        obrigatoria: true
      },
      {
        id: 'susp_pre_2',
        pergunta: 'A direção está dura ou com folgas?',
        tipo: 'sim_nao',
        resposta: false,
        obrigatoria: true
      }
    ],
    itens: [
      { id: 'sus_1', nome: 'Amortecedores dianteiros', categoria: 'suspensao_direcao', obrigatorio: true, status: 'pendente', prioridade: 'alta' },
      { id: 'sus_2', nome: 'Amortecedores traseiros', categoria: 'suspensao_direcao', obrigatorio: true, status: 'pendente', prioridade: 'alta' },
      { id: 'sus_3', nome: 'Molas dianteiras', categoria: 'suspensao_direcao', obrigatorio: true, status: 'pendente', prioridade: 'media' },
      { id: 'sus_4', nome: 'Molas traseiras', categoria: 'suspensao_direcao', obrigatorio: true, status: 'pendente', prioridade: 'media' },
      { id: 'sus_5', nome: 'Buchas do braço de controle', categoria: 'suspensao_direcao', obrigatorio: true, status: 'pendente', prioridade: 'alta' },
      { id: 'sus_6', nome: 'Buchas da barra estabilizadora', categoria: 'suspensao_direcao', obrigatorio: true, status: 'pendente', prioridade: 'media' },
      { id: 'sus_7', nome: 'Pivô da suspensão', categoria: 'suspensao_direcao', obrigatorio: true, status: 'pendente', prioridade: 'critica' },
      { id: 'sus_8', nome: 'Terminais de direção', categoria: 'suspensao_direcao', obrigatorio: true, status: 'pendente', prioridade: 'critica' },
      { id: 'sus_9', nome: 'Bieletas da suspensão', categoria: 'suspensao_direcao', obrigatorio: true, status: 'pendente', prioridade: 'alta' },
      { id: 'sus_10', nome: 'Coxim do amortecedor', categoria: 'suspensao_direcao', obrigatorio: true, status: 'pendente', prioridade: 'media' },
      { id: 'sus_11', nome: 'Rolamento das rodas', categoria: 'suspensao_direcao', obrigatorio: true, status: 'pendente', prioridade: 'alta' },
      { id: 'sus_12', nome: 'Caixa de direção', categoria: 'suspensao_direcao', obrigatorio: true, status: 'pendente', prioridade: 'critica' },
      { id: 'sus_13', nome: 'Bomba da direção hidráulica', categoria: 'suspensao_direcao', obrigatorio: false, status: 'pendente', prioridade: 'alta' },
      { id: 'sus_14', nome: 'Óleo da direção hidráulica', categoria: 'suspensao_direcao', obrigatorio: false, status: 'pendente', prioridade: 'media' },
      { id: 'sus_15', nome: 'Alinhamento das rodas', categoria: 'suspensao_direcao', obrigatorio: true, status: 'pendente', prioridade: 'alta' },
      { id: 'sus_16', nome: 'Balanceamento das rodas', categoria: 'suspensao_direcao', obrigatorio: true, status: 'pendente', prioridade: 'alta' }
    ]
  },
  {
    id: 'pneus_rodas',
    nome: '🛞 PNEUS E RODAS',
    descricao: 'Verificações dos pneus, rodas e sistemas relacionados',
    preDiagnostico: [
      {
        id: 'pneu_pre_1',
        pergunta: 'Os pneus apresentam desgaste irregular?',
        tipo: 'sim_nao',
        resposta: false,
        obrigatoria: true
      },
      {
        id: 'pneu_pre_2',
        pergunta: 'Há vibrações no volante em alta velocidade?',
        tipo: 'sim_nao',
        resposta: false,
        obrigatoria: false
      }
    ],
    itens: [
      { id: 'pne_1', nome: 'Pneu dianteiro direito', categoria: 'pneus_rodas', obrigatorio: true, status: 'pendente', prioridade: 'critica' },
      { id: 'pne_2', nome: 'Pneu dianteiro esquerdo', categoria: 'pneus_rodas', obrigatorio: true, status: 'pendente', prioridade: 'critica' },
      { id: 'pne_3', nome: 'Pneu traseiro direito', categoria: 'pneus_rodas', obrigatorio: true, status: 'pendente', prioridade: 'critica' },
      { id: 'pne_4', nome: 'Pneu traseiro esquerdo', categoria: 'pneus_rodas', obrigatorio: true, status: 'pendente', prioridade: 'critica' },
      { id: 'pne_5', nome: 'Pneu estepe', categoria: 'pneus_rodas', obrigatorio: true, status: 'pendente', prioridade: 'alta' },
      { id: 'pne_6', nome: 'Pressão dos pneus', categoria: 'pneus_rodas', obrigatorio: true, status: 'pendente', prioridade: 'critica' },
      { id: 'pne_7', nome: 'Roda dianteira direita', categoria: 'pneus_rodas', obrigatorio: true, status: 'pendente', prioridade: 'alta' },
      { id: 'pne_8', nome: 'Roda dianteira esquerda', categoria: 'pneus_rodas', obrigatorio: true, status: 'pendente', prioridade: 'alta' },
      { id: 'pne_9', nome: 'Roda traseira direita', categoria: 'pneus_rodas', obrigatorio: true, status: 'pendente', prioridade: 'alta' },
      { id: 'pne_10', nome: 'Roda traseira esquerda', categoria: 'pneus_rodas', obrigatorio: true, status: 'pendente', prioridade: 'alta' },
      { id: 'pne_11', nome: 'Roda do estepe', categoria: 'pneus_rodas', obrigatorio: true, status: 'pendente', prioridade: 'media' },
      { id: 'pne_12', nome: 'Válvulas dos pneus', categoria: 'pneus_rodas', obrigatorio: true, status: 'pendente', prioridade: 'media' },
      { id: 'pne_13', nome: 'Porcas de roda', categoria: 'pneus_rodas', obrigatorio: true, status: 'pendente', prioridade: 'critica' },
      { id: 'pne_14', nome: 'Macaco', categoria: 'pneus_rodas', obrigatorio: true, status: 'pendente', prioridade: 'media' },
      { id: 'pne_15', nome: 'Chave de roda', categoria: 'pneus_rodas', obrigatorio: true, status: 'pendente', prioridade: 'media' }
    ]
  },
  {
    id: 'eletrico_eletronica',
    nome: '🔌 SISTEMA ELÉTRICO E ELETRÔNICA',
    descricao: 'Verificações do sistema elétrico e componentes eletrônicos',
    preDiagnostico: [
      {
        id: 'elet_pre_1',
        pergunta: 'A bateria descarrega rapidamente?',
        tipo: 'sim_nao',
        resposta: false,
        obrigatoria: true
      },
      {
        id: 'elet_pre_2',
        pergunta: 'Há luzes do painel acesas constantemente?',
        tipo: 'sim_nao',
        resposta: false,
        obrigatoria: true
      }
    ],
    itens: [
      { id: 'ele_1', nome: 'Bateria (estado e carga)', categoria: 'eletrico_eletronica', obrigatorio: true, status: 'pendente', prioridade: 'critica' },
      { id: 'ele_2', nome: 'Alternador', categoria: 'eletrico_eletronica', obrigatorio: true, status: 'pendente', prioridade: 'critica' },
      { id: 'ele_3', nome: 'Motor de arranque', categoria: 'eletrico_eletronica', obrigatorio: true, status: 'pendente', prioridade: 'critica' },
      { id: 'ele_4', nome: 'Regulador de voltagem', categoria: 'eletrico_eletronica', obrigatorio: true, status: 'pendente', prioridade: 'alta' },
      { id: 'ele_5', nome: 'Fusíveis principais', categoria: 'eletrico_eletronica', obrigatorio: true, status: 'pendente', prioridade: 'alta' },
      { id: 'ele_6', nome: 'Relés principais', categoria: 'eletrico_eletronica', obrigatorio: true, status: 'pendente', prioridade: 'alta' },
      { id: 'ele_7', nome: 'Fiação geral', categoria: 'eletrico_eletronica', obrigatorio: true, status: 'pendente', prioridade: 'media' },
      { id: 'ele_8', nome: 'Chicote elétrico', categoria: 'eletrico_eletronica', obrigatorio: true, status: 'pendente', prioridade: 'media' },
      { id: 'ele_9', nome: 'Central de injeção (ECU)', categoria: 'eletrico_eletronica', obrigatorio: true, status: 'pendente', prioridade: 'alta' },
      { id: 'ele_10', nome: 'Sensores do motor', categoria: 'eletrico_eletronica', obrigatorio: true, status: 'pendente', prioridade: 'alta' },
      { id: 'ele_11', nome: 'Sensor de oxigênio (sonda lambda)', categoria: 'eletrico_eletronica', obrigatorio: true, status: 'pendente', prioridade: 'alta' },
      { id: 'ele_12', nome: 'Sensor de temperatura', categoria: 'eletrico_eletronica', obrigatorio: true, status: 'pendente', prioridade: 'alta' },
      { id: 'ele_13', nome: 'Sensor de rotação', categoria: 'eletrico_eletronica', obrigatorio: true, status: 'pendente', prioridade: 'critica' },
      { id: 'ele_14', nome: 'Bicos injetores', categoria: 'eletrico_eletronica', obrigatorio: true, status: 'pendente', prioridade: 'alta' }
    ]
  },
  {
    id: 'iluminacao_sinalizacao',
    nome: '💡 ILUMINAÇÃO E SINALIZAÇÃO',
    descricao: 'Verificações do sistema de iluminação e sinalização',
    preDiagnostico: [
      {
        id: 'ilum_pre_1',
        pergunta: 'Alguma lâmpada não está funcionando?',
        tipo: 'sim_nao',
        resposta: false,
        obrigatoria: true
      }
    ],
    itens: [
      { id: 'ilu_1', nome: 'Farol baixo direito', categoria: 'iluminacao_sinalizacao', obrigatorio: true, status: 'pendente', prioridade: 'critica' },
      { id: 'ilu_2', nome: 'Farol baixo esquerdo', categoria: 'iluminacao_sinalizacao', obrigatorio: true, status: 'pendente', prioridade: 'critica' },
      { id: 'ilu_3', nome: 'Farol alto direito', categoria: 'iluminacao_sinalizacao', obrigatorio: true, status: 'pendente', prioridade: 'critica' },
      { id: 'ilu_4', nome: 'Farol alto esquerdo', categoria: 'iluminacao_sinalizacao', obrigatorio: true, status: 'pendente', prioridade: 'critica' },
      { id: 'ilu_5', nome: 'Lanterna traseira direita', categoria: 'iluminacao_sinalizacao', obrigatorio: true, status: 'pendente', prioridade: 'critica' },
      { id: 'ilu_6', nome: 'Lanterna traseira esquerda', categoria: 'iluminacao_sinalizacao', obrigatorio: true, status: 'pendente', prioridade: 'critica' },
      { id: 'ilu_7', nome: 'Luz de freio central', categoria: 'iluminacao_sinalizacao', obrigatorio: true, status: 'pendente', prioridade: 'critica' },
      { id: 'ilu_8', nome: 'Luz de freio direita', categoria: 'iluminacao_sinalizacao', obrigatorio: true, status: 'pendente', prioridade: 'critica' },
      { id: 'ilu_9', nome: 'Luz de freio esquerda', categoria: 'iluminacao_sinalizacao', obrigatorio: true, status: 'pendente', prioridade: 'critica' },
      { id: 'ilu_10', nome: 'Pisca dianteiro direito', categoria: 'iluminacao_sinalizacao', obrigatorio: true, status: 'pendente', prioridade: 'critica' },
      { id: 'ilu_11', nome: 'Pisca dianteiro esquerdo', categoria: 'iluminacao_sinalizacao', obrigatorio: true, status: 'pendente', prioridade: 'critica' },
      { id: 'ilu_12', nome: 'Pisca traseiro direito', categoria: 'iluminacao_sinalizacao', obrigatorio: true, status: 'pendente', prioridade: 'critica' },
      { id: 'ilu_13', nome: 'Pisca traseiro esquerdo', categoria: 'iluminacao_sinalizacao', obrigatorio: true, status: 'pendente', prioridade: 'critica' },
      { id: 'ilu_14', nome: 'Luz de ré', categoria: 'iluminacao_sinalizacao', obrigatorio: true, status: 'pendente', prioridade: 'alta' },
      { id: 'ilu_15', nome: 'Luz da placa', categoria: 'iluminacao_sinalizacao', obrigatorio: true, status: 'pendente', prioridade: 'alta' },
      { id: 'ilu_16', nome: 'Luz interna', categoria: 'iluminacao_sinalizacao', obrigatorio: true, status: 'pendente', prioridade: 'media' },
      { id: 'ilu_17', nome: 'Luz do porta-malas', categoria: 'iluminacao_sinalizacao', obrigatorio: false, status: 'pendente', prioridade: 'baixa' },
      { id: 'ilu_18', nome: 'Luzes do painel', categoria: 'iluminacao_sinalizacao', obrigatorio: true, status: 'pendente', prioridade: 'alta' }
    ]
  },
  {
    id: 'carroceria_vidros',
    nome: '🚘 CARROCERIA E VIDROS',
    descricao: 'Verificações da estrutura, pintura e vidros',
    preDiagnostico: [
      {
        id: 'carr_pre_1',
        pergunta: 'Há sinais de ferrugem na carroceria?',
        tipo: 'sim_nao',
        resposta: false,
        obrigatoria: false
      },
      {
        id: 'carr_pre_2',
        pergunta: 'Algum vidro está trincado ou danificado?',
        tipo: 'sim_nao',
        resposta: false,
        obrigatoria: true
      }
    ],
    itens: [
      { id: 'car_1', nome: 'Pintura geral', categoria: 'carroceria_vidros', obrigatorio: true, status: 'pendente', prioridade: 'baixa' },
      { id: 'car_2', nome: 'Para-choque dianteiro', categoria: 'carroceria_vidros', obrigatorio: true, status: 'pendente', prioridade: 'media' },
      { id: 'car_3', nome: 'Para-choque traseiro', categoria: 'carroceria_vidros', obrigatorio: true, status: 'pendente', prioridade: 'media' },
      { id: 'car_4', nome: 'Porta dianteira direita', categoria: 'carroceria_vidros', obrigatorio: true, status: 'pendente', prioridade: 'media' },
      { id: 'car_5', nome: 'Porta dianteira esquerda', categoria: 'carroceria_vidros', obrigatorio: true, status: 'pendente', prioridade: 'media' },
      { id: 'car_6', nome: 'Porta traseira direita', categoria: 'carroceria_vidros', obrigatorio: false, status: 'pendente', prioridade: 'media' },
      { id: 'car_7', nome: 'Porta traseira esquerda', categoria: 'carroceria_vidros', obrigatorio: false, status: 'pendente', prioridade: 'media' },
      { id: 'car_8', nome: 'Capô', categoria: 'carroceria_vidros', obrigatorio: true, status: 'pendente', prioridade: 'media' },
      { id: 'car_9', nome: 'Porta-malas/Tampa traseira', categoria: 'carroceria_vidros', obrigatorio: true, status: 'pendente', prioridade: 'media' },
      { id: 'car_10', nome: 'Para-brisa', categoria: 'carroceria_vidros', obrigatorio: true, status: 'pendente', prioridade: 'critica' },
      { id: 'car_11', nome: 'Vidro traseiro', categoria: 'carroceria_vidros', obrigatorio: true, status: 'pendente', prioridade: 'alta' },
      { id: 'car_12', nome: 'Vidros laterais', categoria: 'carroceria_vidros', obrigatorio: true, status: 'pendente', prioridade: 'alta' },
      { id: 'car_13', nome: 'Espelhos retrovisores', categoria: 'carroceria_vidros', obrigatorio: true, status: 'pendente', prioridade: 'critica' },
      { id: 'car_14', nome: 'Dobradiças das portas', categoria: 'carroceria_vidros', obrigatorio: true, status: 'pendente', prioridade: 'media' },
      { id: 'car_15', nome: 'Fechaduras das portas', categoria: 'carroceria_vidros', obrigatorio: true, status: 'pendente', prioridade: 'alta' },
      { id: 'car_16', nome: 'Borrachas de vedação', categoria: 'carroceria_vidros', obrigatorio: true, status: 'pendente', prioridade: 'media' }
    ]
  },
  {
    id: 'interior_acessorios',
    nome: '🏠 INTERIOR E ACESSÓRIOS',
    descricao: 'Verificações do interior e sistemas de conforto',
    preDiagnostico: [
      {
        id: 'int_pre_1',
        pergunta: 'O ar condicionado está funcionando adequadamente?',
        tipo: 'sim_nao',
        resposta: false,
        obrigatoria: false
      },
      {
        id: 'int_pre_2',
        pergunta: 'Há algum equipamento do painel com defeito?',
        tipo: 'sim_nao',
        resposta: false,
        obrigatoria: true
      }
    ],
    itens: [
      { id: 'int_1', nome: 'Ar condicionado', categoria: 'interior_acessorios', obrigatorio: false, status: 'pendente', prioridade: 'media' },
      { id: 'int_2', nome: 'Aquecedor/Desembaçador', categoria: 'interior_acessorios', obrigatorio: true, status: 'pendente', prioridade: 'alta' },
      { id: 'int_3', nome: 'Ventilação forçada', categoria: 'interior_acessorios', obrigatorio: true, status: 'pendente', prioridade: 'media' },
      { id: 'int_4', nome: 'Limpador do para-brisa', categoria: 'interior_acessorios', obrigatorio: true, status: 'pendente', prioridade: 'critica' },
      { id: 'int_5', nome: 'Esguicho do para-brisa', categoria: 'interior_acessorios', obrigatorio: true, status: 'pendente', prioridade: 'alta' },
      { id: 'int_6', nome: 'Limpador traseiro', categoria: 'interior_acessorios', obrigatorio: false, status: 'pendente', prioridade: 'media' },
      { id: 'int_7', nome: 'Buzina', categoria: 'interior_acessorios', obrigatorio: true, status: 'pendente', prioridade: 'alta' },
      { id: 'int_8', nome: 'Painel de instrumentos', categoria: 'interior_acessorios', obrigatorio: true, status: 'pendente', prioridade: 'alta' },
      { id: 'int_9', nome: 'Velocímetro', categoria: 'interior_acessorios', obrigatorio: true, status: 'pendente', prioridade: 'critica' },
      { id: 'int_10', nome: 'Hodômetro', categoria: 'interior_acessorios', obrigatorio: true, status: 'pendente', prioridade: 'alta' },
      { id: 'int_11', nome: 'Indicador de combustível', categoria: 'interior_acessorios', obrigatorio: true, status: 'pendente', prioridade: 'alta' },
      { id: 'int_12', nome: 'Indicador de temperatura', categoria: 'interior_acessorios', obrigatorio: true, status: 'pendente', prioridade: 'critica' },
      { id: 'int_13', nome: 'Rádio/Sistema de som', categoria: 'interior_acessorios', obrigatorio: false, status: 'pendente', prioridade: 'baixa' },
      { id: 'int_14', nome: 'Vidros elétricos', categoria: 'interior_acessorios', obrigatorio: false, status: 'pendente', prioridade: 'media' },
      { id: 'int_15', nome: 'Travas elétricas', categoria: 'interior_acessorios', obrigatorio: false, status: 'pendente', prioridade: 'media' },
      { id: 'int_16', nome: 'Bancos (estado e regulagem)', categoria: 'interior_acessorios', obrigatorio: true, status: 'pendente', prioridade: 'media' },
      { id: 'int_17', nome: 'Cintos de segurança', categoria: 'interior_acessorios', obrigatorio: true, status: 'pendente', prioridade: 'critica' }
    ]
  },
  {
    id: 'seguranca_emergencia',
    nome: '🛡️ SEGURANÇA E EMERGÊNCIA',
    descricao: 'Verificações dos itens de segurança obrigatórios',
    preDiagnostico: [
      {
        id: 'seg_pre_1',
        pergunta: 'Todos os itens de segurança estão dentro do prazo de validade?',
        tipo: 'sim_nao',
        resposta: false,
        obrigatoria: true
      }
    ],
    itens: [
      { id: 'seg_1', nome: 'Extintor de incêndio', categoria: 'seguranca_emergencia', obrigatorio: true, status: 'pendente', prioridade: 'critica' },
      { id: 'seg_2', nome: 'Triângulo de segurança', categoria: 'seguranca_emergencia', obrigatorio: true, status: 'pendente', prioridade: 'critica' },
      { id: 'seg_3', nome: 'Chave de fenda/Phillips', categoria: 'seguranca_emergencia', obrigatorio: true, status: 'pendente', prioridade: 'media' },
      { id: 'seg_4', nome: 'Airbags', categoria: 'seguranca_emergencia', obrigatorio: false, status: 'pendente', prioridade: 'alta' },
      { id: 'seg_5', nome: 'Documentação do veículo', categoria: 'seguranca_emergencia', obrigatorio: true, status: 'pendente', prioridade: 'critica' },
      { id: 'seg_6', nome: 'Kit primeiros socorros', categoria: 'seguranca_emergencia', obrigatorio: false, status: 'pendente', prioridade: 'media' },
      { id: 'seg_7', nome: 'Lanterna', categoria: 'seguranca_emergencia', obrigatorio: false, status: 'pendente', prioridade: 'baixa' },
      { id: 'seg_8', nome: 'Cabo para bateria', categoria: 'seguranca_emergencia', obrigatorio: false, status: 'pendente', prioridade: 'baixa' }
    ]
  },
  {
    id: 'escapamento_emisoes',
    nome: '💨 ESCAPAMENTO E EMISSÕES',
    descricao: 'Verificações do sistema de escapamento e controle de emissões',
    preDiagnostico: [
      {
        id: 'esc_pre_1',
        pergunta: 'O escapamento produz fumaça excessiva?',
        tipo: 'sim_nao',
        resposta: false,
        obrigatoria: true
      },
      {
        id: 'esc_pre_2',
        pergunta: 'Há ruídos anormais no escapamento?',
        tipo: 'sim_nao',
        resposta: false,
        obrigatoria: true
      }
    ],
    itens: [
      { id: 'esc_1', nome: 'Coletor de escapamento', categoria: 'escapamento_emisoes', obrigatorio: true, status: 'pendente', prioridade: 'alta' },
      { id: 'esc_2', nome: 'Catalisador', categoria: 'escapamento_emisoes', obrigatorio: true, status: 'pendente', prioridade: 'critica' },
      { id: 'esc_3', nome: 'Silencioso intermediário', categoria: 'escapamento_emisoes', obrigatorio: true, status: 'pendente', prioridade: 'media' },
      { id: 'esc_4', nome: 'Silencioso traseiro', categoria: 'escapamento_emisoes', obrigatorio: true, status: 'pendente', prioridade: 'media' },
      { id: 'esc_5', nome: 'Tubulação do escapamento', categoria: 'escapamento_emisoes', obrigatorio: true, status: 'pendente', prioridade: 'alta' },
      { id: 'esc_6', nome: 'Fixações do escapamento', categoria: 'escapamento_emisoes', obrigatorio: true, status: 'pendente', prioridade: 'media' },
      { id: 'esc_7', nome: 'Sistema de recirculação (EGR)', categoria: 'escapamento_emisoes', obrigatorio: false, status: 'pendente', prioridade: 'media' },
      { id: 'esc_8', nome: 'Cânister (filtro de carvão)', categoria: 'escapamento_emisoes', obrigatorio: false, status: 'pendente', prioridade: 'media' }
    ]
  }
];