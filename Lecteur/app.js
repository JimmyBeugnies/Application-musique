// Ce code charge l'API IFrame Player API de manière asynchrone.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Cette fonction crée un <iframe> (et le lecteur YouTube)
// après que l'API ait téléchargé le code.
var player;
function onYouTubeIframeAPIReady() {
  var videoId = getVideoIdFromUrl();
  player = new YT.Player('youtube-player', {
    height: '0',
    width: '0',
    videoId: videoId,
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
  getVideoDetails(videoId);

}

// Récupérer l'ID vidéo depuis l'URL.
function getVideoIdFromUrl() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get('videoId');
}

function onPlayerReady(event) {
  // Configure les contrôles ici si nécessaire.
}

// Mettez à jour l'interface utilisateur en réponse aux changements de l'état du lecteur.
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING) {
    // La vidéo est en train d'être lue.
  }
}

// Contrôles de la vidéo.
document.getElementById('play-pause').addEventListener('click', function() {
  var state = player.getPlayerState();
  if (state == YT.PlayerState.PLAYING) {
    player.pauseVideo();
  } else {
    player.playVideo();
  }
});

document.getElementById('backward').addEventListener('click', function() {
  var currentTime = player.getCurrentTime();
  player.seekTo(currentTime - 10);  // Reculer de 10 secondes.
});

document.getElementById('forward').addEventListener('click', function() {
  var currentTime = player.getCurrentTime();
  player.seekTo(currentTime + 10);  // Avancer de 10 secondes.
});

// Contrôles de volume.
document.querySelector('.sound-control input[type="range"]').addEventListener('input', function() {
  player.setVolume(this.value);
});

// Barre de progression.
var progressBar = document.querySelector('.player input[type="range"]');
player.addEventListener('onStateChange', function() {
  if (player.getPlayerState() === YT.PlayerState.PLAYING) {
    var duration = player.getDuration();
    setInterval(function() {
      var currentTime = player.getCurrentTime();
      var percent = (currentTime / duration) * 100;
      progressBar.value = percent;
    }, 1000);
  }
});

// Mettre à jour la position de la vidéo lorsque l'utilisateur déplace la barre de progression.
progressBar.addEventListener('input', function() {
  var duration = player.getDuration();
  var seekToTime = (this.value / 100) * duration;
  player.seekTo(seekToTime, true);
});


/*   const apiKey = 'AIzaSyBhDzqCeJ7MTgDfptxSg8bsUBoXt6PUB2Q';
 */function getVideoDetails(videoId) {
  const apiKey = 'AIzaSyBhDzqCeJ7MTgDfptxSg8bsUBoXt6PUB2Q';

  fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`)
    .then(response => response.json())
    .then(data => {
      const videoData = data.items[0].snippet;
      const thumbnailUrl = videoData.thumbnails.medium.url;
      const title = videoData.title;

      const thumbnailImage = document.createElement('img');
      thumbnailImage.src = thumbnailUrl;
      thumbnailImage.style.width = "100%";

      const thumbnailContainer = document.getElementById('thumbnail-container');
      thumbnailContainer.appendChild(thumbnailImage);

      const titleElement = document.createElement('h2');
      titleElement.textContent = title;
      thumbnailContainer.appendChild(titleElement);
      titleElement.style.width = "100%";
      titleElement.style.display = "flex";
      titleElement.style.justifyContent = "center";
      titleElement.style.textAlign = "center";

    })
    .catch(error => {
      console.error('Une erreur s\'est produite lors de la récupération des informations de la vidéo :', error);
    });
}

document.getElementById('backward').addEventListener('click', function() {
  var currentTime = player.getCurrentTime();
  player.seekTo(currentTime - 10, true);  // Reculer de 10 secondes.
});

document.getElementById('forward').addEventListener('click', function() {
  var currentTime = player.getCurrentTime();
  player.seekTo(currentTime + 10, true);  // Avancer de 10 secondes.
});









// Barre de progression.
var progressBar = document.getElementById('TimeRange');

player.addEventListener('onStateChange', function() {
  if (player.getPlayerState() === YT.PlayerState.PLAYING) {
    var duration = player.getDuration();
    setInterval(function() {
      var currentTime = player.getCurrentTime();
      var percent = (currentTime / duration) * 100;
      progressBar.value = percent;

      // Convertir le temps en format "mm:ss".
      var minutes = Math.floor(currentTime / 60);
      var seconds = Math.floor(currentTime % 60);
      var formattedTime = minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');

      // Mettre à jour l'affichage du temps.
      document.getElementById('time').innerText = formattedTime;
    }, 1000);
  }
});

// Mettre à jour la position de la vidéo lorsque l'utilisateur déplace la barre de progression.
progressBar.addEventListener('input', function() {
  var duration = player.getDuration();
  var seekToTime = (this.value / 100) * duration;
  player.seekTo(seekToTime, true);
});

// Assurez-vous que cette variable est globale et accessible partout où elle est nécessaire
var updateTimeInterval;

// Fonction à appeler lorsque l'état du lecteur change
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING) {
    // Vérifiez si un intervalle est déjà en cours et l'annuler pour éviter les doublons
    if (updateTimeInterval) {
      clearInterval(updateTimeInterval);
    }
   
    // Mettre à jour la barre de progression toutes les secondes
    updateTimeInterval = setInterval(function() {
      var currentTime = player.getCurrentTime();
      var duration = player.getDuration();
      var percent = (currentTime / duration) * 100;
      progressBar.value = percent;
    }, 1000);
  } else {
    // Arrêtez de mettre à jour la barre de progression lorsque la vidéo n'est pas en lecture
    if (updateTimeInterval) {
      clearInterval(updateTimeInterval);
    }
  }
}

// Ajoutez des écouteurs d'événements pour les contrôles de lecture
document.getElementById('play-pause').addEventListener('click', function() {
  var state = player.getPlayerState();
  if (state === YT.PlayerState.PLAYING) {
    player.pauseVideo();
  } else {
    player.playVideo();
  }
});

document.getElementById('backward').addEventListener('click', function() {
  var currentTime = player.getCurrentTime();
  player.seekTo(currentTime - 10, true);
});

document.getElementById('forward').addEventListener('click', function() {
  var currentTime = player.getCurrentTime();
  player.seekTo(currentTime + 10, true);
});

// Barre de progression
var progressBar = document.getElementById('TimeRange');
progressBar.addEventListener('input', function() {
  var seekToTime = parseInt(this.value); // Obtenez la valeur entière de la barre
  player.seekTo(seekToTime, true);
  progressBar.value = seekToTime;
});



