const logout = async (event) => {
  event.preventDefault();
  const response = await fetch(`/api/users/logout`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to logout');
  }
}

document
  .querySelector('.login-nav')
  .addEventListener('click', () => {
    document.location.replace('/login');
  });

document
  .querySelector('.home-nav')
  .addEventListener('click', () => {
    document.location.replace('/');
  });

document
  .querySelector('.dashboard-nav')
  .addEventListener('click', () => {
    document.location.replace('/dashboard');
  });

  document
  .querySelector('.logout-nav')
  .addEventListener('click', logout);