const url = 'https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4N2NhM2IwZGI1OGNmNjU2YTNiMzY2YTUyNWVkMzVjNCIsIm5iZiI6MTc3MjU1MTQ0Mi40MDksInN1YiI6IjY5YTZmZDEyMDU3ZTRmMTcwYjgxZjgxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DDfTiJr1kcTjAoesUjiFYRLZaisdRx2xxJ2WnyXMimw'
  }
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error(err));