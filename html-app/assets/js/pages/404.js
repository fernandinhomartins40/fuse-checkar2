/**
 * FUSE CHECKAR2 - 404 Not Found Page
 */

export default class NotFoundPage {
  constructor() {
    this.title = 'Página não encontrada';
    this.render();
  }

  render() {
    const app = document.getElementById('app');
    
    app.innerHTML = `
      <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="text-center max-w-md mx-auto p-6">
          <div class="mb-6">
            <span class="material-symbols-outlined text-8xl text-gray-400">search_off</span>
          </div>
          <h1 class="text-6xl font-bold text-gray-800 mb-4">404</h1>
          <h2 class="text-2xl font-semibold text-gray-700 mb-4">Página não encontrada</h2>
          <p class="text-gray-600 mb-8">
            A página que você está procurando não existe ou foi movida.
          </p>
          <div class="space-y-3">
            <a href="/" class="btn btn-primary w-full">
              <span class="material-symbols-outlined mr-2">home</span>
              Voltar ao Início
            </a>
            <button onclick="history.back()" class="btn btn-outline w-full">
              <span class="material-symbols-outlined mr-2">arrow_back</span>
              Página Anterior
            </button>
          </div>
        </div>
      </div>
    `;
  }

  destroy() {
    // Cleanup if needed
  }
}