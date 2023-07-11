const API_URL = 'http://localhost:8000/api';

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

function handleLoginSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const email = formData.get('email');
  const password = formData.get('password');

  login(email, password);
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

  register(firstName, lastName, email, password);
  form.reset();
}
