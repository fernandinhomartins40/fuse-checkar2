/**
 * Format CPF (Cadastro de Pessoa Física)
 *
 * @param cpf - CPF to format (digits only or formatted)
 * @returns Formatted CPF (XXX.XXX.XXX-XX) or original if invalid
 *
 * @example
 * ```ts
 * formatCPF('12345678909'); // '123.456.789-09'
 * ```
 */
export function formatCPF(cpf: string): string {
  // Remove non-digit characters
  const digitsOnly = cpf.replace(/\D/g, '');

  // Check if has 11 digits
  if (digitsOnly.length !== 11) {
    return cpf;
  }

  // Format: XXX.XXX.XXX-XX
  return digitsOnly.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

/**
 * Format CNPJ (Cadastro Nacional da Pessoa Jurídica)
 *
 * @param cnpj - CNPJ to format (digits only or formatted)
 * @returns Formatted CNPJ (XX.XXX.XXX/XXXX-XX) or original if invalid
 *
 * @example
 * ```ts
 * formatCNPJ('11222333000181'); // '11.222.333/0001-81'
 * ```
 */
export function formatCNPJ(cnpj: string): string {
  // Remove non-digit characters
  const digitsOnly = cnpj.replace(/\D/g, '');

  // Check if has 14 digits
  if (digitsOnly.length !== 14) {
    return cnpj;
  }

  // Format: XX.XXX.XXX/XXXX-XX
  return digitsOnly.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
}

/**
 * Format phone number
 *
 * @param phone - Phone to format (digits only or formatted)
 * @returns Formatted phone (XX) XXXXX-XXXX or (XX) XXXX-XXXX or original if invalid
 *
 * @example
 * ```ts
 * formatPhone('11987654321'); // '(11) 98765-4321'
 * formatPhone('1187654321');  // '(11) 8765-4321'
 * ```
 */
export function formatPhone(phone: string): string {
  // Remove non-digit characters
  const digitsOnly = phone.replace(/\D/g, '');

  // Check if has 10 or 11 digits
  if (digitsOnly.length === 11) {
    // Format: (XX) XXXXX-XXXX
    return digitsOnly.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  } else if (digitsOnly.length === 10) {
    // Format: (XX) XXXX-XXXX
    return digitsOnly.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }

  return phone;
}

/**
 * Format CEP (Código de Endereçamento Postal)
 *
 * @param cep - CEP to format (digits only or formatted)
 * @returns Formatted CEP (XXXXX-XXX) or original if invalid
 *
 * @example
 * ```ts
 * formatCEP('01310100'); // '01310-100'
 * ```
 */
export function formatCEP(cep: string): string {
  // Remove non-digit characters
  const digitsOnly = cep.replace(/\D/g, '');

  // Check if has 8 digits
  if (digitsOnly.length !== 8) {
    return cep;
  }

  // Format: XXXXX-XXX
  return digitsOnly.replace(/(\d{5})(\d{3})/, '$1-$2');
}

/**
 * Format license plate
 *
 * @param plate - Plate to format
 * @returns Formatted plate (ABC-1234 or ABC-1D23) in uppercase
 *
 * @example
 * ```ts
 * formatPlate('abc1234'); // 'ABC-1234'
 * formatPlate('abc1d23'); // 'ABC-1D23'
 * ```
 */
export function formatPlate(plate: string): string {
  // Remove spaces and convert to uppercase
  plate = plate.replace(/\s/g, '').toUpperCase();

  // Remove non-alphanumeric characters
  const cleanPlate = plate.replace(/[^A-Z0-9]/g, '');

  // Check if has 7 characters
  if (cleanPlate.length !== 7) {
    return plate;
  }

  // Format: ABC-1234 or ABC-1D23
  return cleanPlate.replace(/(\w{3})(\w{4})/, '$1-$2');
}

/**
 * Format currency to Brazilian Real (BRL)
 *
 * @param value - Value to format (number or string)
 * @param includeCurrency - Include R$ symbol (default: true)
 * @returns Formatted currency
 *
 * @example
 * ```ts
 * formatCurrency(1234.56);        // 'R$ 1.234,56'
 * formatCurrency(1234.56, false); // '1.234,56'
 * formatCurrency('1234.56');      // 'R$ 1.234,56'
 * ```
 */
export function formatCurrency(value: number | string, includeCurrency: boolean = true): string {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(numValue)) {
    return includeCurrency ? 'R$ 0,00' : '0,00';
  }

  const formatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(numValue);

  return includeCurrency ? formatted : formatted.replace('R$', '').trim();
}

/**
 * Format date to Brazilian format (DD/MM/YYYY)
 *
 * @param date - Date to format (Date object, ISO string, or timestamp)
 * @returns Formatted date (DD/MM/YYYY)
 *
 * @example
 * ```ts
 * formatDate(new Date());           // '19/11/2025'
 * formatDate('2024-01-15');         // '15/01/2024'
 * formatDate(1705276800000);        // '15/01/2024'
 * ```
 */
export function formatDate(date: Date | string | number): string {
  const dateObj = date instanceof Date ? date : new Date(date);

  if (isNaN(dateObj.getTime())) {
    return '';
  }

  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();

  return `${day}/${month}/${year}`;
}

/**
 * Format datetime to Brazilian format (DD/MM/YYYY HH:mm:ss)
 *
 * @param date - Date to format (Date object, ISO string, or timestamp)
 * @param includeSeconds - Include seconds (default: true)
 * @returns Formatted datetime
 *
 * @example
 * ```ts
 * formatDateTime(new Date());        // '19/11/2025 14:30:45'
 * formatDateTime(new Date(), false); // '19/11/2025 14:30'
 * ```
 */
export function formatDateTime(date: Date | string | number, includeSeconds: boolean = true): string {
  const dateObj = date instanceof Date ? date : new Date(date);

  if (isNaN(dateObj.getTime())) {
    return '';
  }

  const formattedDate = formatDate(dateObj);
  const hours = String(dateObj.getHours()).padStart(2, '0');
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');

  if (!includeSeconds) {
    return `${formattedDate} ${hours}:${minutes}`;
  }

  const seconds = String(dateObj.getSeconds()).padStart(2, '0');
  return `${formattedDate} ${hours}:${minutes}:${seconds}`;
}

/**
 * Truncate text to a maximum length
 *
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @param suffix - Suffix to add when truncated (default: '...')
 * @returns Truncated text
 *
 * @example
 * ```ts
 * truncate('Hello World', 5);      // 'Hello...'
 * truncate('Hello', 10);           // 'Hello'
 * truncate('Hello World', 5, '…'); // 'Hello…'
 * ```
 */
export function truncate(text: string, maxLength: number, suffix: string = '...'): string {
  if (text.length <= maxLength) {
    return text;
  }

  return text.substring(0, maxLength - suffix.length) + suffix;
}

/**
 * Convert text to slug (URL-friendly string)
 *
 * @param text - Text to convert
 * @returns Slug
 *
 * @example
 * ```ts
 * slugify('Hello World!');        // 'hello-world'
 * slugify('Olá Mundo!!!');        // 'ola-mundo'
 * slugify('Testing   Spaces');    // 'testing-spaces'
 * ```
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')                    // Normalize to decomposed form
    .replace(/[\u0300-\u036f]/g, '')    // Remove diacritics
    .replace(/[^\w\s-]/g, '')           // Remove non-word chars
    .replace(/\s+/g, '-')               // Replace spaces with -
    .replace(/--+/g, '-')               // Replace multiple - with single -
    .replace(/^-+/, '')                 // Trim - from start
    .replace(/-+$/, '');                // Trim - from end
}

/**
 * Capitalize first letter of each word
 *
 * @param text - Text to capitalize
 * @returns Capitalized text
 *
 * @example
 * ```ts
 * capitalize('hello world'); // 'Hello World'
 * capitalize('HELLO WORLD'); // 'Hello World'
 * ```
 */
export function capitalize(text: string): string {
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Format file size in bytes to human-readable format
 *
 * @param bytes - File size in bytes
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted file size
 *
 * @example
 * ```ts
 * formatFileSize(1024);      // '1.00 KB'
 * formatFileSize(1048576);   // '1.00 MB'
 * formatFileSize(1234567);   // '1.18 MB'
 * ```
 */
export function formatFileSize(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
}

/**
 * Remove all non-digit characters from string
 *
 * @param text - Text to clean
 * @returns Text with only digits
 *
 * @example
 * ```ts
 * onlyDigits('123.456.789-09'); // '12345678909'
 * onlyDigits('(11) 98765-4321'); // '11987654321'
 * ```
 */
export function onlyDigits(text: string): string {
  return text.replace(/\D/g, '');
}

/**
 * Mask sensitive data (show only first and last characters)
 *
 * @param text - Text to mask
 * @param visibleChars - Number of visible characters at start and end (default: 3)
 * @param maskChar - Character to use for masking (default: '*')
 * @returns Masked text
 *
 * @example
 * ```ts
 * maskSensitiveData('12345678909');           // '123******09'
 * maskSensitiveData('user@example.com', 2);   // 'us**********om'
 * maskSensitiveData('secret', 1, '#');        // 's####t'
 * ```
 */
export function maskSensitiveData(text: string, visibleChars: number = 3, maskChar: string = '*'): string {
  if (text.length <= visibleChars * 2) {
    return maskChar.repeat(text.length);
  }

  const start = text.substring(0, visibleChars);
  const end = text.substring(text.length - visibleChars);
  const middle = maskChar.repeat(text.length - visibleChars * 2);

  return start + middle + end;
}
