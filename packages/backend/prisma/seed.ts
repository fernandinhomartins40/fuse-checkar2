import { PrismaClient, Role, StatusCliente, StatusVeiculo, StatusRevisao } from '@prisma/client';
import { hashPassword } from '../src/utils/bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...\n');

  // ============================================
  // 1. Create Users
  // ============================================

  console.log('👤 Creating users...');

  // Admin User
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@fusecheckar.com' },
    update: {},
    create: {
      email: 'admin@fusecheckar.com',
      senha: await hashPassword('Admin@123'),
      role: Role.ADMIN,
      isActive: true,
      emailVerified: true,
    },
  });
  console.log(`  ✓ Admin: ${adminUser.email}`);

  // Mecânico User
  const mecanicoUser = await prisma.user.upsert({
    where: { email: 'mecanico@fusecheckar.com' },
    update: {},
    create: {
      email: 'mecanico@fusecheckar.com',
      senha: await hashPassword('Mecanico@123'),
      role: Role.MECANICO,
      isActive: true,
      emailVerified: true,
    },
  });
  console.log(`  ✓ Mecânico: ${mecanicoUser.email}`);

  // ============================================
  // 2. Create Clientes
  // ============================================

  console.log('\n👥 Creating clientes...');

  const clientes = [];

  for (let i = 1; i <= 5; i++) {
    const clienteUser = await prisma.user.upsert({
      where: { email: `cliente${i}@example.com` },
      update: {},
      create: {
        email: `cliente${i}@example.com`,
        senha: await hashPassword('Cliente@123'),
        role: Role.CLIENTE,
        isActive: true,
        emailVerified: true,
      },
    });

    const cliente = await prisma.cliente.upsert({
      where: { email: `cliente${i}@example.com` },
      update: {},
      create: {
        userId: clienteUser.id,
        nome: `Cliente${i}`,
        sobrenome: `Silva${i}`,
        email: `cliente${i}@example.com`,
        cpf: `${String(i).padStart(3, '0')}.${String(i).padStart(3, '0')}.${String(i).padStart(3, '0')}-${String(i).padStart(2, '0')}`,
        telefone: `(11) 9${String(i).padStart(4, '0')}-${String(i).padStart(4, '0')}`,
        dataNascimento: new Date(1990 + i, i - 1, i),
        cep: `01${String(i).padStart(3, '0')}-${String(i).padStart(3, '0')}`,
        endereco: `Rua Teste ${i}`,
        numero: `${i * 100}`,
        complemento: i % 2 === 0 ? `Apto ${i * 10}` : null,
        bairro: `Bairro ${i}`,
        cidade: i % 2 === 0 ? 'São Paulo' : 'Rio de Janeiro',
        estado: i % 2 === 0 ? 'SP' : 'RJ',
        status: StatusCliente.ATIVO,
      },
    });

    clientes.push(cliente);
    console.log(`  ✓ Cliente ${i}: ${cliente.nome} ${cliente.sobrenome}`);
  }

  // ============================================
  // 3. Create Veículos
  // ============================================

  console.log('\n🚗 Creating veículos...');

  const veiculos = [];
  const marcas = ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'Volkswagen'];
  const modelos = ['Corolla', 'Civic', 'Focus', 'Cruze', 'Golf'];
  const cores = ['Preto', 'Branco', 'Prata', 'Azul', 'Vermelho'];

  for (let i = 0; i < clientes.length; i++) {
    const veiculo = await prisma.veiculo.create({
      data: {
        clienteId: clientes[i].id,
        placa: `ABC${String(i + 1).padStart(4, '0')}`,
        marca: marcas[i],
        modelo: modelos[i],
        ano: 2020 + i,
        cor: cores[i],
        quilometragem: 10000 + (i * 5000),
        chassi: `9BW${String(i + 1).padStart(14, '0')}`,
        renavam: `${String(i + 1).padStart(11, '0')}`,
        status: StatusVeiculo.ATIVO,
      },
    });

    veiculos.push(veiculo);
    console.log(`  ✓ Veículo ${i + 1}: ${veiculo.marca} ${veiculo.modelo} (${veiculo.placa})`);
  }

  // ============================================
  // 4. Create Revisões
  // ============================================

  console.log('\n🔧 Creating revisões...');

  const statusList = [
    StatusRevisao.PENDENTE,
    StatusRevisao.EM_ANDAMENTO,
    StatusRevisao.AGUARDANDO_PECAS,
    StatusRevisao.CONCLUIDA,
    StatusRevisao.CANCELADA,
  ];

  for (let i = 0; i < veiculos.length; i++) {
    const revisao = await prisma.revisao.create({
      data: {
        veiculoId: veiculos[i].id,
        clienteId: clientes[i].id,
        mecanicoId: i % 2 === 0 ? mecanicoUser.id : null,
        tipo: i % 2 === 0 ? 'PREVENTIVA' : 'CORRETIVA',
        descricao: `Revisão ${i % 2 === 0 ? 'preventiva' : 'corretiva'} - ${i + 1}`,
        quilometragemAtual: veiculos[i].quilometragem,
        status: statusList[i],
        dataAgendamento: new Date(Date.now() + (i * 86400000)), // i days from now
        dataInicio: i >= 1 ? new Date(Date.now() - (i * 86400000)) : null,
        dataFim: i >= 3 ? new Date(Date.now() - ((i - 2) * 86400000)) : null,
        observacoes: `Observações da revisão ${i + 1}`,
        valorEstimado: 500 + (i * 100),
        valorFinal: i >= 3 ? 550 + (i * 100) : null,
      },
    });

    console.log(`  ✓ Revisão ${i + 1}: ${revisao.tipo} - Status: ${revisao.status}`);

    // Create itens for some revisões
    if (i >= 1) {
      await prisma.itemRevisao.createMany({
        data: [
          {
            revisaoId: revisao.id,
            descricao: 'Troca de óleo',
            tipo: 'SERVICO',
            quantidade: 1,
            valorUnitario: 150,
            valorTotal: 150,
            observacoes: 'Óleo sintético 5W30',
          },
          {
            revisaoId: revisao.id,
            descricao: 'Filtro de óleo',
            tipo: 'PECA',
            quantidade: 1,
            valorUnitario: 50,
            valorTotal: 50,
            observacoes: 'Filtro original',
          },
        ],
      });
    }
  }

  // ============================================
  // 5. Create Históricos
  // ============================================

  console.log('\n📋 Creating históricos...');

  for (let i = 0; i < veiculos.length; i++) {
    await prisma.historicoVeiculo.create({
      data: {
        veiculoId: veiculos[i].id,
        tipo: 'MANUTENCAO',
        descricao: `Manutenção preventiva ${i + 1}`,
        quilometragem: veiculos[i].quilometragem - 5000,
        valor: 300 + (i * 50),
        data: new Date(Date.now() - (30 * 86400000)), // 30 days ago
        observacoes: `Histórico de manutenção ${i + 1}`,
      },
    });

    console.log(`  ✓ Histórico ${i + 1}: Veículo ${veiculos[i].placa}`);
  }

  // ============================================
  // Statistics
  // ============================================

  console.log('\n📊 Seed Summary:');
  console.log(`  • ${await prisma.user.count()} users created`);
  console.log(`  • ${await prisma.cliente.count()} clientes created`);
  console.log(`  • ${await prisma.veiculo.count()} veículos created`);
  console.log(`  • ${await prisma.revisao.count()} revisões created`);
  console.log(`  • ${await prisma.itemRevisao.count()} itens de revisão created`);
  console.log(`  • ${await prisma.historicoVeiculo.count()} históricos created`);

  console.log('\n✅ Database seeded successfully!\n');
  console.log('📝 Test Credentials:');
  console.log('   Admin:    admin@fusecheckar.com / Admin@123');
  console.log('   Mecânico: mecanico@fusecheckar.com / Mecanico@123');
  console.log('   Cliente:  cliente1@example.com / Cliente@123');
  console.log('             cliente2@example.com / Cliente@123');
  console.log('             ... (up to cliente5@example.com)\n');
}

main()
  .catch((error) => {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
