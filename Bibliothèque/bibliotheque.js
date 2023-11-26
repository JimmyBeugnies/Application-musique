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
                <button type="button" class="btn btn-danger btn-sm deletePlaylistBtn" data-playlist-index="${index}">Supprimer</button>
                <button type="button" class="btn btn-primary btn-sm addMusicBtn" data-playlist-index="${index}">Ajouter une musique</button><!-- Ajouter le bouton "Ajouter une musique" ici -->
            </div>
        </div>`);
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
        playlist.songs.push({ url: musicUrl });
        savePlaylists();
        displayPlaylistSongs(playlistIndex);
      }
    }
  
    function displayPlaylistSongs(playlistIndex) {
      let playlist = playlists[playlistIndex];
      let modalBody = $("#playlistModal .modal-body");
      modalBody.empty();
  
      playlist.songs.forEach((song) => {
        let songDiv = $(`
          <div class="song">
            <img src="https://i.ytimg.com/vi/${getYoutubeVideoId(song.url)}/default.jpg" alt="Thumbnail" style="width: 10px; height: 10px;">
            <span>${song.title}</span>
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
        $('#createPlaylistModal').modal('hide'); // Ferme la modal HTML
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
  
    $('.addMusicBtn').click(function() {
        $('#addMusicModal').modal('show');
    });
    $('#addMusicBtnConfirm').click(function() {
        let musicUrl = $('#musicUrlInput').val();
    
        // Récupérer la playlist correspondante
        let playlistIndex = $(this).data('playlist-index');
        let playlist = getPlaylist(playlistIndex);
    
        // Enregistrer la musique dans la playlist
        playlist.songs.push({
            url: musicUrl
        });
    
        // Mettre à jour la playlist dans le LocalStorage
        updatePlaylist(playlistIndex, playlist);
    
        $('#addMusicModal').modal('hide'); // Ferme la modale une fois la musique enregistrée
    });
    
    // Fonction pour récupérer la playlist depuis le LocalStorage
    function getPlaylist(playlistIndex) {
        let playlists = JSON.parse(localStorage.getItem('playlists'));
        return playlists[playlistIndex];
    }
    
    // Fonction pour mettre à jour la playlist dans le LocalStorage
    function updatePlaylist(playlistIndex, playlist) {
        let playlists = JSON.parse(localStorage.getItem('playlists'));
        playlists[playlistIndex] = playlist;
        localStorage.setItem('playlists', JSON.stringify(playlists));
    }

    // Fonction utilitaire pour extraire l'ID de la vidéo YouTube de l'URL
    function getYoutubeVideoId(url) {
      let videoId = "";
      try {
        videoId = url.match(/(?<=v=|youtu.be\/|\/embed\/|\/v\/|\/\d{1,2}\/|\/embed\?)[^#\&\?\n\/]{11}/)[0];
      } catch (e) {
        console.error("Failed to extract YouTube video ID from the URL:", url);
      }
      return videoId;
    }
  });