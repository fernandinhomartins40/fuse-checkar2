/**
 * FUSE CHECKAR2 - UI Components
 * Reusable UI components in vanilla JavaScript
 */

/**
 * Base Component class
 */
class Component {
  constructor(element, options = {}) {
    this.element = typeof element === 'string' ? document.querySelector(element) : element;
    this.options = { ...this.constructor.defaults, ...options };
    this.state = {};
    this.listeners = [];
    
    if (this.element) {
      this.init();
    }
  }

  static defaults = {};

  init() {
    this.render();
    this.bindEvents();
  }

  render() {
    // Override in subclasses
  }

  bindEvents() {
    // Override in subclasses
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  addEventListener(element, event, handler) {
    const listener = { element, event, handler };
    this.listeners.push(listener);
    element.addEventListener(event, handler);
  }

  destroy() {
    // Remove all event listeners
    this.listeners.forEach(({ element, event, handler }) => {
      element.removeEventListener(event, handler);
    });
    this.listeners = [];
  }
}

/**
 * Button Component
 */
class Button extends Component {
  static defaults = {
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false
  };

  render() {
    if (!this.element) return;

    const { variant, size, disabled, loading } = this.options;
    
    // Set classes
    this.element.className = `btn btn-${variant} btn-${size}`;
    
    if (disabled || loading) {
      this.element.disabled = true;
      this.element.classList.add('disabled');
    } else {
      this.element.disabled = false;
      this.element.classList.remove('disabled');
    }

    // Handle loading state
    if (loading && !this.element.querySelector('.spinner')) {
      const spinner = document.createElement('span');
      spinner.className = 'spinner mr-2';
      this.element.insertBefore(spinner, this.element.firstChild);
    } else if (!loading) {
      const spinner = this.element.querySelector('.spinner');
      if (spinner) {
        spinner.remove();
      }
    }
  }

  setLoading(loading) {
    this.options.loading = loading;
    this.render();
  }

  setDisabled(disabled) {
    this.options.disabled = disabled;
    this.render();
  }
}

/**
 * Input Component
 */
class Input extends Component {
  static defaults = {
    type: 'text',
    placeholder: '',
    required: false,
    disabled: false,
    error: null
  };

  render() {
    if (!this.element) return;

    const { type, placeholder, required, disabled, error } = this.options;
    
    this.element.type = type;
    this.element.placeholder = placeholder;
    this.element.required = required;
    this.element.disabled = disabled;
    
    this.element.className = error ? 'input error' : 'input';
    
    // Handle error display
    let errorElement = this.element.parentElement.querySelector('.form-error');
    
    if (error) {
      if (!errorElement) {
        errorElement = document.createElement('span');
        errorElement.className = 'form-error';
        this.element.parentElement.appendChild(errorElement);
      }
      errorElement.textContent = error;
    } else if (errorElement) {
      errorElement.remove();
    }
  }

  bindEvents() {
    this.addEventListener(this.element, 'input', (e) => {
      this.options.error = null;
      this.render();
      this.emit('input', e.target.value);
    });
    
    this.addEventListener(this.element, 'change', (e) => {
      this.emit('change', e.target.value);
    });
    
    this.addEventListener(this.element, 'blur', (e) => {
      this.emit('blur', e.target.value);
    });
  }

  getValue() {
    return this.element.value;
  }

  setValue(value) {
    this.element.value = value;
  }

  setError(error) {
    this.options.error = error;
    this.render();
  }

  clearError() {
    this.options.error = null;
    this.render();
  }

  emit(event, data) {
    const customEvent = new CustomEvent(`input:${event}`, { detail: data });
    this.element.dispatchEvent(customEvent);
  }
}

/**
 * Select Component
 */
class Select extends Component {
  static defaults = {
    options: [],
    placeholder: 'Selecione uma opção',
    disabled: false,
    error: null
  };

  render() {
    if (!this.element) return;

    const { options, placeholder, disabled, error } = this.options;
    
    this.element.className = error ? 'select error' : 'select';
    this.element.disabled = disabled;
    
    // Clear existing options
    this.element.innerHTML = '';
    
    // Add placeholder option
    if (placeholder) {
      const placeholderOption = document.createElement('option');
      placeholderOption.value = '';
      placeholderOption.textContent = placeholder;
      placeholderOption.disabled = true;
      placeholderOption.selected = true;
      this.element.appendChild(placeholderOption);
    }
    
    // Add options
    options.forEach(option => {
      const optionElement = document.createElement('option');
      optionElement.value = option.value;
      optionElement.textContent = option.label;
      this.element.appendChild(optionElement);
    });
    
    // Handle error display
    let errorElement = this.element.parentElement.querySelector('.form-error');
    
    if (error) {
      if (!errorElement) {
        errorElement = document.createElement('span');
        errorElement.className = 'form-error';
        this.element.parentElement.appendChild(errorElement);
      }
      errorElement.textContent = error;
    } else if (errorElement) {
      errorElement.remove();
    }
  }

  bindEvents() {
    this.addEventListener(this.element, 'change', (e) => {
      this.options.error = null;
      this.render();
      this.emit('change', e.target.value);
    });
  }

  getValue() {
    return this.element.value;
  }

  setValue(value) {
    this.element.value = value;
  }

  setOptions(options) {
    this.options.options = options;
    this.render();
  }

  setError(error) {
    this.options.error = error;
    this.render();
  }

  emit(event, data) {
    const customEvent = new CustomEvent(`select:${event}`, { detail: data });
    this.element.dispatchEvent(customEvent);
  }
}

/**
 * Modal Component
 */
class Modal extends Component {
  static defaults = {
    title: '',
    size: 'md',
    closable: true,
    backdrop: true
  };

  constructor(options = {}) {
    super(null, options);
    this.create();
  }

  create() {
    const { title, size, closable, backdrop } = this.options;
    
    // Create modal structure
    this.overlay = document.createElement('div');
    this.overlay.className = 'modal-overlay';
    
    this.element = document.createElement('div');
    this.element.className = `modal-content modal-${size}`;
    
    this.header = document.createElement('div');
    this.header.className = 'modal-header';
    
    if (title) {
      this.titleElement = document.createElement('h2');
      this.titleElement.className = 'modal-title';
      this.titleElement.textContent = title;
      this.header.appendChild(this.titleElement);
    }
    
    if (closable) {
      this.closeButton = document.createElement('button');
      this.closeButton.className = 'modal-close';
      this.closeButton.innerHTML = '×';
      this.header.appendChild(this.closeButton);
    }
    
    this.body = document.createElement('div');
    this.body.className = 'modal-body';
    
    this.footer = document.createElement('div');
    this.footer.className = 'modal-footer';
    
    this.element.appendChild(this.header);
    this.element.appendChild(this.body);
    this.element.appendChild(this.footer);
    
    this.overlay.appendChild(this.element);
    
    this.bindEvents();
  }

  bindEvents() {
    if (this.closeButton) {
      this.addEventListener(this.closeButton, 'click', () => {
        this.hide();
      });
    }
    
    if (this.options.backdrop) {
      this.addEventListener(this.overlay, 'click', (e) => {
        if (e.target === this.overlay) {
          this.hide();
        }
      });
    }
    
    this.addEventListener(document, 'keydown', (e) => {
      if (e.key === 'Escape' && this.isVisible()) {
        this.hide();
      }
    });
  }

  show() {
    document.body.appendChild(this.overlay);
    
    // Trigger animation
    requestAnimationFrame(() => {
      this.overlay.classList.add('show');
    });
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    this.emit('show');
  }

  hide() {
    this.overlay.classList.remove('show');
    
    // Remove from DOM after animation
    setTimeout(() => {
      if (this.overlay.parentElement) {
        document.body.removeChild(this.overlay);
      }
    }, 200);
    
    // Restore body scroll
    document.body.style.overflow = '';
    
    this.emit('hide');
  }

  isVisible() {
    return this.overlay.parentElement !== null;
  }

  setTitle(title) {
    if (this.titleElement) {
      this.titleElement.textContent = title;
    }
  }

  setContent(content) {
    if (typeof content === 'string') {
      this.body.innerHTML = content;
    } else {
      this.body.innerHTML = '';
      this.body.appendChild(content);
    }
  }

  setFooter(content) {
    if (typeof content === 'string') {
      this.footer.innerHTML = content;
    } else {
      this.footer.innerHTML = '';
      this.footer.appendChild(content);
    }
  }

  emit(event) {
    const customEvent = new CustomEvent(`modal:${event}`);
    document.dispatchEvent(customEvent);
  }
}

/**
 * Toast/Notification Component
 */
class Toast {
  static container = null;
  static toasts = [];

  constructor(message, type = 'info', options = {}) {
    this.message = message;
    this.type = type;
    this.options = {
      duration: 5000,
      closable: true,
      ...options
    };
    
    this.create();
    this.show();
  }

  static init() {
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.className = 'toast-container';
      this.container.innerHTML = '<div id="toast-list"></div>';
      document.body.appendChild(this.container);
    }
  }

  create() {
    this.element = document.createElement('div');
    this.element.className = `toast toast-${this.type}`;
    
    const content = document.createElement('div');
    content.className = 'toast-content';
    
    const messageElement = document.createElement('div');
    messageElement.className = 'toast-message';
    messageElement.textContent = this.message;
    
    content.appendChild(messageElement);
    
    if (this.options.closable) {
      const closeButton = document.createElement('button');
      closeButton.className = 'toast-close';
      closeButton.innerHTML = '×';
      closeButton.addEventListener('click', () => this.hide());
      content.appendChild(closeButton);
    }
    
    this.element.appendChild(content);
  }

  show() {
    Toast.init();
    
    const toastList = document.getElementById('toast-list');
    toastList.appendChild(this.element);
    
    Toast.toasts.push(this);
    
    // Trigger animation
    requestAnimationFrame(() => {
      this.element.classList.add('show');
    });
    
    // Auto hide
    if (this.options.duration > 0) {
      this.timeout = setTimeout(() => {
        this.hide();
      }, this.options.duration);
    }
  }

  hide() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    
    this.element.classList.remove('show');
    
    setTimeout(() => {
      if (this.element.parentElement) {
        this.element.parentElement.removeChild(this.element);
      }
      
      const index = Toast.toasts.indexOf(this);
      if (index > -1) {
        Toast.toasts.splice(index, 1);
      }
    }, 300);
  }

  static success(message, options = {}) {
    return new Toast(message, 'success', options);
  }

  static error(message, options = {}) {
    return new Toast(message, 'error', options);
  }

  static warning(message, options = {}) {
    return new Toast(message, 'warning', options);
  }

  static info(message, options = {}) {
    return new Toast(message, 'info', options);
  }

  static clear() {
    Toast.toasts.forEach(toast => toast.hide());
  }
}

/**
 * Table Component
 */
class Table extends Component {
  static defaults = {
    columns: [],
    data: [],
    sortable: true,
    pagination: false,
    pageSize: 10,
    searchable: false
  };

  constructor(element, options = {}) {
    super(element, options);
    this.sortColumn = null;
    this.sortDirection = 'asc';
    this.currentPage = 1;
    this.filteredData = [...this.options.data];
  }

  render() {
    if (!this.element) return;

    this.element.className = 'table-wrapper';
    
    const tableHTML = `
      ${this.options.searchable ? this.renderSearch() : ''}
      <table class="table">
        <thead class="table-header">
          ${this.renderHeader()}
        </thead>
        <tbody class="table-body">
          ${this.renderBody()}
        </tbody>
      </table>
      ${this.options.pagination ? this.renderPagination() : ''}
    `;
    
    this.element.innerHTML = tableHTML;
  }

  renderSearch() {
    return `
      <div class="table-search mb-4">
        <input type="text" class="input" placeholder="Buscar..." id="table-search">
      </div>
    `;
  }

  renderHeader() {
    return `
      <tr class="table-header-row">
        ${this.options.columns.map(column => `
          <th class="table-head ${this.options.sortable && column.sortable !== false ? 'sortable' : ''}" 
              data-column="${column.key}">
            ${column.title}
            ${this.options.sortable && column.sortable !== false ? this.renderSortIcon(column.key) : ''}
          </th>
        `).join('')}
      </tr>
    `;
  }

  renderSortIcon(columnKey) {
    if (this.sortColumn === columnKey) {
      return this.sortDirection === 'asc' ? ' ↑' : ' ↓';
    }
    return ' ↕';
  }

  renderBody() {
    const data = this.getPaginatedData();
    
    if (data.length === 0) {
      return `
        <tr>
          <td colspan="${this.options.columns.length}" class="table-cell text-center py-8 text-gray-500">
            Nenhum registro encontrado
          </td>
        </tr>
      `;
    }
    
    return data.map(row => `
      <tr class="table-row">
        ${this.options.columns.map(column => `
          <td class="table-cell">
            ${this.renderCell(row, column)}
          </td>
        `).join('')}
      </tr>
    `).join('');
  }

  renderCell(row, column) {
    const value = row[column.key];
    
    if (column.render) {
      return column.render(value, row);
    }
    
    return value || '';
  }

  renderPagination() {
    const totalPages = Math.ceil(this.filteredData.length / this.options.pageSize);
    
    if (totalPages <= 1) return '';
    
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(`
        <button class="pagination-item ${i === this.currentPage ? 'active' : ''}" 
                data-page="${i}">
          ${i}
        </button>
      `);
    }
    
    return `
      <div class="pagination">
        <button class="pagination-item" data-page="${this.currentPage - 1}" 
                ${this.currentPage <= 1 ? 'disabled' : ''}>
          ‹
        </button>
        ${pages.join('')}
        <button class="pagination-item" data-page="${this.currentPage + 1}" 
                ${this.currentPage >= totalPages ? 'disabled' : ''}>
          ›
        </button>
      </div>
    `;
  }

  bindEvents() {
    // Sort events
    if (this.options.sortable) {
      this.element.addEventListener('click', (e) => {
        const th = e.target.closest('.sortable');
        if (th) {
          const column = th.dataset.column;
          this.sort(column);
        }
      });
    }
    
    // Pagination events
    if (this.options.pagination) {
      this.element.addEventListener('click', (e) => {
        const pageButton = e.target.closest('.pagination-item');
        if (pageButton && !pageButton.disabled) {
          const page = parseInt(pageButton.dataset.page);
          this.goToPage(page);
        }
      });
    }
    
    // Search events
    if (this.options.searchable) {
      this.element.addEventListener('input', (e) => {
        if (e.target.id === 'table-search') {
          this.search(e.target.value);
        }
      });
    }
  }

  sort(column) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    
    this.filteredData.sort((a, b) => {
      let aVal = a[column];
      let bVal = b[column];
      
      if (typeof aVal === 'string') aVal = aVal.toLowerCase();
      if (typeof bVal === 'string') bVal = bVal.toLowerCase();
      
      if (aVal < bVal) return this.sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    
    this.currentPage = 1;
    this.render();
  }

  search(query) {
    if (!query) {
      this.filteredData = [...this.options.data];
    } else {
      this.filteredData = this.options.data.filter(row => {
        return this.options.columns.some(column => {
          const value = row[column.key];
          return value && value.toString().toLowerCase().includes(query.toLowerCase());
        });
      });
    }
    
    this.currentPage = 1;
    this.render();
  }

  goToPage(page) {
    const totalPages = Math.ceil(this.filteredData.length / this.options.pageSize);
    
    if (page >= 1 && page <= totalPages) {
      this.currentPage = page;
      this.render();
    }
  }

  getPaginatedData() {
    if (!this.options.pagination) {
      return this.filteredData;
    }
    
    const start = (this.currentPage - 1) * this.options.pageSize;
    const end = start + this.options.pageSize;
    
    return this.filteredData.slice(start, end);
  }

  setData(data) {
    this.options.data = data;
    this.filteredData = [...data];
    this.currentPage = 1;
    this.render();
  }

  addRow(row) {
    this.options.data.push(row);
    this.filteredData = [...this.options.data];
    this.render();
  }

  removeRow(index) {
    this.options.data.splice(index, 1);
    this.filteredData = [...this.options.data];
    this.render();
  }
}

// Export components
window.Component = Component;
window.Button = Button;
window.Input = Input;
window.Select = Select;
window.Modal = Modal;
window.Toast = Toast;
window.Table = Table;

export {
  Component,
  Button,
  Input,
  Select,
  Modal,
  Toast,
  Table
};