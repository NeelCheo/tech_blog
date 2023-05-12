
const goPost = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/post/${id}`);

    if (response.ok) {
      document.location.replace(`/post/${id}`);
    } else {
      alert('Failed to go to post');
    }
  }
}

document
  .querySelectorAll('.post')
  .forEach(post => post.addEventListener('click', goPost));