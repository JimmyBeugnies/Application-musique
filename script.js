const searchInput = document.querySelector('.search-input');
searchInput.addEventListener('input', (event) => {
    const query = event.target.value;
    if (query.length > 2) { // Optionnel: déclencher la recherche après 2 caractères
        searchYouTube(query);
    }
});

function searchYouTube(query) {
    // Assurez-vous de remplacer cette clé par votre clé API personnelle et sécurisée
    const apiKey = 'AIzaSyBhDzqCeJ7MTgDfptxSg8bsUBoXt6PUB2Q';
    const requestURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&key=${apiKey}`;

    fetch(requestURL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => displayResults(data.items))
        .catch(error => console.error('Erreur lors de la recherche YouTube:', error));
}

function displayResults(videoItems) {
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = ''; // Effacer les résultats précédents

    videoItems.forEach(item => {
        const { videoId } = item.id;
        const { title, thumbnails } = item.snippet;
        const thumbnailUrl = thumbnails.default.url;

        const videoDiv = document.createElement('div');
        videoDiv.className = 'searchItem';
        videoDiv.innerHTML = `
            <img src="${thumbnailUrl}" alt="Miniature">
            <span class="title">${title}</span>
        `;

        videoDiv.addEventListener('click', () => {
            window.location.href = `player.html?videoId=${videoId}`;
        });
        

        resultsContainer.appendChild(videoDiv);
    });
}
