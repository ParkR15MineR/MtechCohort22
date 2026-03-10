// Get Movie ID from URL (e.g., details.html?id=123)
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

const API_KEY = '87ca3b0db58cf656a3b366a525ed35c4';
const BASE_URL = 'https://api.themoviedb.org/3';

async function loadMovieDetails() {
  // Fetch details AND videos (trailers) in one go using append_to_response
  const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos,credits`);
  const movie = await response.json();

  displayDetails(movie);
  setupSaveFeature(movie);
}

function displayDetails(movie) {
  const container = document.getElementById('movie-details');
  const genres = movie.genres.map(g => g.name).join(', ');
  
  container.innerHTML = `
    <h1>${movie.title}</h1>
    <p><strong>Runtime:</strong> ${movie.runtime} mins | <strong>Released:</strong> ${movie.release_date}</p>
    <p><strong>Genres:</strong> ${genres}</p>
    <p>${movie.overview}</p>
  `;

  // Embed Trailer if it exists
  const trailer = movie.videos.results.find(v => v.type === 'Trailer');
  if (trailer) {
    document.getElementById('trailer-container').innerHTML = `
      <iframe width="560" height="315" src="https://www.youtube.com/embed/${trailer.key}" frameborder="0" allowfullscreen></iframe>
    `;
  }
}

function setupSaveFeature(movie) {
  const saveBtn = document.getElementById('save-movie-btn');
  
  saveBtn.onclick = () => {
    const rating = document.getElementById('user-rating').value;
    const comment = document.getElementById('user-comment').value;

    // Create the saved object
    const savedMovie = {
      id: movie.id,
      title: movie.title,
      poster: movie.poster_path,
      userRating: rating,
      userComment: comment
    };

    // Get existing list from localStorage or start a new one
    let savedList = JSON.parse(localStorage.getItem('myMovies')) || [];
    
    // Add new movie (replace if it's already there)
    savedList = savedList.filter(m => m.id !== movie.id);
    savedList.push(savedMovie);

    // Save back to localStorage
    localStorage.setItem('myMovies', JSON.stringify(savedList));
    alert('Movie saved to your list!');
  };
}

loadMovieDetails();