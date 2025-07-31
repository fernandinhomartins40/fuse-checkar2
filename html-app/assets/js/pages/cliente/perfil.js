/**
 * FUSE CHECKAR2 - Client Profile Page
 */

export default class ClientePerfilPage {
  constructor() {
    this.title = 'Meu Perfil - Portal do Cliente';
    this.form = null;
    this.profileData = {};
    this.render();
    this.bindEvents();
    this.loadProfile();
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
                <h1 class="text-lg font-semibold text-gray-800">Meu Perfil</h1>
              </div>
              
              <div class="flex items-center space-x-4">
                <div class="flex items-center space-x-2 text-sm text-gray-600">
                  <span class="material-symbols-outlined text-sm">person</span>
                  <span>${window.auth.getUser()?.nome || 'Cliente'}</span>
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
              <a href="/cliente/dashboard" class="nav-link">
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
              <a href="/cliente/perfil" class="nav-link active">
                <span class="material-symbols-outlined mr-2">person</span>
                Perfil
              </a>
            </div>
          </nav>

          <!-- Page Header -->
          <div class="flex items-center mb-6">
            <button onclick="window.router.navigate('/cliente/dashboard')" class="btn btn-ghost btn-sm mr-4">
              <span class="material-symbols-outlined mr-1">arrow_back</span>
              Voltar
            </button>
            <div>
              <h1 class="text-2xl font-bold text-gray-900">Meu Perfil</h1>
              <p class="text-gray-600">Gerencie suas informações pessoais</p>
            </div>
          </div>

          <div class="max-w-4xl">
            <form id="profile-form" class="space-y-6">
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
                        placeholder="Seu nome"
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
                        placeholder="Seu sobrenome"
                      >
                    </div>

                    <div>
                      <label for="cpf" class="block text-sm font-medium text-gray-700 mb-2">
                        CPF
                      </label>
                      <input
                        type="text"
                        id="cpf"
                        name="cpf"
                        class="input w-full"
                        placeholder="000.000.000-00"
                        readonly
                      >
                      <p class="text-xs text-gray-500 mt-1">O CPF não pode ser alterado</p>
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
                        placeholder="Sua profissão"
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
                        placeholder="seu@email.com"
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

              <!-- Password Change -->
              <div class="card">
                <div class="card-header">
                  <h2 class="card-title">Alterar Senha</h2>
                </div>
                <div class="card-content">
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label for="senha_atual" class="block text-sm font-medium text-gray-700 mb-2">
                        Senha Atual
                      </label>
                      <input
                        type="password"
                        id="senha_atual"
                        name="senha_atual"
                        class="input w-full"
                        placeholder="Sua senha atual"
                      >
                    </div>

                    <div>
                      <label for="nova_senha" class="block text-sm font-medium text-gray-700 mb-2">
                        Nova Senha
                      </label>
                      <input
                        type="password"
                        id="nova_senha"
                        name="nova_senha"
                        class="input w-full"
                        placeholder="Nova senha"
                        minlength="6"
                      >
                    </div>

                    <div>
                      <label for="confirmar_nova_senha" class="block text-sm font-medium text-gray-700 mb-2">
                        Confirmar Nova Senha
                      </label>
                      <input
                        type="password"
                        id="confirmar_nova_senha"
                        name="confirmar_nova_senha"
                        class="input w-full"
                        placeholder="Confirme a nova senha"
                        minlength="6"
                      >
                    </div>
                  </div>
                  <p class="text-xs text-gray-500 mt-2">
                    Deixe em branco se não deseja alterar a senha
                  </p>
                </div>
              </div>

              <!-- Preferences -->
              <div class="card">
                <div class="card-header">
                  <h2 class="card-title">Preferências</h2>
                </div>
                <div class="card-content">
                  <div class="space-y-4">
                    <div class="flex items-center">
                      <input
                        type="checkbox"
                        id="notificacoes_email"
                        name="notificacoes_email"
                        class="checkbox mr-3"
                        checked
                      >
                      <label for="notificacoes_email" class="text-sm text-gray-700">
                        Receber notificações por e-mail sobre revisões e recomendações
                      </label>
                    </div>

                    <div class="flex items-center">
                      <input
                        type="checkbox"
                        id="notificacoes_sms"
                        name="notificacoes_sms"
                        class="checkbox mr-3"
                      >
                      <label for="notificacoes_sms" class="text-sm text-gray-700">
                        Receber notificações por SMS sobre agendamentos
                      </label>
                    </div>

                    <div class="flex items-center">
                      <input
                        type="checkbox"
                        id="newsletter"
                        name="newsletter"
                        class="checkbox mr-3"
                        checked
                      >
                      <label for="newsletter" class="text-sm text-gray-700">
                        Receber newsletter com dicas de manutenção
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Form Actions -->
              <div class="flex justify-end space-x-4">
                <button type="button" onclick="window.router.navigate('/cliente/dashboard')" class="btn btn-outline">
                  Cancelar
                </button>
                <button type="submit" id="save-btn" class="btn btn-primary">
                  <span class="material-symbols-outlined mr-2">save</span>
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
  }

  bindEvents() {
    this.form = document.getElementById('profile-form');
    
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

  async loadProfile() {
    try {
      // Simulate API call - replace with actual API call
      const user = window.auth.getUser();
      
      this.profileData = {
        nome: user?.nome || 'João',
        sobrenome: user?.sobrenome || 'Silva',
        cpf: '123.456.789-01',
        email: user?.email || 'joao.silva@email.com',
        telefone: '(11) 99999-1111',
        telefone2: '',
        whatsapp: '(11) 99999-1111',
        data_nascimento: '1985-05-15',
        profissao: 'Engenheiro',
        cep: '01310-100',
        endereco: 'Av. Paulista',
        numero: '1000',
        complemento: 'Apto 101',
        bairro: 'Bela Vista',
        cidade: 'São Paulo',
        estado: 'SP',
        pais: 'Brasil',
        notificacoes_email: true,
        notificacoes_sms: false,
        newsletter: true
      };

      // Populate form with current data
      this.populateForm();
      
    } catch (error) {
      console.error('Error loading profile:', error);
      window.Toast.error('Erro ao carregar dados do perfil');
    }
  }

  populateForm() {
    Object.keys(this.profileData).forEach(key => {
      const element = document.getElementById(key);
      if (element) {
        if (element.type === 'checkbox') {
          element.checked = this.profileData[key];
        } else {
          element.value = this.profileData[key] || '';
        }
      }
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(this.form);
    const profileData = {};
    
    // Extract form data
    for (let [key, value] of formData.entries()) {
      profileData[key] = value;
    }

    // Add checkbox values
    profileData.notificacoes_email = document.getElementById('notificacoes_email').checked;
    profileData.notificacoes_sms = document.getElementById('notificacoes_sms').checked;
    profileData.newsletter = document.getElementById('newsletter').checked;

    // Validate form
    if (!this.validateForm(profileData)) {
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
      
      // Update local profile data
      this.profileData = { ...this.profileData, ...profileData };
      
      window.Toast.success('Perfil atualizado com sucesso!');
      
    } catch (error) {
      console.error('Error saving profile:', error);
      window.Toast.error('Erro ao salvar perfil. Tente novamente.');
      
    } finally {
      // Reset button state
      saveBtn.disabled = false;
      saveBtn.innerHTML = originalText;
    }
  }

  validateForm(profileData) {
    let isValid = true;
    
    // Clear previous errors
    document.querySelectorAll('.form-error').forEach(error => error.remove());
    document.querySelectorAll('.error').forEach(input => input.classList.remove('error'));
    
    // Required fields validation
    const requiredFields = [
      { field: 'nome', message: 'Nome é obrigatório' },
      { field: 'sobrenome', message: 'Sobrenome é obrigatório' },
      { field: 'email', message: 'E-mail é obrigatório' },
      { field: 'telefone', message: 'Telefone é obrigatório' }
    ];
    
    requiredFields.forEach(({ field, message }) => {
      if (!profileData[field] || profileData[field].trim() === '') {
        this.showFieldError(field, message);
        isValid = false;
      }
    });
    
    // Email validation
    if (profileData.email && !this.isValidEmail(profileData.email)) {
      this.showFieldError('email', 'E-mail inválido');
      isValid = false;
    }
    
    // Password validation (if changing password)
    if (profileData.nova_senha) {
      if (!profileData.senha_atual) {
        this.showFieldError('senha_atual', 'Senha atual é obrigatória para alterar a senha');
        isValid = false;
      }
      
      if (profileData.nova_senha.length < 6) {
        this.showFieldError('nova_senha', 'Nova senha deve ter pelo menos 6 caracteres');
        isValid = false;
      }
      
      if (profileData.nova_senha !== profileData.confirmar_nova_senha) {
        this.showFieldError('confirmar_nova_senha', 'Confirmação de senha não confere');
        isValid = false;
      }
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