const newFormHandler = async (event) => {
  event.preventDefault();

  const body = document.querySelector('#comment-body').value.trim();

  if (body) {
    const response = await fetch(`/api/comment`, {
      method: 'POST',
      body: JSON.stringify({ body }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/comments');
    } else {
      alert('Failed to create comment');
    }
  }
};

document
  .querySelector('.new-comment-form')
  .addEventListener('submit', newFormHandler);
