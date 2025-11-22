/**
 * Validate Brazilian CPF (Cadastro de Pessoa Física)
 *
 * @param cpf - CPF to validate (can be formatted or not)
 * @returns True if CPF is valid
 *
 * @example
 * ```ts
 * isValidCPF('123.456.789-09'); // true or false
 * isValidCPF('12345678909');    // true or false
 * ```
 */
export function isValidCPF(cpf: string): boolean {
  // Remove non-digit characters
  cpf = cpf.replace(/\D/g, '');

  // Check if has 11 digits
  if (cpf.length !== 11) {
    return false;
  }

  // Check if all digits are the same (invalid CPFs)
  if (/^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  // Validate first check digit
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let checkDigit = 11 - (sum % 11);
  if (checkDigit >= 10) checkDigit = 0;
  if (checkDigit !== parseInt(cpf.charAt(9))) {
    return false;
  }

  // Validate second check digit
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  checkDigit = 11 - (sum % 11);
  if (checkDigit >= 10) checkDigit = 0;
  if (checkDigit !== parseInt(cpf.charAt(10))) {
    return false;
  }

  return true;
}

/**
 * Validate Brazilian CNPJ (Cadastro Nacional da Pessoa Jurídica)
 *
 * @param cnpj - CNPJ to validate (can be formatted or not)
 * @returns True if CNPJ is valid
 *
 * @example
 * ```ts
 * isValidCNPJ('11.222.333/0001-81'); // true or false
 * isValidCNPJ('11222333000181');     // true or false
 * ```
 */
export function isValidCNPJ(cnpj: string): boolean {
  // Remove non-digit characters
  cnpj = cnpj.replace(/\D/g, '');

  // Check if has 14 digits
  if (cnpj.length !== 14) {
    return false;
  }

  // Check if all digits are the same (invalid CNPJs)
  if (/^(\d)\1{13}$/.test(cnpj)) {
    return false;
  }

  // Validate first check digit
  let length = cnpj.length - 2;
  let numbers = cnpj.substring(0, length);
  const digits = cnpj.substring(length);
  let sum = 0;
  let pos = length - 7;

  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(0))) {
    return false;
  }

  // Validate second check digit
  length = length + 1;
  numbers = cnpj.substring(0, length);
  sum = 0;
  pos = length - 7;

  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(1))) {
    return false;
  }

  return true;
}

/**
 * Validate email address using regex
 *
 * @param email - Email to validate
 * @returns True if email is valid
 *
 * @example
 * ```ts
 * isValidEmail('user@example.com'); // true
 * isValidEmail('invalid-email');    // false
 * ```
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate Brazilian phone number
 * Accepts: (11) 98765-4321, (11) 8765-4321, 11987654321, etc.
 *
 * @param phone - Phone number to validate
 * @returns True if phone is valid
 *
 * @example
 * ```ts
 * isValidPhone('(11) 98765-4321'); // true
 * isValidPhone('11987654321');     // true
 * isValidPhone('123');             // false
 * ```
 */
export function isValidPhone(phone: string): boolean {
  // Remove non-digit characters
  const digitsOnly = phone.replace(/\D/g, '');

  // Check if has 10 or 11 digits (with or without 9 at the beginning)
  if (digitsOnly.length < 10 || digitsOnly.length > 11) {
    return false;
  }

  // Check if DDD (area code) is valid (11-99)
  const ddd = parseInt(digitsOnly.substring(0, 2));
  if (ddd < 11 || ddd > 99) {
    return false;
  }

  // If has 11 digits, check if the third digit is 9 (mobile)
  if (digitsOnly.length === 11) {
    return digitsOnly.charAt(2) === '9';
  }

  return true;
}

/**
 * Validate Brazilian CEP (Código de Endereçamento Postal)
 *
 * @param cep - CEP to validate
 * @returns True if CEP is valid
 *
 * @example
 * ```ts
 * isValidCEP('01310-100'); // true
 * isValidCEP('01310100');  // true
 * isValidCEP('123');       // false
 * ```
 */
export function isValidCEP(cep: string): boolean {
  // Remove non-digit characters
  const digitsOnly = cep.replace(/\D/g, '');

  // Check if has exactly 8 digits
  return digitsOnly.length === 8;
}

/**
 * Validate Brazilian license plate (old and new Mercosul format)
 * Old format: ABC1234
 * New format: ABC1D23
 *
 * @param plate - License plate to validate
 * @returns True if plate is valid
 *
 * @example
 * ```ts
 * isValidPlate('ABC1234');  // true (old format)
 * isValidPlate('ABC1D23');  // true (new Mercosul format)
 * isValidPlate('AB12345');  // false
 * ```
 */
export function isValidPlate(plate: string): boolean {
  // Remove spaces and convert to uppercase
  plate = plate.replace(/\s/g, '').toUpperCase();

  // Old format: ABC1234
  const oldFormat = /^[A-Z]{3}\d{4}$/;

  // New Mercosul format: ABC1D23
  const newFormat = /^[A-Z]{3}\d[A-Z]\d{2}$/;

  return oldFormat.test(plate) || newFormat.test(plate);
}

/**
 * Validate URL
 *
 * @param url - URL to validate
 * @returns True if URL is valid
 *
 * @example
 * ```ts
 * isValidURL('https://example.com'); // true
 * isValidURL('invalid-url');         // false
 * ```
 */
export function isValidURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate date string in format YYYY-MM-DD or DD/MM/YYYY
 *
 * @param date - Date string to validate
 * @returns True if date is valid
 *
 * @example
 * ```ts
 * isValidDate('2024-01-15'); // true
 * isValidDate('15/01/2024'); // true
 * isValidDate('invalid');    // false
 * ```
 */
export function isValidDate(date: string): boolean {
  // Check YYYY-MM-DD format
  const isoFormat = /^\d{4}-\d{2}-\d{2}$/;
  if (isoFormat.test(date)) {
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime());
  }

  // Check DD/MM/YYYY format
  const brFormat = /^\d{2}\/\d{2}\/\d{4}$/;
  if (brFormat.test(date)) {
    const [day, month, year] = date.split('/').map(Number);
    const parsedDate = new Date(year, month - 1, day);
    return !isNaN(parsedDate.getTime()) &&
           parsedDate.getDate() === day &&
           parsedDate.getMonth() === month - 1 &&
           parsedDate.getFullYear() === year;
  }

  return false;
}

/**
 * Validate if string contains only letters (A-Z, a-z, áéíóú, etc.)
 *
 * @param text - Text to validate
 * @returns True if text contains only letters
 *
 * @example
 * ```ts
 * isOnlyLetters('João Silva'); // true
 * isOnlyLetters('João123');    // false
 * ```
 */
export function isOnlyLetters(text: string): boolean {
  return /^[a-zA-ZÀ-ÿ\s]+$/.test(text);
}

/**
 * Validate if string contains only numbers
 *
 * @param text - Text to validate
 * @returns True if text contains only numbers
 *
 * @example
 * ```ts
 * isOnlyNumbers('12345'); // true
 * isOnlyNumbers('123a5'); // false
 * ```
 */
export function isOnlyNumbers(text: string): boolean {
  return /^\d+$/.test(text);
}

/**
 * Validate password strength
 * Rules: min 8 chars, at least 1 uppercase, 1 lowercase, 1 number, 1 special char
 *
 * @param password - Password to validate
 * @returns True if password is strong
 *
 * @example
 * ```ts
 * isStrongPassword('MyP@ssw0rd'); // true
 * isStrongPassword('weak');       // false
 * ```
 */
export function isStrongPassword(password: string): boolean {
  // Min 8 characters
  if (password.length < 8) {
    return false;
  }

  // At least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return false;
  }

  // At least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return false;
  }

  // At least one number
  if (!/\d/.test(password)) {
    return false;
  }

  // At least one special character
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    return false;
  }

  return true;
}
