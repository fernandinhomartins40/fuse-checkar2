/**
 * FUSE CHECKAR2 - Admin Clients Management Page
 */

export default class ClientesPage {
  constructor() {
    this.title = 'Clientes - Painel Administrativo';
    this.clients = [];
    this.filteredClients = [];
    this.currentPage = 1;
    this.pageSize = 10;
    this.searchTerm = '';
    this.render();
    this.bindEvents();
    this.loadClients();
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
                <h1 class="text-lg font-semibold text-gray-800">Gestão de Clientes</h1>
              </div>
              
              <div class="flex items-center space-x-4">
                <div class="flex items-center space-x-2 text-sm text-gray-600">
                  <span class="material-symbols-outlined text-sm">person</span>
                  <span id="admin-name">${window.auth.getUser()?.nome || 'Admin'}</span>
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
              <a href="/admin/dashboard" class="nav-link">
                <span class="material-symbols-outlined mr-2">dashboard</span>
                Dashboard
              </a>
              <a href="/clientes" class="nav-link active">
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

          <!-- Page Header -->
          <div class="flex justify-between items-center mb-6">
            <div>
              <h1 class="text-2xl font-bold text-gray-900">Clientes</h1>
              <p class="text-gray-600">Gerencie todos os clientes cadastrados</p>
            </div>
            <a href="/clientes/novo" class="btn btn-primary">
              <span class="material-symbols-outlined mr-2">person_add</span>
              Novo Cliente
            </a>
          </div>

          <!-- Filters -->
          <div class="card mb-6">
            <div class="card-content">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Buscar cliente
                  </label>
                  <div class="relative">
                    <span class="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">search</span>
                    <input
                      type="text"
                      id="search-input"
                      class="input pl-10"
                      placeholder="Nome, email ou CPF..."
                    >
                  </div>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select id="status-filter" class="select">
                    <option value="">Todos os status</option>
                    <option value="ativo">Ativo</option>
                    <option value="inativo">Inativo</option>
                    <option value="bloqueado">Bloqueado</option>
                  </select>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Ordenar por
                  </label>
                  <select id="sort-select" class="select">
                    <option value="nome">Nome</option>
                    <option value="email">Email</option>
                    <option value="created_at">Data de cadastro</option>
                    <option value="last_visit">Última visita</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <!-- Clients Table -->
          <div class="card">
            <div class="card-header flex justify-between items-center">
              <h2 class="card-title">Lista de Clientes</h2>
              <div class="text-sm text-gray-500" id="results-count">
                Carregando...
              </div>
            </div>
            <div class="card-content p-0">
              <div id="clients-table-container">
                <div class="flex items-center justify-center py-12">
                  <div class="spinner mr-3"></div>
                  Carregando clientes...
                </div>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <div id="pagination-container" class="mt-6 flex justify-center">
            <!-- Pagination will be rendered here -->
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

    // Search input
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', this.handleSearch.bind(this));
    }

    // Filter selects
    const statusFilter = document.getElementById('status-filter');
    const sortSelect = document.getElementById('sort-select');
    
    if (statusFilter) {
      statusFilter.addEventListener('change', this.handleFilter.bind(this));
    }
    
    if (sortSelect) {
      sortSelect.addEventListener('change', this.handleSort.bind(this));
    }
  }

  async loadClients() {
    try {
      // Simulate API call - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      this.clients = [
        {
          id: 1,
          nome: 'João Silva',
          email: 'joao.silva@email.com',
          telefone: '(11) 99999-1111',
          cpf: '123.456.789-01',
          status: 'ativo',
          veiculos: 2,
          revisoes: 5,
          created_at: '2024-01-15',
          last_visit: '2024-07-20'
        },
        {
          id: 2,
          nome: 'Maria Santos',
          email: 'maria.santos@email.com',
          telefone: '(11) 99999-2222',
          cpf: '234.567.890-12',
          status: 'ativo',
          veiculos: 1,
          revisoes: 3,
          created_at: '2024-02-20',
          last_visit: '2024-07-18'
        },
        {
          id: 3,
          nome: 'Carlos Oliveira',
          email: 'carlos.oliveira@email.com',
          telefone: '(11) 99999-3333',
          cpf: '345.678.901-23',
          status: 'inativo',
          veiculos: 1,
          revisoes: 1,
          created_at: '2024-03-10',
          last_visit: '2024-06-15'
        },
        {
          id: 4,
          nome: 'Ana Costa',
          email: 'ana.costa@email.com',
          telefone: '(11) 99999-4444',
          cpf: '456.789.012-34',
          status: 'ativo',
          veiculos: 3,
          revisoes: 8,
          created_at: '2024-01-05',
          last_visit: '2024-07-25'
        },
        {
          id: 5,
          nome: 'Pedro Almeida',
          email: 'pedro.almeida@email.com',
          telefone: '(11) 99999-5555',
          cpf: '567.890.123-45',
          status: 'bloqueado',
          veiculos: 1,
          revisoes: 0,
          created_at: '2024-04-12',
          last_visit: '2024-05-10'
        }
      ];
      
      this.filteredClients = [...this.clients];
      this.renderTable();
      this.updateResultsCount();
      
    } catch (error) {
      console.error('Error loading clients:', error);
      this.renderError();
    }
  }

  renderTable() {
    const tableContainer = document.getElementById('clients-table-container');
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    const pageClients = this.filteredClients.slice(startIndex, endIndex);
    
    if (pageClients.length === 0) {
      tableContainer.innerHTML = `
        <div class="text-center py-12">
          <span class="material-symbols-outlined text-6xl text-gray-300">people</span>
          <h3 class="text-lg font-medium text-gray-900 mt-4">Nenhum cliente encontrado</h3>
          <p class="text-gray-500 mt-2">Tente ajustar os filtros ou adicione um novo cliente.</p>
        </div>
      `;
      return;
    }
    
    tableContainer.innerHTML = `
      <div class="overflow-x-auto">
        <table class="table">
          <thead class="table-header">
            <tr>
              <th class="table-head">Cliente</th>
              <th class="table-head">Contato</th>
              <th class="table-head">Status</th>
              <th class="table-head">Veículos</th>
              <th class="table-head">Revisões</th>
              <th class="table-head">Última Visita</th>
              <th class="table-head">Ações</th>
            </tr>
          </thead>
          <tbody>
            ${pageClients.map(client => `
              <tr class="table-row">
                <td class="table-cell">
                  <div>
                    <div class="font-medium text-gray-900">${client.nome}</div>
                    <div class="text-sm text-gray-500">${client.cpf}</div>
                  </div>
                </td>
                <td class="table-cell">
                  <div>
                    <div class="text-sm text-gray-900">${client.email}</div>
                    <div class="text-sm text-gray-500">${client.telefone}</div>
                  </div>
                </td>
                <td class="table-cell">
                  <span class="px-2 py-1 text-xs rounded-full ${this.getStatusClasses(client.status)}">
                    ${this.getStatusLabel(client.status)}
                  </span>
                </td>
                <td class="table-cell text-center">${client.veiculos}</td>
                <td class="table-cell text-center">${client.revisoes}</td>
                <td class="table-cell">${this.formatDate(client.last_visit)}</td>
                <td class="table-cell">
                  <div class="flex space-x-2">
                    <button onclick="window.router.navigate('/clientes/${client.id}')" class="btn btn-sm btn-outline" title="Ver detalhes">
                      <span class="material-symbols-outlined text-sm">visibility</span>
                    </button>
                    <button onclick="window.router.navigate('/clientes/${client.id}/editar')" class="btn btn-sm btn-primary" title="Editar">
                      <span class="material-symbols-outlined text-sm">edit</span>
                    </button>
                    <button onclick="this.handleDeleteClient(${client.id})" class="btn btn-sm btn-danger" title="Excluir">
                      <span class="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
    
    this.renderPagination();
  }

  renderPagination() {
    const totalPages = Math.ceil(this.filteredClients.length / this.pageSize);
    const paginationContainer = document.getElementById('pagination-container');
    
    if (totalPages <= 1) {
      paginationContainer.innerHTML = '';
      return;
    }

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(`
        <button 
          class="pagination-item ${i === this.currentPage ? 'active' : ''}" 
          onclick="this.goToPage(${i})"
        >
          ${i}
        </button>
      `);
    }

    paginationContainer.innerHTML = `
      <div class="pagination">
        <button 
          class="pagination-item" 
          onclick="this.goToPage(${this.currentPage - 1})" 
          ${this.currentPage <= 1 ? 'disabled' : ''}
        >
          ‹
        </button>
        ${pages.join('')}
        <button 
          class="pagination-item" 
          onclick="this.goToPage(${this.currentPage + 1})" 
          ${this.currentPage >= totalPages ? 'disabled' : ''}
        >
          ›
        </button>
      </div>
    `;
  }

  renderError() {
    const tableContainer = document.getElementById('clients-table-container');
    tableContainer.innerHTML = `
      <div class="text-center py-12">
        <span class="material-symbols-outlined text-6xl text-red-300">error</span>
        <h3 class="text-lg font-medium text-gray-900 mt-4">Erro ao carregar clientes</h3>
        <p class="text-gray-500 mt-2">Tente recarregar a página.</p>
        <button onclick="this.loadClients()" class="btn btn-primary mt-4">
          Tentar novamente
        </button>
      </div>
    `;
  }

  handleSearch(event) {
    this.searchTerm = event.target.value.toLowerCase();
    this.filterClients();
  }

  handleFilter() {
    this.filterClients();
  }

  handleSort() {
    const sortBy = document.getElementById('sort-select').value;
    this.sortClients(sortBy);
  }

  filterClients() {
    const statusFilter = document.getElementById('status-filter').value;
    
    this.filteredClients = this.clients.filter(client => {
      const matchesSearch = !this.searchTerm || 
        client.nome.toLowerCase().includes(this.searchTerm) ||
        client.email.toLowerCase().includes(this.searchTerm) ||
        client.cpf.toLowerCase().includes(this.searchTerm);
        
      const matchesStatus = !statusFilter || client.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
    
    this.currentPage = 1;
    this.renderTable();
    this.updateResultsCount();
  }

  sortClients(sortBy) {
    this.filteredClients.sort((a, b) => {
      if (sortBy === 'nome') {
        return a.nome.localeCompare(b.nome);
      } else if (sortBy === 'email') {
        return a.email.localeCompare(b.email);
      } else if (sortBy === 'created_at') {
        return new Date(b.created_at) - new Date(a.created_at);
      } else if (sortBy === 'last_visit') {
        return new Date(b.last_visit) - new Date(a.last_visit);
      }
      return 0;
    });
    
    this.renderTable();
  }

  goToPage(page) {
    const totalPages = Math.ceil(this.filteredClients.length / this.pageSize);
    if (page >= 1 && page <= totalPages) {
      this.currentPage = page;
      this.renderTable();
    }
  }

  updateResultsCount() {
    const resultsCount = document.getElementById('results-count');
    const total = this.filteredClients.length;
    const totalClients = this.clients.length;
    
    if (total === totalClients) {
      resultsCount.textContent = `${total} cliente(s)`;
    } else {
      resultsCount.textContent = `${total} de ${totalClients} cliente(s)`;
    }
  }

  getStatusClasses(status) {
    const classes = {
      ativo: 'bg-green-100 text-green-800',
      inativo: 'bg-gray-100 text-gray-800',
      bloqueado: 'bg-red-100 text-red-800'
    };
    return classes[status] || classes.ativo;
  }

  getStatusLabel(status) {
    const labels = {
      ativo: 'Ativo',
      inativo: 'Inativo',
      bloqueado: 'Bloqueado'
    };
    return labels[status] || 'Ativo';
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  }

  async handleDeleteClient(clientId) {
    const client = this.clients.find(c => c.id === clientId);
    if (!client) return;

    const modal = new window.Modal({
      title: 'Confirmar Exclusão',
      size: 'sm'
    });

    modal.setContent(`
      <p>Tem certeza que deseja excluir o cliente <strong>${client.nome}</strong>?</p>
      <p class="text-sm text-gray-500 mt-2">Esta ação não pode ser desfeita.</p>
    `);

    modal.setFooter(`
      <div class="flex space-x-3">
        <button onclick="this.hide()" class="btn btn-outline flex-1">Cancelar</button>
        <button onclick="this.confirmDelete(${clientId})" class="btn btn-danger flex-1">Excluir</button>
      </div>
    `);

    modal.show();
    
    // Store reference for the confirm function
    modal.confirmDelete = async (id) => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        this.clients = this.clients.filter(c => c.id !== id);
        this.filterClients();
        
        window.Toast.success('Cliente excluído com sucesso!');
        modal.hide();
        
      } catch (error) {
        console.error('Error deleting client:', error);
        window.Toast.error('Erro ao excluir cliente');
      }
    };
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
    // Clean up any event listeners or intervals
  }
}