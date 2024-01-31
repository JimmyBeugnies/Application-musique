document.addEventListener('DOMContentLoaded', () => {
    loadTrendingMusic();
    loadCategories();
});

function loadTrendingMusic() {
    const apiKey = 'AIzaSyB6kpFAGLL8cXtPSd4MF7SjE2MbBm-W21s';
    const maxResults = 50; // Vous pouvez ajuster ce nombre, la limite maximale est généralement de 50
    const requestURL = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=FR&videoCategoryId=10&maxResults=${maxResults}&key=${apiKey}`;

    fetch(requestURL)
        .then(response => response.json())
        .then(data => {
            displayTrendingMusic(data.items);
        })
        .catch(error => console.error('Erreur lors du chargement des musiques en tendance:', error));
}


function displayTrendingMusic(videos) {
    const tendancesContainer = document.getElementById('tendances');
    tendancesContainer.innerHTML = ''; // Effacer les contenus précédents

    videos.forEach(video => {
        const artistName = extractArtistName(video.snippet.title);
        const videoElement = document.createElement('div');
        videoElement.className = 'video';
        videoElement.innerHTML = `
            <img class="thumbnailimg" src="${video.snippet.thumbnails.high.url}" alt="Miniature">
            <h3 class="titleh3">${artistName}</h3>
        `;
        tendancesContainer.appendChild(videoElement);
    });
}

function extractArtistName(videoTitle) {
    let artistName = videoTitle.split('-')[0].trim(); 
    return artistName;
}





function loadCategories() {
    const categories = ['Pop', 'Hip-Hop', 'Rap', 'Drill'];
    const categoriesContainer = document.getElementById('accueil');

    categories.forEach(category => {
        const categoryElement = document.createElement('div');
        categoryElement.className = 'category';
        categoryElement.innerHTML = `
            <h3>${category}</h3>
            <div id="category-${category}" class="videos-container"></div>
        `;
        categoriesContainer.appendChild(categoryElement);
        loadVideosForCategory(category);
    });
}

function loadVideosForCategory(category) {
    const apiKey = 'AIzaSyBhDzqCeJ7MTgDfptxSg8bsUBoXt6PUB2Q';
    const maxResults = 10; // Limite pour chaque catégorie
    const requestURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${category}&maxResults=${maxResults}&key=${apiKey}`;

    fetch(requestURL)
        .then(response => response.json())
        .then(data => {
            displayVideosForCategory(data.items, category);
        })
        .catch(error => console.error(`Erreur lors du chargement des vidéos pour la catégorie ${category}:`, error));
}

function displayVideosForCategory(videos, category) {
    const categoryVideosContainer = document.getElementById(`category-${category}`);
    categoryVideosContainer.innerHTML = '';

    videos.forEach(video => {
        const videoElement = document.createElement('div');
        videoElement.className = 'video';
        videoElement.innerHTML = `
            <img class="thumbnailimg" src="${video.snippet.thumbnails.high.url}" alt="Miniature">
        `;
        categoryVideosContainer.appendChild(videoElement);
    });
}