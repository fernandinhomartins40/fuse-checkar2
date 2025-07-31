/**
 * FUSE CHECKAR2 - Client Dashboard Page
 */

export default class ClienteDashboardPage {
  constructor() {
    this.title = 'Dashboard - Portal do Cliente';
    this.data = {
      profile: {},
      vehicles: [],
      reviews: [],
      recommendations: []
    };
    this.render();
    this.bindEvents();
    this.loadData();
  }

  render() {
    const app = document.getElementById('app');
    
    app.innerHTML = `
      <div class="min-h-screen bg-gray-50">
        <!-- Client Header -->
        <header class="bg-white shadow-sm border-b border-gray-200">
          <div class="container mx-auto px-4 py-4">
            <div class="flex justify-between items-center">
              <div class="flex items-center space-x-4">
                <a href="/" class="flex items-center space-x-2">
                  <span class="material-symbols-outlined text-2xl text-primary">directions_car</span>
                  <span class="text-xl font-bold text-primary">CHECAR</span>
                </a>
                <span class="text-gray-300">|</span>
                <h1 class="text-lg font-semibold text-gray-800">Portal do Cliente</h1>
              </div>
              
              <div class="flex items-center space-x-4">
                <div class="flex items-center space-x-2 text-sm text-gray-600">
                  <span class="material-symbols-outlined text-sm">person</span>
                  <span id="client-name">Carregando...</span>
                </div>
                <button id="logout-btn" class="btn btn-outline btn-sm">
                  <span class="material-symbols-outlined mr-1">logout</span>
                  Sair
                </button>
              </div>
            </div>
          </div>
        </header>

        <div class="container mx-auto px-4 py-6">
          <!-- Navigation -->
          <nav class="mb-6">
            <div class="flex space-x-1 bg-white rounded-lg p-1 shadow-sm">
              <a href="/cliente/dashboard" class="nav-link active">
                <span class="material-symbols-outlined mr-2">dashboard</span>
                Dashboard
              </a>
              <a href="/cliente/veiculos" class="nav-link">
                <span class="material-symbols-outlined mr-2">directions_car</span>
                Meus Veículos
              </a>
              <a href="/cliente/revisoes" class="nav-link">
                <span class="material-symbols-outlined mr-2">build</span>
                Revisões
              </a>
              <a href="/cliente/recomendacoes" class="nav-link">
                <span class="material-symbols-outlined mr-2">lightbulb</span>
                Recomendações
              </a>
              <a href="/cliente/perfil" class="nav-link">
                <span class="material-symbols-outlined mr-2">person</span>
                Perfil
              </a>
            </div>
          </nav>

          <!-- Welcome Message -->
          <div class="card bg-gradient-to-r from-primary to-blue-600 text-white mb-6">
            <div class="card-content">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div>
                  <h1 class="text-2xl font-bold mb-2" id="welcome-message">
                    Bem-vindo ao CHECAR!
                  </h1>
                  <p class="text-blue-100">
                    Acompanhe suas revisões, veículos e recomendações em tempo real.
                  </p>
                </div>
                <div class="text-center">
                  <span class="material-symbols-outlined text-6xl text-blue-200">directions_car</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Stats Cards -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div class="card">
              <div class="card-content">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-gray-600 text-sm">Meus Veículos</p>
                    <p class="text-2xl font-bold text-gray-900" id="total-vehicles">-</p>
                  </div>
                  <span class="material-symbols-outlined text-3xl text-primary">directions_car</span>
                </div>
              </div>
            </div>

            <div class="card">
              <div class="card-content">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-gray-600 text-sm">Revisões Realizadas</p>
                    <p class="text-2xl font-bold text-gray-900" id="total-reviews">-</p>
                  </div>
                  <span class="material-symbols-outlined text-3xl text-green-500">build</span>
                </div>
              </div>
            </div>

            <div class="card">
              <div class="card-content">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-gray-600 text-sm">Próxima Revisão</p>
                    <p class="text-sm font-medium text-gray-900" id="next-review">-</p>
                  </div>
                  <span class="material-symbols-outlined text-3xl text-yellow-500">schedule</span>
                </div>
              </div>
            </div>

            <div class="card">
              <div class="card-content">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-gray-600 text-sm">Recomendações</p>
                    <p class="text-2xl font-bold text-gray-900" id="total-recommendations">-</p>
                  </div>
                  <span class="material-symbols-outlined text-3xl text-purple-500">lightbulb</span>
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Recent Reviews -->
            <div class="lg:col-span-2">
              <div class="card">
                <div class="card-header flex justify-between items-center">
                  <h2 class="card-title">Revisões Recentes</h2>
                  <a href="/cliente/revisoes" class="text-primary hover:text-primary-hover text-sm">
                    Ver todas
                  </a>
                </div>
                <div class="card-content" id="recent-reviews">
                  <div class="flex items-center justify-center py-8">
                    <div class="spinner mr-3"></div>
                    Carregando revisões...
                  </div>
                </div>
              </div>
            </div>

            <!-- Sidebar -->
            <div class="space-y-6">
              <!-- My Vehicles -->
              <div class="card">
                <div class="card-header flex justify-between items-center">
                  <h2 class="card-title">Meus Veículos</h2>
                  <a href="/cliente/veiculos" class="text-primary hover:text-primary-hover text-sm">
                    Ver todos
                  </a>
                </div>
                <div class="card-content" id="my-vehicles">
                  <div class="flex items-center justify-center py-4 text-gray-500">
                    <span class="material-symbols-outlined mr-2">directions_car</span>
                    Carregando veículos...
                  </div>
                </div>
              </div>

              <!-- Latest Recommendations -->
              <div class="card">
                <div class="card-header flex justify-between items-center">
                  <h2 class="card-title">Recomendações</h2>
                  <a href="/cliente/recomendacoes" class="text-primary hover:text-primary-hover text-sm">
                    Ver todas
                  </a>
                </div>
                <div class="card-content" id="latest-recommendations">
                  <div class="flex items-center justify-center py-4 text-gray-500">
                    <span class="material-symbols-outlined mr-2">lightbulb</span>
                    Carregando recomendações...
                  </div>
                </div>
              </div>

              <!-- Quick Actions -->
              <div class="card">
                <div class="card-header">
                  <h2 class="card-title">Ações Rápidas</h2>
                </div>
                <div class="card-content space-y-3">
                  <a href="/cliente/revisoes" class="btn btn-primary w-full">
                    <span class="material-symbols-outlined mr-2">build</span>
                    Ver Revisões
                  </a>
                  <a href="/cliente/veiculos" class="btn btn-outline w-full">
                    <span class="material-symbols-outlined mr-2">directions_car</span>
                    Meus Veículos
                  </a>
                  <a href="/cliente/perfil" class="btn btn-outline w-full">
                    <span class="material-symbols-outlined mr-2">person</span>
                    Editar Perfil
                  </a>
                  <button onclick="this.scheduleReview()" class="btn btn-success w-full">
                    <span class="material-symbols-outlined mr-2">add_circle</span>
                    Agendar Revisão
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  bindEvents() {
    // Logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', this.handleLogout.bind(this));
    }

    // Navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        window.router.navigate(href);
      });
    });
  }

  async loadData() {
    try {
      // Load user info
      this.loadUserInfo();
      
      // Load dashboard data
      await this.loadDashboardStats();
      
      // Load recent reviews
      await this.loadRecentReviews();
      
      // Load vehicles
      await this.loadMyVehicles();
      
      // Load recommendations
      await this.loadLatestRecommendations();
      
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      window.Toast.error('Erro ao carregar dados do dashboard');
    }
  }

  loadUserInfo() {
    const user = window.auth.getUser();
    const clientNameEl = document.getElementById('client-name');
    const welcomeMessageEl = document.getElementById('welcome-message');
    
    if (user) {
      const name = user.nome || user.email?.split('@')[0] || 'Cliente';
      if (clientNameEl) clientNameEl.textContent = name;
      if (welcomeMessageEl) welcomeMessageEl.textContent = `Bem-vindo, ${name}!`;
    }
  }

  async loadDashboardStats() {
    try {
      // Simulate API call - replace with actual API calls
      const stats = {
        totalVehicles: 2,
        totalReviews: 8,
        nextReview: '15/08/2024',
        totalRecommendations: 3
      };

      // Update stats in UI
      document.getElementById('total-vehicles').textContent = stats.totalVehicles;
      document.getElementById('total-reviews').textContent = stats.totalReviews;
      document.getElementById('next-review').textContent = stats.nextReview;
      document.getElementById('total-recommendations').textContent = stats.totalRecommendations;

    } catch (error) {
      console.error('Error loading stats:', error);
    }
  }

  async loadRecentReviews() {
    try {
      // Simulate API call - replace with actual API calls
      const reviews = [
        {
          id: 1,
          vehicle: 'Honda Civic 2020',
          date: '2024-07-20',
          status: 'concluida',
          type: 'Revisão Completa',
          mechanic: 'João Mecânico'
        },
        {
          id: 2,
          vehicle: 'Toyota Corolla 2019',
          date: '2024-06-15',
          status: 'concluida',
          type: 'Troca de Óleo',
          mechanic: 'Maria Mecânica'
        },
        {
          id: 3,
          vehicle: 'Honda Civic 2020',
          date: '2024-05-10',
          status: 'concluida',
          type: 'Revisão dos 10.000km',
          mechanic: 'João Mecânico'
        }
      ];

      const reviewsContainer = document.getElementById('recent-reviews');
      
      if (reviews.length === 0) {
        reviewsContainer.innerHTML = `
          <div class="text-center py-8 text-gray-500">
            <span class="material-symbols-outlined text-4xl mb-2">build</span>
            <h3 class="font-medium mb-2">Nenhuma revisão encontrada</h3>
            <p class="text-sm">Suas revisões aparecerão aqui.</p>
          </div>
        `;
        return;
      }

      reviewsContainer.innerHTML = `
        <div class="space-y-4">
          ${reviews.map(review => `
            <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div class="flex items-center space-x-4">
                <div class="p-2 bg-white rounded-lg">
                  <span class="material-symbols-outlined text-primary">build</span>
                </div>
                <div>
                  <h4 class="font-medium text-gray-900">${review.type}</h4>
                  <p class="text-sm text-gray-600">${review.vehicle}</p>
                  <p class="text-xs text-gray-500">
                    ${this.formatDate(review.date)} • ${review.mechanic}
                  </p>
                </div>
              </div>
              <div class="text-right">
                <span class="px-2 py-1 text-xs rounded-full ${this.getStatusClasses(review.status)}">
                  ${this.getStatusLabel(review.status)}
                </span>
                <div class="mt-1">
                  <a href="/cliente/revisoes/${review.id}" class="text-primary hover:text-primary-hover text-sm">
                    Ver detalhes
                  </a>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      `;

    } catch (error) {
      console.error('Error loading reviews:', error);
      const reviewsContainer = document.getElementById('recent-reviews');
      reviewsContainer.innerHTML = `
        <div class="text-center py-8 text-red-500">
          <span class="material-symbols-outlined text-4xl mb-2">error</span>
          <p>Erro ao carregar revisões</p>
        </div>
      `;
    }
  }

  async loadMyVehicles() {
    try {
      // Simulate API call - replace with actual API calls
      const vehicles = [
        {
          id: 1,
          make: 'Honda',
          model: 'Civic',
          year: 2020,
          plate: 'ABC-1234',
          color: 'Prata'
        },
        {
          id: 2,
          make: 'Toyota',
          model: 'Corolla',
          year: 2019,
          plate: 'XYZ-9876',
          color: 'Branco'
        }
      ];

      const vehiclesContainer = document.getElementById('my-vehicles');
      
      if (vehicles.length === 0) {
        vehiclesContainer.innerHTML = `
          <div class="text-center py-4 text-gray-500">
            <span class="material-symbols-outlined">directions_car</span>
            <p class="text-sm">Nenhum veículo cadastrado</p>
          </div>
        `;
        return;
      }

      vehiclesContainer.innerHTML = `
        <div class="space-y-3">
          ${vehicles.map(vehicle => `
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div class="flex items-center space-x-3">
                <span class="material-symbols-outlined text-primary">directions_car</span>
                <div>
                  <h4 class="font-medium text-sm">${vehicle.make} ${vehicle.model} ${vehicle.year}</h4>
                  <p class="text-xs text-gray-500">${vehicle.plate} • ${vehicle.color}</p>
                </div>
              </div>
              <a href="/cliente/veiculos/${vehicle.id}" class="text-primary hover:text-primary-hover text-xs">
                Ver
              </a>
            </div>
          `).join('')}
        </div>
      `;

    } catch (error) {
      console.error('Error loading vehicles:', error);
    }
  }

  async loadLatestRecommendations() {
    try {
      // Simulate API call - replace with actual API calls
      const recommendations = [
        {
          id: 1,
          title: 'Troca do filtro de ar',
          description: 'Recomendamos a troca do filtro de ar do seu Honda Civic',
          priority: 'media',
          vehicle: 'Honda Civic 2020'
        },
        {
          id: 2,
          title: 'Verificação dos freios',
          description: 'Pastilhas de freio com 30% de desgaste',
          priority: 'alta',
          vehicle: 'Toyota Corolla 2019'
        },
        {
          id: 3,
          title: 'Balanceamento das rodas',
          description: 'Recomendamos balanceamento para melhor estabilidade',
          priority: 'baixa',
          vehicle: 'Honda Civic 2020'
        }
      ];

      const recommendationsContainer = document.getElementById('latest-recommendations');
      
      if (recommendations.length === 0) {
        recommendationsContainer.innerHTML = `
          <div class="text-center py-4 text-gray-500">
            <span class="material-symbols-outlined">check_circle</span>
            <p class="text-sm">Nenhuma recomendação no momento</p>
          </div>
        `;
        return;
      }

      recommendationsContainer.innerHTML = `
        <div class="space-y-3">
          ${recommendations.slice(0, 3).map(rec => `
            <div class="p-3 bg-gray-50 rounded-lg">
              <div class="flex items-start justify-between mb-2">
                <h4 class="font-medium text-sm">${rec.title}</h4>
                <span class="px-2 py-1 text-xs rounded-full ${this.getPriorityClasses(rec.priority)}">
                  ${this.getPriorityLabel(rec.priority)}
                </span>
              </div>
              <p class="text-xs text-gray-600 mb-2">${rec.description}</p>
              <p class="text-xs text-gray-500">${rec.vehicle}</p>
            </div>
          `).join('')}
        </div>
      `;

    } catch (error) {
      console.error('Error loading recommendations:', error);
    }
  }

  scheduleReview() {
    const modal = new window.Modal({
      title: 'Agendar Revisão',
      size: 'md'
    });

    modal.setContent(`
      <div class="space-y-4">
        <p class="text-gray-600">Para agendar uma revisão, entre em contato conosco:</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 bg-gray-50 rounded-lg text-center">
            <span class="material-symbols-outlined text-3xl text-primary mb-2">phone</span>
            <h3 class="font-medium mb-1">Telefone</h3>
            <p class="text-sm text-gray-600">(11) 99999-9999</p>
          </div>
          
          <div class="p-4 bg-gray-50 rounded-lg text-center">
            <span class="material-symbols-outlined text-3xl text-primary mb-2">chat</span>
            <h3 class="font-medium mb-1">WhatsApp</h3>
            <p class="text-sm text-gray-600">(11) 99999-9999</p>
          </div>
        </div>
        
        <div class="p-4 bg-blue-50 rounded-lg">
          <h3 class="font-medium text-blue-900 mb-2">Horário de Funcionamento</h3>
          <p class="text-sm text-blue-800">Segunda a Sexta: 8h às 18h</p>
          <p class="text-sm text-blue-800">Sábado: 8h às 12h</p>
        </div>
      </div>
    `);

    modal.setFooter(`
      <button onclick="this.hide()" class="btn btn-outline flex-1">Fechar</button>
    `);

    modal.show();
  }

  getStatusClasses(status) {
    const classes = {
      concluida: 'bg-green-100 text-green-800',
      em_andamento: 'bg-yellow-100 text-yellow-800',
      agendada: 'bg-blue-100 text-blue-800',
      cancelada: 'bg-red-100 text-red-800'
    };
    return classes[status] || classes.agendada;
  }

  getStatusLabel(status) {
    const labels = {
      concluida: 'Concluída',
      em_andamento: 'Em Andamento',
      agendada: 'Agendada',
      cancelada: 'Cancelada'
    };
    return labels[status] || 'Agendada';
  }

  getPriorityClasses(priority) {
    const classes = {
      alta: 'bg-red-100 text-red-800',
      media: 'bg-yellow-100 text-yellow-800',
      baixa: 'bg-green-100 text-green-800'
    };
    return classes[priority] || classes.media;
  }

  getPriorityLabel(priority) {
    const labels = {
      alta: 'Alta',
      media: 'Média',
      baixa: 'Baixa'
    };
    return labels[priority] || 'Média';
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  }

  async handleLogout() {
    try {
      await window.auth.logout();
      window.Toast.success('Logout realizado com sucesso!');
      window.router.navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      window.Toast.error('Erro ao fazer logout');
    }
  }

  destroy() {
    // Clean up any intervals or listeners if needed
  }
}