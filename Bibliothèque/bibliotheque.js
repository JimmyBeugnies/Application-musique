$(document).ready(function () {
    let playlists = JSON.parse(localStorage.getItem("playlists")) || [];
  
    function savePlaylists() {
        playlists.forEach((playlist, index) => {
          playlist.id = index + 1;
        });
        localStorage.setItem("playlists", JSON.stringify(playlists));
      }
  
    function displayPlaylists() {
      let container = $("#playlistContainer");
      container.empty();
      playlists.forEach((playlist) => {
        let playlistDiv = $(`
          <div class="card" data-index="${playlist.id}">
            <img src="../Assets/default.png" class="card-img-top">
            <div class="card-body">
              <h5 class="card-title" style="color: #000;">#${playlist.id} - ${playlist.name}</h5>
              <a href="./Bibliothèque/Playlist/Playlist.html?playlistId=${playlist.id}" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#playlistModal" data-playlist-index="${playlist.id}">Ouvrir</a>              <button type="button" class="btn btn-danger btn-sm deletePlaylistBtn" data-playlist-index="${playlist.id}">Supprimer</button>
            </div>
          </div>
        `);
        container.append(playlistDiv);
      });
  
      // Gestionnaire d'événements pour les boutons de suppression
      $('.deletePlaylistBtn').click(function(event) {
        let playlistIndex = $(this).attr('data-playlist-index');
        deletePlaylist(event, playlistIndex);
      });
    }
  
    function deletePlaylist(event, index) {
      event.stopPropagation();
      playlists.splice(index, 1);
      savePlaylists();
      displayPlaylists();
    }
  
    function addMusicToPlaylist(playlistIndex, musicUrl) {
      let playlist = playlists[playlistIndex];
      if (playlist) {
        playlist.songs.push(musicUrl);
        savePlaylists();
        displayPlaylistSongs(playlistIndex);
      }
    }
  
    function displayPlaylistSongs(playlistIndex) {
        let playlist = playlists[playlistIndex];
        let modalBody = $("#playlistModal .modal-body");
        modalBody.empty();
      
        if (playlist && playlist.songs) {
          playlist.songs.forEach((songUrl) => {
            let songDiv = $(`
              <div class="song">
                <span>${songUrl}</span>
              </div>
            `);
            modalBody.append(songDiv);
          });
        }
      }
  
    displayPlaylists();
  
    $('#createPlaylist').click(function () {
      let playlistName = prompt("Entrez le nom de la playlist:");
      if (playlistName) {
        playlists.push({ name: playlistName, songs: [] });
        savePlaylists();
        displayPlaylists();
      }
    });
  
    $('#playlistContainer').on('click', '.card', function () {
      let index = $(this).attr('data-index');
      let playlist = playlists[index];
      let playlistModal = $('#playlistModal');
      playlistModal.attr('data-playlist-index', index);
      displayPlaylistSongs(index);
    });
  
    $('#modalAddMusicBtn').click(function () {
      let playlistIndex = $('#playlistModal').attr('data-playlist-index');
      let musicUrl = prompt("Entrez l'URL de la musique YouTube:");
      if (musicUrl) {
        addMusicToPlaylist(playlistIndex, musicUrl);
      }
    });
  });