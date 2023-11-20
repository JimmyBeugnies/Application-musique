let currentPlaylist = null;

document.getElementById('addPlaylistBtn').addEventListener('click', function() {
    document.getElementById('addPlaylistModal').style.display = 'block';
});

document.querySelectorAll('.close-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        this.parentElement.parentElement.style.display = 'none';
    });
});

document.getElementById('createPlaylistBtn').addEventListener('click', function() {
    const playlistName = document.getElementById('playlistNameInput').value;
    if (playlistName) {
        addPlaylist(playlistName);
        document.getElementById('addPlaylistModal').style.display = 'none';
        document.getElementById('playlistNameInput').value = ''; // Réinitialiser le champ
    }
});

function addPlaylist(name) {
    const playlistsContainer = document.getElementById('playlistsContainer');
    const playlistElement = document.createElement('div');
    playlistElement.className = 'playlist';
    playlistElement.innerHTML = `
        <img src="default.png" alt="${name}" class="playlist-thumbnail">
        <h3>${name}</h3>
        <button class="addMusicBtn" data-playlist="${name}">Ajout Musique</button>
    `;
    playlistsContainer.appendChild(playlistElement);

    attachMusicButtonEvents();
}

function attachMusicButtonEvents() {
    document.querySelectorAll('.addMusicBtn').forEach(button => {
        button.removeEventListener('click', handleAddMusicClick);
        button.addEventListener('click', handleAddMusicClick);
    });
}

function handleAddMusicClick(event) {
    currentPlaylist = event.target.dataset.playlist;
    document.getElementById('addMusicModal').style.display = 'block';
}

document.getElementById('addMusicBtn').addEventListener('click', function() {
    const ytUrl = document.getElementById('ytUrlInput').value;
    if (ytUrl) {
        addMusicToPlaylist(currentPlaylist, ytUrl);
        document.getElementById('addMusicModal').style.display = 'none';
        document.getElementById('ytUrlInput').value = ''; // Réinitialiser le champ
    }
});

function addMusicToPlaylist(playlistName, ytUrl) {
    console.log(`Ajout de la musique depuis l'URL ${ytUrl} à la playlist ${playlistName}`);
    // Ici, vous pouvez ajouter la logique pour gérer l'ajout de musique à la playlist
}
