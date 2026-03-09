const movieContainer = document.getElementById('movie-container');

async function getMovies() {
  // 1. Fetch the data from the API
  const response = await fetch('?api_key=87ca3b0db58cf656a3b366a525ed35c4');
  
  // 2. Convert the response to JSON
  const data = await response.json();
  
  // 3. Loop through the movies and create HTML for each
  data.results.forEach(movie => {
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-card');

    movieElement.innerHTML = `
      <img src="${movie.poster_path}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <p>Rating: ${movie.vote_average}</p>
    `;

    // 4. Append to your container
    movieContainer.appendChild(movieElement);
  });
}
const movieGrid = document.getElementById('movie-grid');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const sectionTitle = document.getElementById('section-title');

const API_KEY = '87ca3b0db58cf656a3b366a525ed35c4'; // Replace with your actual key
const BASE_URL = 'https://api.themoviedb.org/3';

// Load Popular Movies on startup
window.addEventListener('DOMContentLoaded', () => {
  fetchMovies(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
});

// Search Logic
searchButton.addEventListener('click', () => {
  const query = searchInput.value;
  if (query) {
    sectionTitle.innerText = `Results for: "${query}"`;
    fetchMovies(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
  }
});

async function fetchMovies(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    displayMovies(data.results);
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
}

function displayMovies(movies) {
  movieGrid.innerHTML = ''; // Clear previous results

  movies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');
    
    // Set up navigation to Page 2 (Details) using URL parameters
    movieCard.onclick = () => {
      window.location.href = `details.html?id=${movie.id}`;
    };

    movieCard.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
      <div class="info">
        <h3>${movie.title}</h3>
        <span>${movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</span>
        <span class="rating">⭐ ${movie.vote_average}</span>
      </div>
    `;
    movieGrid.appendChild(movieCard);
  });
}

getMovies();