/**
 * FUSE CHECKAR2 - Client Login Page
 */

export default class LoginPage {
  constructor() {
    this.title = 'Login - Portal do Cliente';
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
            <h2 class="text-3xl font-bold text-gray-900">Portal do Cliente</h2>
            <p class="mt-2 text-sm text-gray-600">
              Acesse sua conta para acompanhar suas revisões
            </p>
          </div>
        </div>

        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div class="card">
            <div class="card-content">
              <form id="login-form" class="space-y-6">
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
                    <a href="#" class="font-medium text-primary hover:text-primary-hover">
                      Esqueceu sua senha?
                    </a>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    id="login-btn"
                    class="btn btn-primary w-full"
                  >
                    Entrar
                  </button>
                </div>

                <div class="text-center">
                  <p class="text-sm text-gray-600">
                    Não tem uma conta?
                    <a href="/registro" class="font-medium text-primary hover:text-primary-hover">
                      Cadastre-se aqui
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
    this.form = document.getElementById('login-form');
    
    if (this.form) {
      this.form.addEventListener('submit', this.handleSubmit.bind(this));
    }

    // Handle demo login
    this.addDemoButton();
  }

  addDemoButton() {
    const form = document.getElementById('login-form');
    if (form) {
      const demoButton = document.createElement('button');
      demoButton.type = 'button';
      demoButton.className = 'btn btn-outline w-full mt-4';
      demoButton.innerHTML = `
        <span class="material-symbols-outlined mr-2">visibility</span>
        Entrar como Demo
      `;
      demoButton.addEventListener('click', this.handleDemoLogin.bind(this));
      
      form.appendChild(demoButton);
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

    const loginBtn = document.getElementById('login-btn');
    const originalText = loginBtn.textContent;
    
    try {
      // Show loading state
      loginBtn.disabled = true;
      loginBtn.innerHTML = '<div class="spinner mr-2"></div> Entrando...';
      
      // Attempt login
      const result = await window.auth.login(credentials, 'cliente');
      
      if (result.success) {
        window.Toast.success('Login realizado com sucesso!');
        
        // Redirect to dashboard
        setTimeout(() => {
          window.router.navigate(result.redirectTo || '/cliente/dashboard');
        }, 1000);
        
      } else {
        throw new Error(result.error || 'Erro ao fazer login');
      }
      
    } catch (error) {
      console.error('Login error:', error);
      window.Toast.error(error.message || 'Erro ao fazer login. Verifique suas credenciais.');
      
    } finally {
      // Reset button state
      loginBtn.disabled = false;
      loginBtn.textContent = originalText;
    }
  }

  async handleDemoLogin() {
    const demoCredentials = {
      email: 'cliente@demo.com',
      password: 'demo123'
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