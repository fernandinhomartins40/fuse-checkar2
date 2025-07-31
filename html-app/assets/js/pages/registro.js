/**
 * FUSE CHECKAR2 - Client Registration Page
 */

export default class RegistroPage {
  constructor() {
    this.title = 'Registro - Novo Cliente';
    this.form = null;
    this.render();
    this.bindEvents();
  }

  render() {
    const app = document.getElementById('app');
    
    app.innerHTML = `
      <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
          <div class="text-center">
            <a href="/" class="inline-flex items-center space-x-2 mb-6">
              <span class="material-symbols-outlined text-3xl text-primary">directions_car</span>
              <span class="text-2xl font-bold text-primary">CHECAR</span>
            </a>
            <h2 class="text-3xl font-bold text-gray-900">Criar Nova Conta</h2>
            <p class="mt-2 text-sm text-gray-600">
              Cadastre-se para acessar o portal do cliente
            </p>
          </div>
        </div>

        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div class="card">
            <div class="card-content">
              <form id="registro-form" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label for="nome" class="block text-sm font-medium text-gray-700">
                      Nome
                    </label>
                    <div class="mt-1">
                      <input
                        id="nome"
                        name="nome"
                        type="text"
                        required
                        class="input w-full"
                        placeholder="Seu nome"
                      >
                    </div>
                  </div>

                  <div>
                    <label for="sobrenome" class="block text-sm font-medium text-gray-700">
                      Sobrenome
                    </label>
                    <div class="mt-1">
                      <input
                        id="sobrenome"
                        name="sobrenome"
                        type="text"
                        required
                        class="input w-full"
                        placeholder="Seu sobrenome"
                      >
                    </div>
                  </div>
                </div>

                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700">
                    E-mail
                  </label>
                  <div class="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autocomplete="email"
                      required
                      class="input w-full"
                      placeholder="seu@email.com"
                    >
                  </div>
                </div>

                <div>
                  <label for="telefone" class="block text-sm font-medium text-gray-700">
                    Telefone
                  </label>
                  <div class="mt-1">
                    <input
                      id="telefone"
                      name="telefone"
                      type="tel"
                      required
                      class="input w-full"
                      placeholder="(11) 99999-9999"
                    >
                  </div>
                </div>

                <div>
                  <label for="cpf" class="block text-sm font-medium text-gray-700">
                    CPF
                  </label>
                  <div class="mt-1">
                    <input
                      id="cpf"
                      name="cpf"
                      type="text"
                      required
                      class="input w-full"
                      placeholder="000.000.000-00"
                    >
                  </div>
                </div>

                <div>
                  <label for="password" class="block text-sm font-medium text-gray-700">
                    Senha
                  </label>
                  <div class="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autocomplete="new-password"
                      required
                      class="input w-full"
                      placeholder="Mínimo 6 caracteres"
                    >
                  </div>
                </div>

                <div>
                  <label for="password-confirm" class="block text-sm font-medium text-gray-700">
                    Confirmar Senha
                  </label>
                  <div class="mt-1">
                    <input
                      id="password-confirm"
                      name="password-confirm"
                      type="password"
                      autocomplete="new-password"
                      required
                      class="input w-full"
                      placeholder="Confirme sua senha"
                    >
                  </div>
                </div>

                <div class="flex items-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    class="checkbox"
                  >
                  <label for="terms" class="ml-2 block text-sm text-gray-900">
                    Aceito os <a href="#" class="text-primary hover:text-primary-hover">termos de uso</a> 
                    e <a href="#" class="text-primary hover:text-primary-hover">política de privacidade</a>
                  </label>
                </div>

                <div>
                  <button
                    type="submit"
                    id="registro-btn"
                    class="btn btn-primary w-full"
                  >
                    Criar Conta
                  </button>
                </div>

                <div class="text-center">
                  <p class="text-sm text-gray-600">
                    Já tem uma conta?
                    <a href="/login" class="font-medium text-primary hover:text-primary-hover">
                      Faça login aqui
                    </a>
                  </p>
                </div>

                <div class="text-center">
                  <p class="text-sm text-gray-500">
                    É um mecânico ou administrador?
                    <a href="/admin/login" class="font-medium text-secondary hover:text-secondary-hover">
                      Acesse o painel admin
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  bindEvents() {
    this.form = document.getElementById('registro-form');
    
    if (this.form) {
      this.form.addEventListener('submit', this.handleSubmit.bind(this));
    }

    // Format inputs
    this.setupInputFormatting();
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
    const phoneInput = document.getElementById('telefone');
    if (phoneInput) {
      phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{2})(\d)/, '($1) $2');
        value = value.replace(/(\d)(\d{4})$/, '$1-$2');
        e.target.value = value;
      });
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(this.form);
    const userData = {
      nome: formData.get('nome'),
      sobrenome: formData.get('sobrenome'),
      email: formData.get('email'),
      telefone: formData.get('telefone'),
      cpf: formData.get('cpf'),
      password: formData.get('password'),
      passwordConfirm: formData.get('password-confirm'),
      terms: formData.get('terms')
    };

    // Validate form
    if (!this.validateForm(userData)) {
      return;
    }

    const registroBtn = document.getElementById('registro-btn');
    const originalText = registroBtn.textContent;
    
    try {
      // Show loading state
      registroBtn.disabled = true;
      registroBtn.innerHTML = '<div class="spinner mr-2"></div> Criando conta...';
      
      // Register user
      const result = await window.auth.register(userData);
      
      if (result.success) {
        window.Toast.success('Conta criada com sucesso!');
        
        // Auto login after registration
        const loginResult = await window.auth.login({
          email: userData.email,
          password: userData.password
        }, 'cliente');
        
        if (loginResult.success) {
          setTimeout(() => {
            window.router.navigate('/cliente/dashboard');
          }, 1500);
        } else {
          setTimeout(() => {
            window.router.navigate('/login');
          }, 1500);
        }
        
      } else {
        throw new Error(result.error || 'Erro ao criar conta');
      }
      
    } catch (error) {
      console.error('Registration error:', error);
      window.Toast.error(error.message || 'Erro ao criar conta. Tente novamente.');
      
    } finally {
      // Reset button state
      registroBtn.disabled = false;
      registroBtn.textContent = originalText;
    }
  }

  validateForm(userData) {
    let isValid = true;
    
    // Clear previous errors
    document.querySelectorAll('.form-error').forEach(error => error.remove());
    document.querySelectorAll('.error').forEach(input => input.classList.remove('error'));
    
    // Validate required fields
    const requiredFields = [
      { field: 'nome', message: 'Nome é obrigatório' },
      { field: 'sobrenome', message: 'Sobrenome é obrigatório' },
      { field: 'email', message: 'E-mail é obrigatório' },
      { field: 'telefone', message: 'Telefone é obrigatório' },
      { field: 'cpf', message: 'CPF é obrigatório' },
      { field: 'password', message: 'Senha é obrigatória' }
    ];
    
    requiredFields.forEach(({ field, message }) => {
      if (!userData[field]) {
        this.showFieldError(field, message);
        isValid = false;
      }
    });
    
    // Validate email format
    if (userData.email && !this.isValidEmail(userData.email)) {
      this.showFieldError('email', 'E-mail inválido');
      isValid = false;
    }
    
    // Validate password length
    if (userData.password && userData.password.length < 6) {
      this.showFieldError('password', 'Senha deve ter pelo menos 6 caracteres');
      isValid = false;
    }
    
    // Validate password confirmation
    if (userData.password !== userData.passwordConfirm) {
      this.showFieldError('password-confirm', 'Senhas não coincidem');
      isValid = false;
    }
    
    // Validate CPF format
    if (userData.cpf && !this.isValidCPF(userData.cpf)) {
      this.showFieldError('cpf', 'CPF inválido');
      isValid = false;
    }
    
    // Validate terms acceptance
    if (!userData.terms) {
      this.showFieldError('terms', 'Você deve aceitar os termos de uso');
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

  destroy() {
    // Remove event listeners if needed
    if (this.form) {
      this.form.removeEventListener('submit', this.handleSubmit);
    }
  }
}