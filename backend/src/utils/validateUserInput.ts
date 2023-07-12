import { isValidEmail } from './validEmail';

function validateRegistrationInput(firstName: string, lastName: string, email: string, password: string) {
  const errors: string[] = [];

  if (!firstName || !lastName || !email || !password) {
    errors.push('All fields are required.');
  }

  if (!isValidEmail(email)) {
    errors.push('Invalid email address.');
  }

  return errors;
}

function validateLoginInput(email: string, password: string) {
  const errors: string[] = [];

  if (!email || !password) {
    errors.push('All fields are required.');
  }

  if (!isValidEmail(email)) {
    errors.push('Invalid email address.');
  }

  return errors;
}

export { validateLoginInput, validateRegistrationInput };
