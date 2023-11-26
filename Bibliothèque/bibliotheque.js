$(document).ready(function () {
    let playlists = JSON.parse(localStorage.getItem("playlists")) || [];
  
    function savePlaylists() {
      localStorage.setItem("playlists", JSON.stringify(playlists));
    }
  
    function displayPlaylists() {
      let container = $("#playlistContainer");
      container.empty();
      playlists.forEach((playlist, index) => {
        let playlistDiv = $(`
          <div class="card" data-index="${index}">
            <img src="../Assets/default.png" class="card-img-top">
            <div class="card-body">
              <h5 class="card-title" style="color: #000;">Playlist ${index + 1} - ${playlist.name}</h5>
              <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#playlistModal" data-playlist-index="${index}">Ouvrir</button>
              <button type="button" class="btn btn-danger btn-sm deletePlaylistBtn" data-playlist-index="${index}">Supprimer</button>
            </div>
          </div>
        `);
        container.append(playlistDiv);
      });
  
      // Gestionnaire d'événements pour les boutons de suppression
      $('.deletePlaylistBtn').click(function (event) {
        let playlistIndex = parseInt($(this).attr('data-playlist-index'));
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
  
      playlist.songs.forEach((songUrl) => {
        let songDiv = $(`
          <div class="song">
            <span>${songUrl}</span>
          </div>
        `);
        modalBody.append(songDiv);
      });
    }
  
    displayPlaylists();
  
    $('#createPlaylist').click(function () {
      $('#createPlaylistModal').modal('show'); // Ouvre la modale HTML
    });
  
    $('#savePlaylistBtn').click(function () {
      let playlistName = $("#playlistNameInput").val();
      if (playlistName) {
        playlists.push({ name: playlistName, songs: [] });
        savePlaylists();
        displayPlaylists();
        $('#createPlaylistModal').modal('hide'); // Ferme la modale HTML
      }
    });
  
    $('#playlistContainer').on('click', '.card', function () {
      let index = $(this).attr('data-index');
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