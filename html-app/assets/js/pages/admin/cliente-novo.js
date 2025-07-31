/**
 * FUSE CHECKAR2 - Admin New Client Page
 */

export default class ClienteNovoPage {
  constructor() {
    this.title = 'Novo Cliente - Painel Administrativo';
    this.form = null;
    this.render();
    this.bindEvents();
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
                <h1 class="text-lg font-semibold text-gray-800">Novo Cliente</h1>
              </div>
              
              <div class="flex items-center space-x-4">
                <div class="flex items-center space-x-2 text-sm text-gray-600">
                  <span class="material-symbols-outlined text-sm">person</span>
                  <span>${window.auth.getUser()?.nome || 'Admin'}</span>
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
          <div class="flex items-center mb-6">
            <button onclick="window.router.navigate('/clientes')" class="btn btn-ghost btn-sm mr-4">
              <span class="material-symbols-outlined mr-1">arrow_back</span>
              Voltar
            </button>
            <div>
              <h1 class="text-2xl font-bold text-gray-900">Novo Cliente</h1>
              <p class="text-gray-600">Cadastre um novo cliente no sistema</p>
            </div>
          </div>

          <!-- Client Form -->
          <div class="max-w-4xl">
            <form id="cliente-form" class="space-y-6">
              <!-- Personal Information -->
              <div class="card">
                <div class="card-header">
                  <h2 class="card-title">Informações Pessoais</h2>
                </div>
                <div class="card-content">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label for="nome" class="block text-sm font-medium text-gray-700 mb-2">
                        Nome *
                      </label>
                      <input
                        type="text"
                        id="nome"
                        name="nome"
                        required
                        class="input w-full"
                        placeholder="Nome do cliente"
                      >
                    </div>

                    <div>
                      <label for="sobrenome" class="block text-sm font-medium text-gray-700 mb-2">
                        Sobrenome *
                      </label>
                      <input
                        type="text"
                        id="sobrenome"
                        name="sobrenome"
                        required
                        class="input w-full"
                        placeholder="Sobrenome do cliente"
                      >
                    </div>

                    <div>
                      <label for="cpf" class="block text-sm font-medium text-gray-700 mb-2">
                        CPF *
                      </label>
                      <input
                        type="text"
                        id="cpf"
                        name="cpf"
                        required
                        class="input w-full"
                        placeholder="000.000.000-00"
                        maxlength="14"
                      >
                    </div>

                    <div>
                      <label for="rg" class="block text-sm font-medium text-gray-700 mb-2">
                        RG
                      </label>
                      <input
                        type="text"
                        id="rg"
                        name="rg"
                        class="input w-full"
                        placeholder="00.000.000-0"
                      >
                    </div>

                    <div>
                      <label for="data_nascimento" class="block text-sm font-medium text-gray-700 mb-2">
                        Data de Nascimento
                      </label>
                      <input
                        type="date"
                        id="data_nascimento"
                        name="data_nascimento"
                        class="input w-full"
                      >
                    </div>

                    <div>
                      <label for="profissao" class="block text-sm font-medium text-gray-700 mb-2">
                        Profissão
                      </label>
                      <input
                        type="text"
                        id="profissao"
                        name="profissao"
                        class="input w-full"
                        placeholder="Profissão do cliente"
                      >
                    </div>
                  </div>
                </div>
              </div>

              <!-- Contact Information -->
              <div class="card">
                <div class="card-header">
                  <h2 class="card-title">Informações de Contato</h2>
                </div>
                <div class="card-content">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                        E-mail *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        class="input w-full"
                        placeholder="cliente@email.com"
                      >
                    </div>

                    <div>
                      <label for="telefone" class="block text-sm font-medium text-gray-700 mb-2">
                        Telefone *
                      </label>
                      <input
                        type="tel"
                        id="telefone"
                        name="telefone"
                        required
                        class="input w-full"
                        placeholder="(11) 99999-9999"
                      >
                    </div>

                    <div>
                      <label for="telefone2" class="block text-sm font-medium text-gray-700 mb-2">
                        Telefone Secundário
                      </label>
                      <input
                        type="tel"
                        id="telefone2"
                        name="telefone2"
                        class="input w-full"
                        placeholder="(11) 99999-9999"
                      >
                    </div>

                    <div>
                      <label for="whatsapp" class="block text-sm font-medium text-gray-700 mb-2">
                        WhatsApp
                      </label>
                      <input
                        type="tel"
                        id="whatsapp"
                        name="whatsapp"
                        class="input w-full"
                        placeholder="(11) 99999-9999"
                      >
                    </div>
                  </div>
                </div>
              </div>

              <!-- Address Information -->
              <div class="card">
                <div class="card-header">
                  <h2 class="card-title">Endereço</h2>
                </div>
                <div class="card-content">
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label for="cep" class="block text-sm font-medium text-gray-700 mb-2">
                        CEP
                      </label>
                      <input
                        type="text"
                        id="cep"
                        name="cep"
                        class="input w-full"
                        placeholder="00000-000"
                        maxlength="9"
                      >
                    </div>
                    <div class="md:col-span-2">
                      <label for="endereco" class="block text-sm font-medium text-gray-700 mb-2">
                        Endereço
                      </label>
                      <input
                        type="text"
                        id="endereco"
                        name="endereco"
                        class="input w-full"
                        placeholder="Rua, Avenida..."
                      >
                    </div>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label for="numero" class="block text-sm font-medium text-gray-700 mb-2">
                        Número
                      </label>
                      <input
                        type="text"
                        id="numero"
                        name="numero"
                        class="input w-full"
                        placeholder="123"
                      >
                    </div>

                    <div>
                      <label for="complemento" class="block text-sm font-medium text-gray-700 mb-2">
                        Complemento
                      </label>
                      <input
                        type="text"
                        id="complemento"
                        name="complemento"
                        class="input w-full"
                        placeholder="Apto, Sala..."
                      >
                    </div>

                    <div>
                      <label for="bairro" class="block text-sm font-medium text-gray-700 mb-2">
                        Bairro
                      </label>
                      <input
                        type="text"
                        id="bairro"
                        name="bairro"
                        class="input w-full"
                        placeholder="Nome do bairro"
                      >
                    </div>

                    <div>
                      <label for="cidade" class="block text-sm font-medium text-gray-700 mb-2">
                        Cidade
                      </label>
                      <input
                        type="text"
                        id="cidade"
                        name="cidade"
                        class="input w-full"
                        placeholder="Nome da cidade"
                      >
                    </div>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label for="estado" class="block text-sm font-medium text-gray-700 mb-2">
                        Estado
                      </label>
                      <select id="estado" name="estado" class="select w-full">
                        <option value="">Selecione o estado</option>
                        <option value="SP">São Paulo</option>
                        <option value="RJ">Rio de Janeiro</option>
                        <option value="MG">Minas Gerais</option>
                        <option value="RS">Rio Grande do Sul</option>
                        <option value="PR">Paraná</option>
                        <option value="SC">Santa Catarina</option>
                        <!-- Add more states as needed -->
                      </select>
                    </div>

                    <div>
                      <label for="pais" class="block text-sm font-medium text-gray-700 mb-2">
                        País
                      </label>
                      <input
                        type="text"
                        id="pais"
                        name="pais"
                        class="input w-full"
                        value="Brasil"
                        readonly
                      >
                    </div>
                  </div>
                </div>
              </div>

              <!-- Account Settings -->
              <div class="card">
                <div class="card-header">
                  <h2 class="card-title">Configurações da Conta</h2>
                </div>
                <div class="card-content">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label for="senha" class="block text-sm font-medium text-gray-700 mb-2">
                        Senha *
                      </label>
                      <input
                        type="password"
                        id="senha"
                        name="senha"
                        required
                        class="input w-full"
                        placeholder="Mínimo 6 caracteres"
                        minlength="6"
                      >
                    </div>

                    <div>
                      <label for="confirmar_senha" class="block text-sm font-medium text-gray-700 mb-2">
                        Confirmar Senha *
                      </label>
                      <input
                        type="password"
                        id="confirmar_senha"
                        name="confirmar_senha"
                        required
                        class="input w-full"
                        placeholder="Confirme a senha"
                        minlength="6"
                      >
                    </div>

                    <div>
                      <label for="status" class="block text-sm font-medium text-gray-700 mb-2">
                        Status da Conta
                      </label>
                      <select id="status" name="status" class="select w-full">
                        <option value="ativo">Ativo</option>
                        <option value="inativo">Inativo</option>
                        <option value="pendente">Pendente</option>
                      </select>
                    </div>

                    <div class="flex items-center">
                      <input
                        type="checkbox"
                        id="enviar_email_boas_vindas"
                        name="enviar_email_boas_vindas"
                        class="checkbox mr-2"
                        checked
                      >
                      <label for="enviar_email_boas_vindas" class="text-sm text-gray-700">
                        Enviar e-mail de boas-vindas
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Form Actions -->
              <div class="flex justify-end space-x-4">
                <button type="button" onclick="window.router.navigate('/clientes')" class="btn btn-outline">
                  Cancelar
                </button>
                <button type="submit" id="save-btn" class="btn btn-primary">
                  <span class="material-symbols-outlined mr-2">save</span>
                  Salvar Cliente
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
  }

  bindEvents() {
    this.form = document.getElementById('cliente-form');
    
    if (this.form) {
      this.form.addEventListener('submit', this.handleSubmit.bind(this));
    }

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

    // Setup input formatting
    this.setupInputFormatting();

    // Setup CEP lookup
    this.setupCepLookup();
  }

  setupInputFormatting() {
    // CPF formatting
    const cpfInput = document.getElementById('cpf');
    if (cpfInput) {
      cpfInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})/, '$1-$2');
        value = value.replace(/(-\d{2})\d+?$/, '$1');
        e.target.value = value;
      });
    }

    // Phone formatting
    const phoneInputs = ['telefone', 'telefone2', 'whatsapp'];
    phoneInputs.forEach(inputId => {
      const input = document.getElementById(inputId);
      if (input) {
        input.addEventListener('input', (e) => {
          let value = e.target.value.replace(/\D/g, '');
          value = value.replace(/(\d{2})(\d)/, '($1) $2');
          value = value.replace(/(\d)(\d{4})$/, '$1-$2');
          e.target.value = value;
        });
      }
    });

    // CEP formatting
    const cepInput = document.getElementById('cep');
    if (cepInput) {
      cepInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{5})(\d)/, '$1-$2');
        value = value.replace(/(-\d{3})\d+?$/, '$1');
        e.target.value = value;
      });
    }
  }

  setupCepLookup() {
    const cepInput = document.getElementById('cep');
    if (cepInput) {
      cepInput.addEventListener('blur', async (e) => {
        const cep = e.target.value.replace(/\D/g, '');
        if (cep.length === 8) {
          await this.lookupCep(cep);
        }
      });
    }
  }

  async lookupCep(cep) {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      
      if (!data.erro) {
        document.getElementById('endereco').value = data.logradouro || '';
        document.getElementById('bairro').value = data.bairro || '';
        document.getElementById('cidade').value = data.localidade || '';
        document.getElementById('estado').value = data.uf || '';
      }
    } catch (error) {
      console.error('Error looking up CEP:', error);
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(this.form);
    const clientData = {};
    
    // Extract form data
    for (let [key, value] of formData.entries()) {
      clientData[key] = value;
    }

    // Add checkbox value
    clientData.enviar_email_boas_vindas = document.getElementById('enviar_email_boas_vindas').checked;

    // Validate form
    if (!this.validateForm(clientData)) {
      return;
    }

    const saveBtn = document.getElementById('save-btn');
    const originalText = saveBtn.innerHTML;
    
    try {
      // Show loading state
      saveBtn.disabled = true;
      saveBtn.innerHTML = '<div class="spinner mr-2"></div> Salvando...';
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      window.Toast.success('Cliente cadastrado com sucesso!');
      
      // Redirect to clients list
      setTimeout(() => {
        window.router.navigate('/clientes');
      }, 1500);
      
    } catch (error) {
      console.error('Error saving client:', error);
      window.Toast.error('Erro ao cadastrar cliente. Tente novamente.');
      
    } finally {
      // Reset button state
      saveBtn.disabled = false;
      saveBtn.innerHTML = originalText;
    }
  }

  validateForm(clientData) {
    let isValid = true;
    
    // Clear previous errors
    document.querySelectorAll('.form-error').forEach(error => error.remove());
    document.querySelectorAll('.error').forEach(input => input.classList.remove('error'));
    
    // Required fields validation
    const requiredFields = [
      { field: 'nome', message: 'Nome é obrigatório' },
      { field: 'sobrenome', message: 'Sobrenome é obrigatório' },
      { field: 'cpf', message: 'CPF é obrigatório' },
      { field: 'email', message: 'E-mail é obrigatório' },
      { field: 'telefone', message: 'Telefone é obrigatório' },
      { field: 'senha', message: 'Senha é obrigatória' },
      { field: 'confirmar_senha', message: 'Confirmação de senha é obrigatória' }
    ];
    
    requiredFields.forEach(({ field, message }) => {
      if (!clientData[field] || clientData[field].trim() === '') {
        this.showFieldError(field, message);
        isValid = false;
      }
    });
    
    // Email validation
    if (clientData.email && !this.isValidEmail(clientData.email)) {
      this.showFieldError('email', 'E-mail inválido');
      isValid = false;
    }
    
    // CPF validation
    if (clientData.cpf && !this.isValidCPF(clientData.cpf)) {
      this.showFieldError('cpf', 'CPF inválido');
      isValid = false;
    }
    
    // Password validation
    if (clientData.senha && clientData.senha.length < 6) {
      this.showFieldError('senha', 'Senha deve ter pelo menos 6 caracteres');
      isValid = false;
    }
    
    // Password confirmation
    if (clientData.senha !== clientData.confirmar_senha) {
      this.showFieldError('confirmar_senha', 'Senhas não coincidem');
      isValid = false;
    }
    
    return isValid;
  }

  showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    if (field) {
      field.classList.add('error');
      
      const errorElement = document.createElement('span');
      errorElement.className = 'form-error';
      errorElement.textContent = message;
      
      field.parentElement.appendChild(errorElement);
    }
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isValidCPF(cpf) {
    // Remove formatting
    cpf = cpf.replace(/[^\d]/g, '');
    
    // Check length
    if (cpf.length !== 11) return false;
    
    // Check for repeated digits
    if (/^(\d)\1{10}$/.test(cpf)) return false;
    
    // Validate check digits
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.charAt(9))) return false;
    
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.charAt(10))) return false;
    
    return true;
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
    // Clean up event listeners
    if (this.form) {
      this.form.removeEventListener('submit', this.handleSubmit);
    }
  }
}