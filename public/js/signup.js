const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.getElementById('username-signup').value;
  const password = document.getElementById('password-signup').value;

  fetch('/api/users/signUp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })
  .then(response => response.json())
  .then(data => {
    if (data) {
      window.location.href = '/login';
    } else {
      return
    }
  })
};


document
  .querySelector('#signup-form')
  .addEventListener('submit', signupFormHandler);
