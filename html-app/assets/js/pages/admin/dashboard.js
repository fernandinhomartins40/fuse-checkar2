/**
 * FUSE CHECKAR2 - Admin Dashboard Page
 */

export default class AdminDashboardPage {
  constructor() {
    this.title = 'Dashboard - Painel Administrativo';
    this.data = {
      stats: {},
      recentActivities: [],
      alerts: []
    };
    this.render();
    this.bindEvents();
    this.loadData();
  }

  render() {
    const app = document.getElementById('app');
    
    app.innerHTML = `
      <div class="min-h-screen bg-gray-50">
        <!-- Admin Header -->
        <header class="bg-white shadow-sm border-b border-gray-200">
          <div class="container mx-auto px-4 py-4">
            <div class="flex justify-between items-center">
              <div class="flex items-center space-x-4">
                <a href="/" class="flex items-center space-x-2">
                  <span class="material-symbols-outlined text-2xl text-secondary">directions_car</span>
                  <span class="text-xl font-bold text-secondary">CHECAR</span>
                </a>
                <span class="text-gray-300">|</span>
                <h1 class="text-lg font-semibold text-gray-800">Dashboard Administrativo</h1>
              </div>
              
              <div class="flex items-center space-x-4">
                <div class="flex items-center space-x-2 text-sm text-gray-600">
                  <span class="material-symbols-outlined text-sm">person</span>
                  <span id="admin-name">Carregando...</span>
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
              <a href="/admin/dashboard" class="nav-link active">
                <span class="material-symbols-outlined mr-2">dashboard</span>
                Dashboard
              </a>
              <a href="/clientes" class="nav-link">
                <span class="material-symbols-outlined mr-2">people</span>
                Clientes
              </a>
              <a href="/veiculos" class="nav-link">
                <span class="material-symbols-outlined mr-2">directions_car</span>
                Veículos
              </a>
              <a href="/revisoes" class="nav-link">
                <span class="material-symbols-outlined mr-2">build</span>
                Revisões
              </a>
              <a href="/relatorios" class="nav-link">
                <span class="material-symbols-outlined mr-2">analytics</span>
                Relatórios
              </a>
            </div>
          </nav>

          <!-- Stats Cards -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div class="card bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <div class="card-content">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-blue-100 text-sm">Total de Clientes</p>
                    <p class="text-2xl font-bold" id="total-clientes">-</p>
                  </div>
                  <span class="material-symbols-outlined text-3xl text-blue-200">people</span>
                </div>
              </div>
            </div>

            <div class="card bg-gradient-to-r from-green-500 to-green-600 text-white">
              <div class="card-content">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-green-100 text-sm">Veículos Cadastrados</p>
                    <p class="text-2xl font-bold" id="total-veiculos">-</p>
                  </div>
                  <span class="material-symbols-outlined text-3xl text-green-200">directions_car</span>
                </div>
              </div>
            </div>

            <div class="card bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
              <div class="card-content">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-yellow-100 text-sm">Revisões Este Mês</p>
                    <p class="text-2xl font-bold" id="revisoes-mes">-</p>
                  </div>
                  <span class="material-symbols-outlined text-3xl text-yellow-200">build</span>
                </div>
              </div>
            </div>

            <div class="card bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <div class="card-content">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-purple-100 text-sm">Faturamento</p>
                    <p class="text-2xl font-bold" id="faturamento">-</p>
                  </div>
                  <span class="material-symbols-outlined text-3xl text-purple-200">monetization_on</span>
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Recent Activities -->
            <div class="lg:col-span-2">
              <div class="card">
                <div class="card-header">
                  <h2 class="card-title">Atividades Recentes</h2>
                </div>
                <div class="card-content" id="recent-activities">
                  <div class="flex items-center justify-center py-8">
                    <div class="spinner mr-3"></div>
                    Carregando atividades...
                  </div>
                </div>
              </div>
            </div>

            <!-- Quick Actions & Alerts -->
            <div class="space-y-6">
              <!-- Quick Actions -->
              <div class="card">
                <div class="card-header">
                  <h2 class="card-title">Ações Rápidas</h2>
                </div>
                <div class="card-content space-y-3">
                  <a href="/clientes/novo" class="btn btn-primary w-full">
                    <span class="material-symbols-outlined mr-2">person_add</span>
                    Novo Cliente
                  </a>
                  <a href="/veiculos/novo" class="btn btn-secondary w-full">
                    <span class="material-symbols-outlined mr-2">add_circle</span>
                    Cadastrar Veículo
                  </a>
                  <a href="/revisoes/nova" class="btn btn-success w-full">
                    <span class="material-symbols-outlined mr-2">build</span>
                    Nova Revisão
                  </a>
                  <a href="/relatorios" class="btn btn-outline w-full">
                    <span class="material-symbols-outlined mr-2">analytics</span>
                    Ver Relatórios
                  </a>
                </div>
              </div>

              <!-- Alerts -->
              <div class="card">
                <div class="card-header">
                  <h2 class="card-title">Alertas</h2>
                </div>
                <div class="card-content" id="alerts-container">
                  <div class="flex items-center justify-center py-4 text-gray-500">
                    <span class="material-symbols-outlined mr-2">notifications</span>
                    Carregando alertas...
                  </div>
                </div>
              </div>

              <!-- System Status -->
              <div class="card">
                <div class="card-header">
                  <h2 class="card-title">Status do Sistema</h2>
                </div>
                <div class="card-content space-y-3">
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-600">API</span>
                    <span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      Online
                    </span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-600">Banco de Dados</span>
                    <span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      Conectado
                    </span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-600">Backup</span>
                    <span class="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                      Pendente
                    </span>
                  </div>
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
      
      // Load dashboard stats
      await this.loadStats();
      
      // Load recent activities
      await this.loadRecentActivities();
      
      // Load alerts
      await this.loadAlerts();
      
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      window.Toast.error('Erro ao carregar dados do dashboard');
    }
  }

  loadUserInfo() {
    const user = window.auth.getUser();
    const adminNameEl = document.getElementById('admin-name');
    
    if (user && adminNameEl) {
      adminNameEl.textContent = user.nome || user.email || 'Administrador';
    }
  }

  async loadStats() {
    try {
      // Simulate API call - replace with actual API calls
      const stats = {
        totalClientes: 156,
        totalVeiculos: 234,
        revisoesMes: 89,
        faturamento: 'R$ 45.320'
      };

      // Update stats in UI
      document.getElementById('total-clientes').textContent = stats.totalClientes;
      document.getElementById('total-veiculos').textContent = stats.totalVeiculos;
      document.getElementById('revisoes-mes').textContent = stats.revisoesMes;
      document.getElementById('faturamento').textContent = stats.faturamento;

    } catch (error) {
      console.error('Error loading stats:', error);
    }
  }

  async loadRecentActivities() {
    try {
      // Simulate API call - replace with actual API calls
      const activities = [
        {
          id: 1,
          type: 'revisao',
          message: 'Revisão de João Silva (Civic 2020) concluída',
          time: '2 minutos atrás',
          icon: 'build',
          color: 'text-green-600'
        },
        {
          id: 2,
          type: 'cliente',
          message: 'Novo cliente: Maria Santos cadastrada',
          time: '15 minutos atrás',
          icon: 'person_add',
          color: 'text-blue-600'
        },
        {
          id: 3,
          type: 'veiculo',
          message: 'Veículo Corolla 2019 adicionado ao sistema',
          time: '1 hora atrás',
          icon: 'directions_car',
          color: 'text-purple-600'
        },
        {
          id: 4,
          type: 'revisao',
          message: 'Revisão de Carlos Oliveira iniciada',
          time: '2 horas atrás',
          icon: 'play_circle',
          color: 'text-yellow-600'
        },
        {
          id: 5,
          type: 'sistema',
          message: 'Backup automático realizado com sucesso',
          time: '4 horas atrás',
          icon: 'backup',
          color: 'text-gray-600'
        }
      ];

      const activitiesContainer = document.getElementById('recent-activities');
      
      if (activities.length === 0) {
        activitiesContainer.innerHTML = `
          <div class="text-center py-8 text-gray-500">
            <span class="material-symbols-outlined text-4xl mb-2">history</span>
            <p>Nenhuma atividade recente</p>
          </div>
        `;
        return;
      }

      activitiesContainer.innerHTML = `
        <div class="space-y-4">
          ${activities.map(activity => `
            <div class="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <span class="material-symbols-outlined ${activity.color}">${activity.icon}</span>
              <div class="flex-1">
                <p class="text-sm text-gray-800">${activity.message}</p>
                <p class="text-xs text-gray-500 mt-1">${activity.time}</p>
              </div>
            </div>
          `).join('')}
        </div>
      `;

    } catch (error) {
      console.error('Error loading activities:', error);
      const activitiesContainer = document.getElementById('recent-activities');
      activitiesContainer.innerHTML = `
        <div class="text-center py-8 text-red-500">
          <span class="material-symbols-outlined text-4xl mb-2">error</span>
          <p>Erro ao carregar atividades</p>
        </div>
      `;
    }
  }

  async loadAlerts() {
    try {
      // Simulate API call - replace with actual API calls
      const alerts = [
        {
          id: 1,
          type: 'warning',
          message: '3 revisões agendadas para hoje',
          priority: 'high'
        },
        {
          id: 2,
          type: 'info',
          message: 'Novo cliente aguardando aprovação',
          priority: 'medium'
        },
        {
          id: 3,
          type: 'error',
          message: 'Estoque baixo: Óleo 5W30',
          priority: 'high'
        }
      ];

      const alertsContainer = document.getElementById('alerts-container');
      
      if (alerts.length === 0) {
        alertsContainer.innerHTML = `
          <div class="text-center py-4 text-gray-500">
            <span class="material-symbols-outlined">check_circle</span>
            <p class="text-sm">Nenhum alerta</p>
          </div>
        `;
        return;
      }

      alertsContainer.innerHTML = `
        <div class="space-y-2">
          ${alerts.map(alert => `
            <div class="flex items-start space-x-2 p-2 rounded ${this.getAlertClasses(alert.type)}">
              <span class="material-symbols-outlined text-sm">${this.getAlertIcon(alert.type)}</span>
              <p class="text-sm flex-1">${alert.message}</p>
            </div>
          `).join('')}
        </div>
      `;

    } catch (error) {
      console.error('Error loading alerts:', error);
    }
  }

  getAlertClasses(type) {
    const classes = {
      error: 'bg-red-50 text-red-800',
      warning: 'bg-yellow-50 text-yellow-800',
      info: 'bg-blue-50 text-blue-800',
      success: 'bg-green-50 text-green-800'
    };
    return classes[type] || classes.info;
  }

  getAlertIcon(type) {
    const icons = {
      error: 'error',
      warning: 'warning',
      info: 'info',
      success: 'check_circle'
    };
    return icons[type] || icons.info;
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