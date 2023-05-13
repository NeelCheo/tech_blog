if (document.querySelector('#logout-nav')) {
document
.querySelector('#logout-nav')
.addEventListener('click', async (event) => {
  event.preventDefault();

  const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
      document.location.replace('/');
  } else {
      alert(response.statusText);
  }
});}

if (document.querySelector('#logout-nav')) {
document
  .querySelector('#login-nav')
  .addEventListener('click', () => {
    document.location.replace('/login');
  });}

document
  .querySelector('#home-nav')
  .addEventListener('click', () => {
    document.location.replace('/');
  });

document
  .querySelector('#dashboard-nav')
  .addEventListener('click', () => {
    if (!document.querySelector('#logout-nav')) {
      document.location.replace('/login');
    } else {
      document.location.replace('/dashboard');
    }
  });
