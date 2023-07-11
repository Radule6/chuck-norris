function handleLoginSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const email = formData.get('email');
  const password = formData.get('password');

  login(email, password);
  form.reset();
}

const loginForm = document.querySelector('.login-form');
loginForm.addEventListener('submit', handleLoginSubmit);
