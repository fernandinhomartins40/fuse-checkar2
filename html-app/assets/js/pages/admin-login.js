/**
 * FUSE CHECKAR2 - Admin Login Page
 */

export default class AdminLoginPage {
  constructor() {
    this.title = 'Login - Painel Administrativo';
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
              <span class="material-symbols-outlined text-3xl text-secondary">directions_car</span>
              <span class="text-2xl font-bold text-secondary">CHECAR</span>
            </a>
            <h2 class="text-3xl font-bold text-gray-900">Painel Administrativo</h2>
            <p class="mt-2 text-sm text-gray-600">
              Acesse o sistema de gestão do auto center
            </p>
          </div>
        </div>

        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div class="card border-secondary">
            <div class="card-content">
              <form id="admin-login-form" class="space-y-6">
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
                      placeholder="admin@autocenter.com"
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
                      autocomplete="current-password"
                      required
                      class="input w-full"
                      placeholder="Sua senha"
                    >
                  </div>
                </div>

                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      class="checkbox"
                    >
                    <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                      Lembrar de mim
                    </label>
                  </div>

                  <div class="text-sm">
                    <a href="#" class="font-medium text-secondary hover:text-secondary-hover">
                      Esqueceu sua senha?
                    </a>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    id="admin-login-btn"
                    class="btn btn-secondary w-full"
                  >
                    <span class="material-symbols-outlined mr-2">admin_panel_settings</span>
                    Acessar Painel
                  </button>
                </div>

                <div class="text-center">
                  <p class="text-sm text-gray-600">
                    É um cliente?
                    <a href="/login" class="font-medium text-primary hover:text-primary-hover">
                      Acesse o portal do cliente
                    </a>
                  </p>
                </div>

                <div class="text-center">
                  <a href="/" class="text-sm text-gray-500 hover:text-gray-700">
                    <span class="material-symbols-outlined mr-1 text-sm">arrow_back</span>
                    Voltar ao início
                  </a>
                </div>
              </form>
            </div>
          </div>

          <!-- Admin Features Info -->
          <div class="mt-6 card bg-gradient-to-r from-secondary to-secondary text-white">
            <div class="card-content text-center">
              <div class="mb-4">
                <span class="material-symbols-outlined text-4xl">dashboard</span>
              </div>
              <h3 class="text-lg font-semibold mb-2">Painel Administrativo</h3>
              <p class="text-sm opacity-90">
                Gerencie clientes, veículos, revisões e relatórios em um só lugar
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  bindEvents() {
    this.form = document.getElementById('admin-login-form');
    
    if (this.form) {
      this.form.addEventListener('submit', this.handleSubmit.bind(this));
    }

    // Handle demo login
    this.addDemoButton();
  }

  addDemoButton() {
    const form = document.getElementById('admin-login-form');
    if (form) {
      const demoButton = document.createElement('button');
      demoButton.type = 'button';
      demoButton.className = 'btn btn-outline-secondary w-full mt-4';
      demoButton.innerHTML = `
        <span class="material-symbols-outlined mr-2">visibility</span>
        Entrar como Admin Demo
      `;
      demoButton.addEventListener('click', this.handleDemoLogin.bind(this));
      
      // Insert before the client link
      const clientLink = form.querySelector('.text-center');
      form.insertBefore(demoButton, clientLink);
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(this.form);
    const credentials = {
      email: formData.get('email'),
      password: formData.get('password')
    };

    // Validate form
    if (!this.validateForm(credentials)) {
      return;
    }

    const loginBtn = document.getElementById('admin-login-btn');
    const originalText = loginBtn.innerHTML;
    
    try {
      // Show loading state
      loginBtn.disabled = true;
      loginBtn.innerHTML = '<div class="spinner mr-2"></div> Acessando...';
      
      // Attempt login
      const result = await window.auth.login(credentials, 'admin');
      
      if (result.success) {
        window.Toast.success('Login realizado com sucesso!');
        
        // Redirect to admin dashboard
        setTimeout(() => {
          window.router.navigate(result.redirectTo || '/admin/dashboard');
        }, 1000);
        
      } else {
        throw new Error(result.error || 'Erro ao fazer login');
      }
      
    } catch (error) {
      console.error('Admin login error:', error);
      window.Toast.error(error.message || 'Erro ao fazer login. Verifique suas credenciais.');
      
    } finally {
      // Reset button state
      loginBtn.disabled = false;
      loginBtn.innerHTML = originalText;
    }
  }

  async handleDemoLogin() {
    const demoCredentials = {
      email: 'admin@demo.com',
      password: 'admin123'
    };

    // Fill form with demo data
    document.getElementById('email').value = demoCredentials.email;
    document.getElementById('password').value = demoCredentials.password;

    // Submit form
    const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
    this.form.dispatchEvent(submitEvent);
  }

  validateForm(credentials) {
    let isValid = true;
    
    // Clear previous errors
    document.querySelectorAll('.form-error').forEach(error => error.remove());
    document.querySelectorAll('.error').forEach(input => input.classList.remove('error'));
    
    // Validate email
    if (!credentials.email) {
      this.showFieldError('email', 'E-mail é obrigatório');
      isValid = false;
    } else if (!this.isValidEmail(credentials.email)) {
      this.showFieldError('email', 'E-mail inválido');
      isValid = false;
    }
    
    // Validate password
    if (!credentials.password) {
      this.showFieldError('password', 'Senha é obrigatória');
      isValid = false;
    } else if (credentials.password.length < 6) {
      this.showFieldError('password', 'Senha deve ter pelo menos 6 caracteres');
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

  destroy() {
    // Remove event listeners if needed
    if (this.form) {
      this.form.removeEventListener('submit', this.handleSubmit);
    }
  }
}