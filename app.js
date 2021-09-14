import apiKey from "./.env";
const apiURL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}`;
const imagePack = 'https://image.tmdb.org/t/p/w1280';
const main = document.getElementById('main');
const form = document.getElementById('form');
const searchBar = document.getElementById('search');
const searchAPI = 'https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=';
const searchQuery = document.getElementById('trending-greeting');
const homeButton = document.getElementById('home-button');

getMovies(apiURL);

async function getMovies(URL) {
    const response = await fetch(URL);
    const resData = await response.json();

    console.log(resData.results);

    showMoviesOnSearch(resData.results);
}

function showMoviesOnSearch(movies) {
    main.innerHTML = '';

    movies.forEach(movie => {
        const movieEl = document.createElement('div');

        const  { poster_path, title, vote_average, overview } = movie;
        movieEl.classList.add('movie');

        movieEl.innerHTML = 
        `<img src="${imagePack + poster_path}" alt="${title}">
                    
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h4>Overview:</h4>
                ${overview}
            </div>`

           main.appendChild(movieEl)
    });
}

function getClassByRate(vote) {
    if(vote >= 8) {
        return 'green'
    } else if (vote >= 5) {
        return 'amber'
    } else {
        return 'red'
    }
}

form.addEventListener('submit', (evnt) => {
    evnt.preventDefault();

    const searchTerm = searchBar.value;

    if(searchTerm) {
        getMovies(searchAPI + searchTerm);
        searchBar.value = '';

        searchQuery.innerHTML = `Search results for "${searchTerm}" :` ;

        homeButton.innerHTML = 'Home'
        homeButton.classList.add('nav-button');  
    }
});

