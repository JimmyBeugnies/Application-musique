$(document).ready(function () {
    let playlistId = getUrlParameter('playlistId');
    // Utilisez l'id de la playlist pour afficher les détails de la playlist correspondante
    // ...
  
    function getUrlParameter(name) {
      name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
      let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
      let results = regex.exec(location.search);
      return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }
  });