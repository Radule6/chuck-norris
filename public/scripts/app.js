/*--API-URL--*/
const API_URL = 'http://localhost:8000/api';

/*--Navigation--*/
const navButton = document.querySelector('.nav-icon');
navButton.addEventListener('click', () => {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('open');
});

/*----Form-sanitization-&-validation*/
function sanitizeInput(input) {
  const sanitizedInput = input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

  return sanitizedInput;
}

const validateForm = () => {
  const form = document.querySelector('form');

  const errorMessage = document.querySelector('.errMs');
  errorMessage.textContent = '';

  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const sanitizedEmail = sanitizeInput(emailInput.value);
  const sanitizedPassword = sanitizeInput(passwordInput.value);

  if (form.classList.contains('register-form')) {
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');

    const sanitizedFirstName = sanitizeInput(firstNameInput.value);
    const sanitizedLastName = sanitizeInput(lastNameInput.value);

    firstNameInput.value = sanitizedFirstName.trim();
    lastNameInput.value = sanitizedLastName.trim();

    if (sanitizedFirstName.trim() === '') {
      errorMessage.textContent = 'First name is required.';
      return false;
    }

    if (sanitizedLastName.trim() === '') {
      errorMessage.textContent = 'Last name is required.';
      return false;
    }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(sanitizedEmail)) {
    errorMessage.textContent = 'Invalid email address.';
    return false;
  }

  if (sanitizedPassword.trim() === '') {
    errorMessage.textContent = 'Password is required.';
    return false;
  }

  passwordInput.value = sanitizedPassword.trim();

  return true;
};

/*--API--*/
async function login(email, password) {
  const url = `${API_URL}/user/login`;
  const body = new URLSearchParams();
  body.append('email', email);
  body.append('password', password);
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  };

  try {
    const response = await fetch(url, requestOptions);
    const data = await response.json();

    if (!response.ok) {
      document.querySelector('.errMs').textContent = data.message;
      throw new Error('Invalid Credentials');
    }
    window.location = '/dashboard';
  } catch (error) {}
}
async function register(firstName, lastName, email, password) {
  const url = `${API_URL}/user/register`;
  const body = new URLSearchParams();
  body.append('firstName', firstName);
  body.append('lastName', lastName);
  body.append('email', email);
  body.append('password', password);
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  };

  try {
    const response = await fetch(url, requestOptions);
    const data = await response.json();

    if (!response.ok) {
      document.querySelector('.errMs').textContent = data.message;
    }
    window.location = '/login';
  } catch (error) {}
}

async function logoutUser() {
  try {
    const response = await fetch('http://localhost:8000/api/user/logout', {
      method: 'POST',
    });

    if (response.ok) {
      window.location = '/login';
    } else {
      const errorData = await response.json();
      console.log('Logout failed:', errorData.error);
      // Handle the logout error
    }
  } catch (error) {
    console.error('An error occurred during logout:', error);
    // Handle any network or server error
  }
}

async function getAQuote() {
  const url = `${API_URL}/chucknorris/quote`;
  const quote = document.querySelector('.heading');
  const response = await fetch(url);
  const quoteData = await response.json();
  quote.textContent = quoteData.quote;
}

/*--Form Submissions--*/
function handleLoginSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const email = formData.get('email');
  const password = formData.get('password');
  const check = validateForm();

  if (check) {
    login(email, password);
  }
  form.reset();
}

function handleRegisterSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const firstName = formData.get('firstName');
  const lastName = formData.get('lastName');
  const email = formData.get('email');
  const password = formData.get('password');

  const check = validateForm();
  if (check) {
    register(firstName, lastName, email, password);
  }
  form.reset();
}

/*--Event-Listeners--*/
const registerForm = document.querySelector('.register-form') || null;
if (registerForm) {
  registerForm.addEventListener('submit', handleRegisterSubmit);
}

const loginForm = document.querySelector('.login-form') || null;
if (loginForm) {
  loginForm.addEventListener('submit', handleLoginSubmit);
}

const logoutBtn = document.getElementById('logout');
if (logoutBtn) {
  logoutBtn.addEventListener('click', logoutUser);
}

const quoteButton = document.getElementById('quoteButton');
if (quoteButton) {
  quoteButton.addEventListener('click', getAQuote);
}

const dashboard = document.querySelector('.dashboard');
if (dashboard) {
  window.addEventListener('load', function () {
    getAQuote();
  });
}
