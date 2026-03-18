const savedGrid = document.getElementById('saved-grid');
const emptyMsg = document.getElementById('empty-msg');

function loadSavedMovies() {
  // 1. Retrieve the list from LocalStorage
  const savedData = localStorage.getItem('myMovies');
  const savedList = JSON.parse(savedData) || [];

  // 2. Check if the list is empty
  if (savedList.length === 0) {
    emptyMsg.style.display = 'block';
    return;
  }

  // 3. Clear the grid and render each movie
  savedGrid.innerHTML = '';
  
  savedList.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card', 'saved-item');

    // clicking takes them back to details for that movie
    movieCard.onclick = () => {
      window.location.href = `details.html?id=${movie.id}`;
    };

    movieCard.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster}" alt="${movie.title}">
      <div class="info">
        <h3>${movie.title}</h3>
        <p class="user-rating">Your Rating: ⭐ ${movie.userRating}</p>
        <p class="user-note">"${movie.userComment}"</p>
        <button class="delete-btn" onclick="removeMovie(event, ${movie.id})">Remove</button>
      </div>
    `;
    savedGrid.appendChild(movieCard);
  });
}

// 4. Function to remove a movie from the list
function removeMovie(event, id) {
  event.stopPropagation(); // Prevents the card click from triggering navigation
  
  let savedList = JSON.parse(localStorage.getItem('myMovies')) || [];
  savedList = savedList.filter(m => m.id !== id);
  
  localStorage.setItem('myMovies', JSON.stringify(savedList));
  loadSavedMovies(); // Refresh the list on the screen
}

loadSavedMovies();