
// Initialize variables
const movieCards = document.getElementById('movie-cards');
const searchBar = document.getElementById('search-bar');
const searchButton = document.getElementById('search-btn');
const pagination = document.getElementById('pagination');
let currentPage = 1;
const moviesPerPage = 10;

// Function to display movies
function displayMovies(moviesToDisplay, headingText) {
movieCards.innerHTML = ''; // Clear existing movie cards
document.getElementById('movie-heading').textContent = headingText;

moviesToDisplay.forEach((movie) => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');

    movieCard.innerHTML = `
        <img src="${movie.poster}" alt="${movie.title}">
        <h3>${movie.title}</h3>
        <p>${movie.genre}</p>
        <button><a href="${movie.link}" target="_blank">Download</a></button>
    `;

    movieCards.appendChild(movieCard);
});
}

// Function to create pagination
function createPagination(totalMovies) {
pagination.innerHTML = '';

const totalPages = Math.ceil(totalMovies / moviesPerPage);
const startPage = Math.max(1, currentPage - 2);
const endPage = Math.min(totalPages, currentPage + 2);
let isFirst = currentPage === 1;
let isLast = currentPage === totalPages;

for (let i = startPage; i <= endPage; i++) {
    const pageLink = document.createElement('a');
    pageLink.textContent = i;
    pageLink.classList.add('page-link');

    if (i === currentPage) {
        pageLink.classList.add('active');
        pageLink.classList.add('backred');
    }

    pageLink.addEventListener('click', () => {
        currentPage = i;
        searchMovies(searchBar.value.trim().toLowerCase());
    });

    pagination.appendChild(pageLink);
}

if (!isFirst) {
    const prevLink = document.createElement('a');
    prevLink.textContent = '«';
    prevLink.classList.add('page-link');

    prevLink.addEventListener('click', () => {
        currentPage = Math.max(1, currentPage - 1);
        searchMovies(searchBar.value.trim().toLowerCase());
    });

    pagination.insertBefore(prevLink, pagination.firstChild);
}

if (!isLast) {
    const nextLink = document.createElement('a');
    nextLink.textContent = '»';
    nextLink.classList.add('page-link');

    nextLink.addEventListener('click', () => {
        currentPage = Math.min(totalPages, currentPage + 1);
        searchMovies(searchBar.value.trim().toLowerCase());
    });

    pagination.appendChild(nextLink);
}
}

// Function to search movies
function searchMovies(searchTerm) {
fetch('movies.json')
    .then(response => response.json())
    .then(data => {
        const filteredMovies = data.filter(movie => movie.title.toLowerCase().includes(searchTerm));
        const totalFilteredMovies = filteredMovies.length;
        const startIndex = (currentPage - 1) * moviesPerPage;
        const endIndex = Math.min(startIndex + moviesPerPage, totalFilteredMovies);
        const moviesToDisplay = filteredMovies.slice(startIndex, endIndex);
        displayMovies(moviesToDisplay, `${searchTerm}`);
        createPagination(totalFilteredMovies);
    })
    .catch(error => console.error('Error fetching movies:', error));
}

// Initial display of movies
searchMovies(''); // Display all movies initially

// Event listener for search button click
searchButton.addEventListener('click', () => {
currentPage = 1; // Reset current page when searching
searchMovies(searchBar.value.trim().toLowerCase());
})

// banner add
setInterval(() => {
  document.getElementById('ad-container').style.display = 'block';
}, 1500);

// Redirect to a new website when the advertisement is clicked
document.getElementById('ad-link').addEventListener('click', () => {
  window.location.href = 'https://myshopprime.com/tif/wxfolge'; // Change this URL to your desired website
});

// X button for add
document.getElementById('ad-close-btn').addEventListener('click',()=>{
    document.getElementById('ad-container').style.display = 'none'
})